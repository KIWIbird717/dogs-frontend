import { FC, TouchEventHandler, useState } from "react";
import { Bowl } from "./Bowl";

interface IClickerProps {
  handleClick: TouchEventHandler<HTMLButtonElement>;
  level: number;
}

export const Clicker: FC<IClickerProps> = ({ handleClick, level }) => {
  const [isTaped, setIsTaped] = useState(false);

  const handleButtonClick: TouchEventHandler<HTMLButtonElement> = (event) => {
    handleClick(event);
    setIsTaped(false);
  };

  return (
    <div className={"flex h-full w-full justify-center"}>
      <button
        onTouchStart={() => setIsTaped(true)}
        onTouchEnd={handleButtonClick}
        className={
          "max-h-[296px] w-[270px] max-w-[296px] rounded-[52px] bg-[rgba(255,255,255,0.01)] p-4 backdrop-blur-lg transition-all duration-100"
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
