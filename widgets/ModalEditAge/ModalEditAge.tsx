import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { useModal } from "@/shared/hooks/useModal";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Field } from "@/widgets/Field";
import { useUser } from "@/shared/hooks/useUser";
import { twMerge } from "tailwind-merge";

interface IModalEditAgeProps {
}

export const ModalEditAge: FC<IModalEditAgeProps> = () => {
  const { onClose, modalData } = useModal();
  const { isOpen, data, type } = modalData;
  const [isError, setIsError] = useState(false);
  const {age, onChangeAge} = useUser()

  const isModalOpen = isOpen && type === "editAge";

  const [value, setValue] = useState<string | number>(age)

  const onCloseHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAge = event.currentTarget.value;
    if (newAge === "" || (/^\d+$/.test(newAge) && parseInt(newAge) <= 80)) {
      setIsError(false);
    } else {
      setIsError(true);
    }
    setValue(newAge)
  };

  const onClick = () => {
    onChangeAge(value)
    onClose()
  }

  return (
    <>
      {isModalOpen && <div
        className={"w-full h-full flex flex-col justify-center items-center fixed top-0 bg-[#000]/30 left-0 z-[100]"}
        onClick={(e) => onCloseHandler(e)}
      >

        <div
          className={"flex flex-col gap-4 w-[344px] p-4 pb-6 rounded-xl border border-black-300 bg-black-750 backdrop-blur-lg shadow-buttonNoAccent t relative z-[11]"}
        >
          <Button className={"w-fit h-[18px] !p-0 text-[15px] leading-4.5 font-normal"}
                  onClick={onClose}
          >
            Back to Account
          </Button>

          <div className={"w-full flex flex-col gap-6"}>
            <Typography tag={"h2"}
                        className={"font-normal text-white-900"}
            >
              Enter your age
            </Typography>

            <Field label={"Age"}
                   labelDescription={"from 0 to 80"}
                   keyForLabel={"age"}
                   value={value as string}
                   onChange={handleAgeChange}
                   isError={isError}
                   errorText={"Invalid age"}
                   placeholder={"Age"}
                   type={"number"}
            />
          </div>

          <Button variant={"deepBlue"}
                  disabled={isError}
                  className={twMerge(isError && "opacity-50")}
                  onClick={onClick}
          >
            Confirm Age
          </Button>
        </div>
      </div>
      }
    </>
  );
};