import { FC, MouseEvent } from "react";
import { useModal } from "@/shared/hooks/useModal";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Switch } from "@/shared/ui/Switch/switch";
import { SwitchItem } from "@/widgets/ModalSettings/shared/ui/SwitchItem";
import ArrowRightIcon from "@/public/images/svg/arrow-right.svg";

interface IModalSettingsProps {}

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
      {isModalOpen && (
        <div
          className={
            "fixed left-0 top-0 z-[100] flex h-full w-full flex-col items-center justify-center bg-[#000]/30"
          }
          onClick={(e) => onCloseHandler(e)}
        >
          <div
            className={
              "flex w-[344px] flex-col gap-4 rounded-xl border border-black-300 p-4 pb-6 shadow-buttonNoAccent"
            }
          >
            <Button
              className={"leading-4.5 h-[18px] w-fit !p-0 text-[15px] font-normal"}
              onClick={onClose}
            >
              Cancel
            </Button>

            <div className={"flex w-full flex-col gap-6"}>
              <Typography tag={"h2"} className={"font-normal text-white-900"}>
                Settings
              </Typography>

              <div className={"flex w-full flex-col gap-4"}>
                <SwitchItem title={"Music"} />
                <SwitchItem title={"Songs"} />
                <SwitchItem title={"Vibration"} />
              </div>
            </div>

            <div
              className={
                "flex h-[56px] w-full items-center justify-between rounded-xl border border-black-300 bg-black-800 p-3"
              }
            >
              <Typography tag={"h3"} className={"font-normal"}>
                Bot Language
              </Typography>

              <Button className={"flex w-fit gap-1"}>
                <Typography tag={"span"} className={"text-[17px] font-normal leading-6"}>
                  English
                </Typography>
                <ArrowRightIcon />
              </Button>
            </div>

            <div
              className={
                "absolute left-0 top-0 z-[-1] h-full w-full rounded-xl bg-black-750 backdrop-blur-lg"
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
