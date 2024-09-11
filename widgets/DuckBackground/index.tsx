"use client";

import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { usePreventOnSwipeWindowClose } from "@/shared/hooks/usePreventSwipeClose";
import { Gradient } from "@/shared/ui/Gradient";

interface IDuckBackgroundProps {
  isNftPage?: boolean;
}

export const DuckBackground: FC<IDuckBackgroundProps> = ({ isNftPage }) => {
  usePreventOnSwipeWindowClose(true);

  return (
    <div className={""}>
      <>
        <Gradient.First className="absolute left-[-40%] top-[-20%]" />
        <Gradient.Second className="absolute bottom-[-10%] right-[-30%] scale-125" />
      </>

      {Array.from(Array(4)).map((value, index) => {
        return (
          <img
            key={index}
            src={"/images/duck.png"}
            alt={"duck-background-1"}
            className={twMerge(
              "absolute",
              index === 0 && "-left-[23px] top-[67px] blur-[2px]",
              index === 1 && "right-[14px] top-[195px] blur-[4px]",
              index === 2 && "-left-[21px] bottom-[158px] blur-[23px]",
              index === 3 && "-right-[30px] bottom-[11px] blur-[2px]",

              isNftPage && index === 2 && "-left-[21px] bottom-[158px] blur-[23px]",
              isNftPage && index === 3 && "-right-[30px] bottom-[71px] blur-[2px]",
            )}
            width={173}
            height={173}
          />
        );
      })}
    </div>
  );
};
