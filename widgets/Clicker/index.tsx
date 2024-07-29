import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import BoneIcon from "@/public/images/svg/boneBig.svg";

interface IClickerProps {
  onIncrementCoin: () => void;
}

export const Clicker: FC<IClickerProps> = ({ onIncrementCoin }) => {
  return (
    <div className={"flex w-full justify-center"}>
      <Button
        onClick={onIncrementCoin}
        className={"h-[296px] w-[296px] rounded-[52px] bg-gradient-button-accent shadow-buttonSec"}
      >
        <div
          className={
            "flex h-[264px] w-[264px] items-center justify-center rounded-[42px] bg-gradient-button-sec"
          }
        >
          <BoneIcon />
        </div>
      </Button>
    </div>
  );
};
