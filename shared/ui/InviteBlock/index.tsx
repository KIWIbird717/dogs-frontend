import { FC } from "react";
import { twMerge } from "tailwind-merge";
import PrizeIcon from "@/public/images/svg/invite-friends/prize.svg";
import { Typography } from "@/shared/ui/Typography/Typography";
import { formatNumber } from "@/shared/lib/utils/formatNumber";
import { Button } from "@/shared/ui/Button/Button";
import { TotalCoin } from "@/shared/ui/TotalCoin";

interface IInviteBlockProps {
  className?: string;
  index: number;
  coin: number;
  claimTime?: string;
  onClickHandler?: () => void;
  isClaimed?: boolean;
}

export const InviteBlock: FC<IInviteBlockProps> = (
  {
    className,
    index,
    coin,
    claimTime,
    isClaimed,
    onClickHandler,
  },
) => {

  const newFormatCoins = formatNumber(coin);

  return (
    <div
      className={twMerge(
        "p-3 flex flex-col gap-2 border border-black-300 shadow-buttonNoAccent rounded-xl",
        index < 2 && "w-[calc(50%-4px)]",
        index === 2 && "w-full",
        className,
      )}
    >
      {index < 2 && <>
        <div className={"w-full flex flex-col items-center gap-1"}>
          <div>
            <PrizeIcon />
          </div>

          <Typography tag={"p"}
                      className={"text-[17px] font-bold leading-6 text-white-900"}
          >
            Friend Telegram
          </Typography>
        </div>

        <div className={"w-full flex flex-col items-center gap-2"}>
          <TotalCoin coin={newFormatCoins}
                     isPlus
                     tag={"h4"}
                     size={"small"}
          />

          <Typography tag={"p"}
                      className={"text-[12px] leading-4 font-normal text-white-800"}
          >
            For you and your friend
          </Typography>
        </div>
      </>
      }
      {
        index === 2 && <div className={"w-full flex flex-col gap-2"}
        >
          <TotalCoin coin={newFormatCoins}
                     isPlus
                     tag={"h1"}
                     size={"big"}
          />
          <Button variant={"deepBlue"}
                  className={twMerge(
                    "text-[18px] font-bold leading-6",
                    isClaimed && "border border-black-400",
                    !isClaimed && "",
                  )}
                  disabled={isClaimed}
                  onClick={onClickHandler}
          >
            {claimTime}
          </Button>
        </div>
      }
    </div>
  );
};