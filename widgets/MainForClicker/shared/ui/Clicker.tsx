import { FC, TouchEventHandler, useState } from "react";
import { Bowl } from "./Bowl";

interface IClickerProps {
  handleClick: TouchEventHandler<HTMLButtonElement>;
  level: number;
}

export const Clicker: FC<IClickerProps> = ({ handleClick, level }) => {
  const [isTaped, setIsTaped] = useState(false);

  return (
    <div className={"flex h-full w-full justify-center"}>
      <button
        onTouchStart={() => setIsTaped(true)}
        onTouchEnd={(event) => {
          handleClick(event);
          setIsTaped(false);
        }}
        className={
          "max-h-[296px] w-full max-w-[296px] rounded-[52px] bg-gradient-button-sec p-4 shadow-buttonSec transition-all duration-100"
        }
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
