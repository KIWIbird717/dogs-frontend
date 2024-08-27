import { FC, MouseEvent, useState } from "react";
import { useModal } from "@/shared/hooks/useModal";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Field, IFieldProps } from "@/widgets/Field";
import { useUser } from "@/shared/hooks/useUser";
import { twMerge } from "tailwind-merge";
import { UsersService } from "@/shared/lib/services/users/users";
import { Logger } from "@/shared/lib/utils/logger/Logger";

interface IModalEditAgeProps {}

export const ModalEditAge: FC<IModalEditAgeProps> = () => {
  const logger = new Logger("ModalEditAge");

  const { onClose, modalData } = useModal();
  const { isOpen, data, type } = modalData;
  const [isError, setIsError] = useState(false);
  const { age, onChangeUser, onChangeAge } = useUser();

  const isModalOpen = isOpen && type === "editAge";

  const [localAge, setLocalAge] = useState<string | number | null | undefined>(age);

  const onCloseHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAgeChange: IFieldProps["onChange"] = (event) => {
    if (typeof event === "string") return;
    const newAge = event.currentTarget.value;
    if (newAge === "" || (/^\d+$/.test(newAge) && parseInt(newAge) <= 80)) {
      setIsError(false);
    } else {
      setIsError(true);
    }
    setLocalAge(newAge);
  };

  const onSubmit = async () => {
    try {
      await UsersService.updateUser({
        age: Number(localAge),
      });

      const { data } = await UsersService.getMe();
      onChangeUser(data);
    } catch (error) {
      logger.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          className={
            "fixed left-0 top-0 z-[100] flex h-full w-full flex-col items-center justify-center bg-[#000]/30"
          }
          onClick={(e) => onCloseHandler(e)}
        >
          <div
            className={
              "t relative z-[11] flex w-[344px] flex-col gap-4 rounded-xl border border-black-300 bg-black-750 p-4 pb-6 shadow-buttonNoAccent backdrop-blur-lg"
            }
          >
            <Button
              className={"leading-4.5 h-[18px] w-fit !p-0 text-[15px] font-normal"}
              onClick={onClose}
            >
              Back to Account
            </Button>

            <div className={"flex w-full flex-col gap-6"}>
              <Typography tag={"h2"} className={"font-normal text-white-900"}>
                Enter your age
              </Typography>

              <Field
                label={"Age"}
                labelDescription={"from 0 to 80"}
                keyForLabel={"age"}
                value={localAge as string}
                onChange={handleAgeChange}
                isError={isError}
                errorText={"Invalid age"}
                placeholder={"Age"}
                type={"number"}
              />
            </div>

            <Button
              variant={"deepBlue"}
              disabled={isError}
              className={twMerge(isError && "opacity-50")}
              onClick={onSubmit}
            >
              Confirm Age
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
