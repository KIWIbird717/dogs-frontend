import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import BoneIcon from "@/public/images/svg/boneBig.svg";

interface IClickerProps {
  onIncrementCoin: () => void;
}

export const Clicker: FC<IClickerProps> = (
  {
    onIncrementCoin,
  },
) => {
  return (
    <div className={"w-full flex justify-center"}>
      <Button onClick={onIncrementCoin}
              className={"w-[296px] h-[296px] rounded-[52px] bg-gradient-button-accent shadow-buttonSec"}
      >
        <div
          className={"w-[264px] h-[264px] flex items-center justify-center rounded-[42px] bg-gradient-button-sec"}>
          <BoneIcon />
        </div>
      </Button>
    </div>
  );
};