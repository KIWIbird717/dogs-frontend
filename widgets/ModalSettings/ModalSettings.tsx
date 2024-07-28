import { FC, MouseEvent } from "react";
import { useModal } from "@/shared/hooks/useModal";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Switch } from "@/shared/ui/Switch/switch";
import { SwitchItem } from "@/widgets/ModalSettings/shared/ui/SwitchItem";
import ArrowRightIcon from "@/public/images/svg/arrow-right.svg";


interface IModalSettingsProps {
}

export const ModalSettings: FC<IModalSettingsProps> = () => {
  const { onClose, modalData } = useModal();
  const { isOpen, data, type } = modalData;

  const isModalOpen = isOpen && type === "settings";

  const onCloseHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isModalOpen && <div
        className={"w-full h-full flex flex-col justify-center items-center fixed top-0 bg-[#000]/30 left-0 z-[100]"}
        onClick={(e) => onCloseHandler(e)}
      >

        <div
          className={"flex flex-col gap-4 w-[344px] p-4 pb-6 rounded-xl border border-black-300 shadow-buttonNoAccent"}
        >
          <Button className={"w-fit h-[18px] !p-0 text-[15px] leading-4.5 font-normal"}
                  onClick={onClose}
          >
            Cancel
          </Button>

          <div className={"w-full flex flex-col gap-6"}>
            <Typography tag={"h2"}
                        className={"font-normal text-white-900"}
            >
              Settings
            </Typography>

            <div className={"w-full flex flex-col gap-4"}>
              <SwitchItem title={"Music"} />
              <SwitchItem title={"Songs"} />
              <SwitchItem title={"Vibration"} />
            </div>
          </div>

          <div
            className={"w-full flex justify-between items-center h-[56px] bg-black-800 border border-black-300 p-3 rounded-xl "}>
            <Typography tag={"h3"}
                        className={"font-normal"}
            >
              Bot Language
            </Typography>

            <Button className={"w-fit flex gap-1"}>
              <Typography tag={"span"}
                          className={"text-[17px] leading-6 font-normal"}
              >
                English
              </Typography>
              <ArrowRightIcon />
            </Button>
          </div>

          <div
            className={"w-full h-full absolute left-0 top-0 bg-black-750 backdrop-blur-lg rounded-xl z-[-1]"} />
        </div>
      </div>}
    </>
  );
};