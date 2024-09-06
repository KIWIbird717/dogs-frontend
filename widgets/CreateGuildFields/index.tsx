"use client";

import { ChangeEvent, FC, useRef, useState } from "react";
import { Field as FieldComponent, IFieldProps } from "@/widgets/Field";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { CheckboxInvitation } from "@/widgets/CreateGuildFields/shared/ui/CheckboxInvitation";
import { GuildsService, JoinMethod } from "@/shared/lib/services/guilds/guilds";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchemas } from "@/shared/lib/zod-schemas";
import { ZodSchemaTypes } from "@/shared/lib/zod-schemas/types";
import { Field } from "@/shared/ui/Field";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { cn } from "@/shared/lib/utils/cn";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { useRouter } from "next/navigation";

const MotionImage = dynamic(() => import("framer-motion").then((mod) => mod.motion.img));

const BALANCE_TO_CREATE_GUILD = 500;

interface ICreateGuildFieldsProps {}

export const CreateGuildFields: FC<ICreateGuildFieldsProps> = () => {
  const logger = new Logger("CreateGuildFields");

  const { handleSubmit, formState, setError, setValue, reset } =
    useForm<ZodSchemaTypes.GuildCreate>({
      resolver: zodResolver(ZodSchemas.guildCreate),
      defaultValues: {
        link: "https://t.me",
        joinMethod: JoinMethod.OPEN,
      },
    });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { balance } = useAppSelector((store) => store.user);
  const fileUploaderRef = useRef<any>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  const [joinMethod, setJoinMethod] = useState<JoinMethod>(JoinMethod.OPEN);

  const onToggleJoinMethod = () => {
    if (joinMethod === "open") {
      setValue("joinMethod", JoinMethod.BYLINK);
      setJoinMethod(JoinMethod.BYLINK);
    } else {
      setValue("joinMethod", JoinMethod.OPEN);
      setJoinMethod(JoinMethod.OPEN);
    }
  };

  const handleFile: IFieldProps["onChange"] = (e) => {
    if (typeof e === "string") return;

    if (!(e as ChangeEvent<HTMLInputElement>).currentTarget.files) {
      logger.error("[handleFile] e.currentTarget.files is null");
      return;
    }

    let selectedFile = (e as any).currentTarget?.files[0];

    setAvatar(selectedFile);
    setUploadedAvatar(URL.createObjectURL(selectedFile));
    setValue("image", selectedFile, { shouldValidate: true });
  };

  const submitForm: SubmitHandler<ZodSchemaTypes.GuildCreate> = async (form) => {
    try {
      const formData = new FormData();

      if (!form.image) {
        setError("image", { type: "required", message: "Avatar was not provided" });
        return;
      }

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("link", form.link);
      formData.append("image", form.image);
      formData.append("joinMethod", form.joinMethod);

      const response = await GuildsService.createGuild(formData);

      reset();
      dispatch(UserSlice.updateUser({ guildName: response.data.name, guild: response.data.id }));
      router.push("/main");
    } catch (error) {
      toast.error("Can not create guild now");
      reset();
    }
  };

  return (
    <form
      className={"z-[10] flex w-full flex-col gap-3 pb-[100px]"}
      onSubmit={handleSubmit(submitForm)}
    >
      <Toaster />

      <Field.Input
        onChange={(e) => setValue("name", e.target.value, { shouldValidate: true })}
        type="text"
        label={"Name Guild"}
        error={formState.errors.name}
      />
      <Field.Textarea
        onChange={(e) => setValue("description", e.target.value, { shouldValidate: true })}
        label="Description Guild"
        error={formState.errors.description}
        placeholder="Up to 300 characters"
      />
      <Field.Input
        onChange={(e) => setValue("link", e.target.value, { shouldValidate: true })}
        type="text"
        label={"Link to the Guild"}
        labelAfter={"Telegram only"}
        placeholder="https://t.me"
        error={formState.errors.link}
      />
      <div className="flex h-full w-full flex-col gap-[1px]">
        <FieldComponent
          keyForLabel={"avatar"}
          label={"Choose avatar for Guild"}
          labelDescription={"Telegram only"}
          onChange={handleFile}
          error={formState.errors.image}
          inputRef={fileUploaderRef}
          type={"file"}
          value={!!avatar}
        />
        <AnimatePresence>
          {uploadedAvatar && (
            <MotionImage
              initial={{ height: 0 }}
              animate={{ height: 80 }}
              exit={{ height: 0 }}
              className="m-2 aspect-square h-full w-fit overflow-hidden rounded-[10px] border-[1px] border-blue-900 object-cover object-center"
              src={uploadedAvatar}
            />
          )}
        </AnimatePresence>
      </div>

      <CheckboxInvitation joinMethod={joinMethod} onToggleJoinMethod={onToggleJoinMethod} />

      <div className={"flex w-full flex-col gap-4 pt-2"}>
        <Button
          type="submit"
          variant={"primary"}
          disabled={!formState.isValid || formState.isSubmitting}
          className={"text-[18px] font-bold leading-6 text-white-900"}
        >
          Create Guild
        </Button>

        <div className={"flex w-full flex-col items-center gap-1"}>
          <Typography tag={"span"} className={"text-white-800"}>
            {balance < BALANCE_TO_CREATE_GUILD
              ? `You need ${BALANCE_TO_CREATE_GUILD} coins`
              : `${BALANCE_TO_CREATE_GUILD} coins for guild creation`}
          </Typography>
          <Typography
            tag={"span"}
            className={cn(balance < BALANCE_TO_CREATE_GUILD ? "text-red" : "hidden")}
          >
            Your balance {balance} coins
          </Typography>
        </div>
      </div>
    </form>
  );
};
