import { cn } from "@/shared/lib/utils/cn";
import { FC } from "react";

type ProgressBarProps = {
  /**
   * progressPercentage={10} -> 10%
   * progressPercentage={50} -> 50%
   * progressPercentage={0.1} -> 0.1%
   */
  progressPercentage: number;
};

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  return (
    <div className="flex h-[8px] w-full justify-end overflow-hidden rounded-full border-[1px] border-black-300 bg-gradient-loading">
      <div
        className="h-full bg-[rgb(48,57,74)]"
        style={{ width: `${100 - props.progressPercentage}%` }}
      />
    </div>
  );
};
