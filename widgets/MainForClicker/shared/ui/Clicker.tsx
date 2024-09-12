import { FC, TouchEventHandler, useEffect, useState } from "react";
import { Bowl } from "./Bowl";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { LocalStorageKeys } from "@/shared/constants/localstorage-keys";
import { useTelegram } from "@/shared/hooks/useTelegram";

interface IClickerProps {
  handleClick: TouchEventHandler<HTMLButtonElement>;
  level: number;
}

export const Clicker: FC<IClickerProps> = ({ handleClick, level }) => {
  const [isTaped, setIsTaped] = useState(false);
  const [isVibrationActive] = useLocalStorage<boolean>(LocalStorageKeys.SettingsVibration, false);
  const telegram = useTelegram();

  const handleButtonClick: TouchEventHandler<HTMLButtonElement> = (event) => {
    handleClick(event);
    setIsTaped(false);

    // vibration on click if active
    if (isVibrationActive) {
      telegram?.HapticFeedback.impactOccurred("light");
    }
  };

  return (
    <div className={"flex h-full w-full justify-center"}>
      <button
        onTouchStart={() => setIsTaped(true)}
        onTouchEnd={handleButtonClick}
        className="max-h-[296px] w-[270px] max-w-[296px] rounded-[52px] p-4 transition-all duration-100"
        style={{ transform: isTaped ? "scale(0.9)" : "scale(1)" }}
      >
        <div
          className={
            "relative flex max-h-[264px] max-w-[264px] items-center justify-center rounded-[42px]" /*h-[264px] w-[264px]*/
          }
        >
          <div className="max-h-full max-w-full object-cover">
            <Bowl level={level} />
          </div>
        </div>
      </button>
    </div>
  );
};
