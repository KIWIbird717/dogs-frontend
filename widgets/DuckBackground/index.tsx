import { FC } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Gradient1 from "@/public/images/svg/loading/gradient1.svg";
import Gradient2 from "@/public/images/svg/loading/gradient2.svg";
import Gradient3 from "@/public/images/svg/loading/gradient3.svg";
import Gradient4 from "@/public/images/svg/loading/gradient4.svg";

interface IDuckBackgroundProps {
  isNftPage?: boolean;
}

export const DuckBackground: FC<IDuckBackgroundProps> = ({ isNftPage }) => {
  return (
    <div className={""}>
      <>
        <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
        <Gradient2 className={"absolute left-0 top-0 z-[1]"} />
        <Gradient3 className={"absolute left-0 top-0 z-[1]"} />
        <Gradient4 className={"absolute left-4 top-0 z-[1]"} />
      </>

      {Array.from(Array(4)).map((value, index) => {
        return (
          <Image
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
