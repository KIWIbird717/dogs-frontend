import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { TotalCoin } from "@/shared/ui/TotalCoin";
import { Button } from "@/shared/ui/Button/Button";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { useBonusFriend } from "@/shared/hooks/useBonusFriend";
import { CountDownWrapper } from "@/shared/ui/CountDownWrapper";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IBottomInviteBlockProps {

}

export const BottomInviteBlock: FC<IBottomInviteBlockProps> = () => {
  const { bonus, isDisabled, onToggleDisabled, onClaimBonusFriend } = useBonusFriend();
  const newFormatCoins = formatNumber(5000);
  const timeStamp = new Date(bonus?.nextUsage!).getTime() - new Date().getTime();

  return (
    <div className={"flex w-full flex-col gap-2"}>
      <TotalCoin coin={newFormatCoins} isPlus tag={"h1"} size={"big"} />
      <Button
        variant={"deepBlue"}
        className={twMerge(
          "text-[18px] font-bold leading-6",
          !isDisabled && "border border-black-400",
        )}
        disabled={bonus?.amount === 0 || isDisabled}
        onClick={onClaimBonusFriend}
      >
        {bonus
          ? bonus?.amount !== 0
            ?
            <CountDownWrapper timeStamp={timeStamp}
                              onToggleDisabled={onToggleDisabled}
                              titleCompleted={"Claim"}
                              titleUnCompleted={"Claim at"}
                              key={String(new Date(bonus?.nextUsage!).getTime())}
            />
            : <Typography className={twMerge("text-[18px] font-bold leading-6 text-white-900")}
                          tag={"p"}
            >
              You don&apos;t have any friends
            </Typography>
          : <Typography className={twMerge("text-[18px] font-bold leading-6 text-white-900")}
                        tag={"p"}
          >
            Claim
          </Typography>
        }

      </Button>
    </div>
  );
};