import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { SwitchItem } from "@/widgets/ModalSettings/shared/ui/SwitchItem";
import { LanguageToggle } from "@/widgets/ModalSettings/shared/ui/LanguageToggle";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { LocalStorageKeys } from "@/shared/constants/localstorage-keys";

interface ISettingsProps {
  language: "English" | "Russian";
  onOpenLanguageChange: () => void;
  onCloseWindowOrLang: () => void;
}

export const Settings: FC<ISettingsProps> = ({
  onCloseWindowOrLang,
  onOpenLanguageChange,
  language,
}) => {
  const [isVibrationActive, setIsVibrationActive] = useLocalStorage<boolean>(
    LocalStorageKeys.SettingsVibration,
    false,
  );

  return (
    <>
      <Button
        className={"leading-4.5 h-[18px] w-fit !p-0 text-[15px] font-normal"}
        onClick={onCloseWindowOrLang}
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
          <SwitchItem
            title={"Vibration"}
            checked={isVibrationActive}
            onCheckedChange={(checked) => {
              setIsVibrationActive(checked);
              console.log({ checked });
            }}
          />
        </div>
      </div>

      <LanguageToggle language={language} onOpenLanguageChange={onOpenLanguageChange} />

      <div
        className={
          "absolute left-0 top-0 z-[-1] h-full w-full rounded-xl bg-black-750 backdrop-blur-lg"
        }
      />
    </>
  );
};
