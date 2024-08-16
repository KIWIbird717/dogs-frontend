"use client";

import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Field, IFieldProps } from "@/widgets/Field";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { serverApi } from "@/shared/lib/axios";
import { useUser } from "@/shared/hooks/useUser";
import { CheckboxInvitation } from "@/widgets/CreateGuildFields/shared/ui/CheckboxInvitation";

interface ICreateGuildFieldsProps {}

export const CreateGuildFields: FC<ICreateGuildFieldsProps> = () => {
  const logger = new Logger("CreateGuildFields");

  const { user } = useUser();

  const inputFileRef = useRef<any>(null);
  const needBalance = 500;
  const bones = user.balance;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState<File>();
  const [link, setLink] = useState("https://t.me/");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [joinMethod, setJoinMethod] = useState<"open" | "bylink">("open");

  const onToggleJoinMethod = () => {
    if (joinMethod === "open") {
      setJoinMethod("bylink");
    } else setJoinMethod("open");
  };

  const handleFile: IFieldProps["onChange"] = (e) => {
    if (typeof e === "string") return;
    if (!(e as ChangeEvent<HTMLInputElement>).currentTarget.files) {
      logger.error("[handleFile] e.currentTarget.files is null");
      return;
    }

    let selectedFile = (e as any).currentTarget?.files[0];
    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setIsError(true);
      setErrorMessage("Error Format Send PNG or JPGE");
    } else {
      setIsError(false);
      setErrorMessage("");
    }
    setAvatar(selectedFile);
  };

  const onChangeName: IFieldProps["onChange"] = (e) => {
    if (typeof e === "string") return;
    setName(e.currentTarget.value);
  };
  const onChangeDescription: IFieldProps["onChange"] = (e) => {
    if (typeof e === "string") return;
    setDescription(e.currentTarget.value);
  };
  const onChangeLink: IFieldProps["onChange"] = (e) => {
    if (typeof e === "string") return;
    setLink(e.currentTarget.value);
  };

  useEffect(() => {
    // if (name.length === 0 || !avatar || isError || !(Number(bones) >= needBalance)) {
    if (name.length === 0 || !avatar || isError) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [avatar, isError, name.length]);

  const onSubmit = async () => {
    const formData = new FormData();
    if (avatar) {
      formData.append("image", avatar);
      formData.append("name", "Guild name");
      formData.append("joinMethod", "open");
    }

    try {
      // TODO: Нужно исправить
      const { data } = await serverApi.post(`/guilds/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className={"z-[10] flex w-full flex-col gap-2"}>
      <Field
        keyForLabel={"name"}
        label={"Name Guild"}
        value={name}
        onChange={onChangeName}
        isError={false}
        placeholder={"Name"}
        type={"text"}
        isCorrect={isCorrect}
      />

      <Field
        keyForLabel={"description"}
        label={"Description Guild"}
        value={description}
        onChange={onChangeDescription}
        isError={false}
        placeholder={"Up to 300 characters"}
        isTextArea
      />

      <Field
        keyForLabel={"link"}
        label={"Link to the Guild"}
        labelDescription={"Telegram only"}
        errorText={"Invalid link"}
        value={link}
        onChange={onChangeLink}
        isError={false}
        placeholder={"Link"}
        type={"url"}
      />
      <Field
        keyForLabel={"avatar"}
        label={"Choose avatar for Guild"}
        labelDescription={"Telegram only"}
        errorText={errorMessage}
        onChange={handleFile}
        isError={isError}
        type={"file"}
        inputRef={inputFileRef}
        value={!!avatar}
      />

      <CheckboxInvitation joinMethod={joinMethod} onToggleJoinMethod={onToggleJoinMethod} />

      <div className={"flex w-full flex-col gap-4 pt-2"}>
        <Button
          onClick={onSubmit}
          variant={"primary"}
          disabled={isDisabled}
          className={"text-[18px] font-bold leading-6 text-white-900"}
        >
          Create Guild
        </Button>

        <div className={"flex w-full flex-col items-center gap-1"}>
          <Typography tag={"span"} className={"text-white-800"}>
            You need {needBalance} bones
          </Typography>
          <Typography tag={"span"} className={"text-red"}>
            Your balance {bones} bones
          </Typography>
        </div>
      </div>
    </div>
  );
};
