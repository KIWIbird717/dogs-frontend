import { ComponentProps, FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import CoinSmallIcon from "@/public/images/svg/invite-friends/coin.svg";
import CoinMiddleIcon from "@/public/images/svg/guild/coin.svg";
import CoinBigIcon from "@/public/images/svg/invite-friends/coinBig.svg";
import CoinHugeIcon from "@/public/images/svg/coin.svg";
import { twMerge } from "tailwind-merge";

type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span";

export namespace TotalCoinNS {
  // варианты стилей кнопок
  export const size = {
    small: {
      className: "text-[18px] font-normal leading-6 text-white-900",
    },
    middle: {
      className: "text-[17px] font-bold leading-6 text-white-900",
    },
    big: {
      className: "text-[28px] font-normal leading-8 text-white-900",
    },
    huge: {
      className: "text-[28px] font-normal leading-8 text-white-900",
    },
  } as const;

  export type Props = {
    size?: keyof typeof size;
    tag?: TypographyTag;
    isPlus?: boolean;
    info?: string;
    coin: number | string;
    className?: string;
    classNameText?: string;
  } & ComponentProps<"div">;
}

export const TotalCoin: FC<TotalCoinNS.Props> = ({
  coin,
  tag,
  size,
  isPlus,
  info,
  className,
  classNameText,
  ...rest
}) => {
  return (
    <div className={twMerge("flex w-full items-center justify-center gap-1", className)}>
      <div>
        {size === "small" && <CoinSmallIcon />}
        {size === "middle" && <CoinMiddleIcon />}
        {size === "big" && <CoinBigIcon />}
        {size === "huge" && <CoinHugeIcon />}
      </div>
      <Typography
        tag={tag}
        className={twMerge(size && TotalCoinNS.size[size].className, classNameText)}
      >
        {isPlus && "+"}
        {coin} {info}
      </Typography>
    </div>
  );
};
