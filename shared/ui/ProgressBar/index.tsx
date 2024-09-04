import { FC, useEffect, useState } from "react";
import { useProgressBar } from "@/shared/hooks/useProgressBar";
import { twMerge } from "tailwind-merge";
import { cn } from "@/shared/lib/utils/cn";

interface IProgressBarProps {
  page?: "main" | "stats";
  balanceTo?: number | undefined;
  currentBalance?: number | undefined;
}

export const ProgressBar: FC<IProgressBarProps> = ({
  page = "main",
  currentBalance,
  balanceTo,
}) => {
  const { percentage } = useProgressBar(currentBalance!, balanceTo!);

  const WRAPPER_MAIN_PAGE_CLASSNAME =
    "relative h-[8px] w-full rounded-[32px] border border-black-300 overflow-hidden";
  const INNER_MAIN_PAGE_CLASSNAME = "absolute left-0 top-0 h-full bg-gradient-loading";

  const WRAPPER_STATS_PAGE_CLASSNAME =
    "relative h-[8px] w-[296px] rounded-[32px] border border-white-900";
  const INNER_STATS_PAGE_CLASSNAME =
    "absolute -bottom-[2px] -left-[2px] z-[10] h-[10px] w-[45%] rounded-[32px] border-none bg-gradient-button-accent";

  const [classNames, setClassNames] = useState({
    wrapper: WRAPPER_MAIN_PAGE_CLASSNAME,
    inner: INNER_MAIN_PAGE_CLASSNAME,
  });

  useEffect(() => {
    if (page === "main") {
      setClassNames({
        wrapper: WRAPPER_MAIN_PAGE_CLASSNAME,
        inner: INNER_MAIN_PAGE_CLASSNAME,
      });
    } else {
      setClassNames({
        wrapper: WRAPPER_STATS_PAGE_CLASSNAME,
        inner: INNER_STATS_PAGE_CLASSNAME,
      });
    }
  }, [page]);

  return (
    <div className={cn(classNames.wrapper)}>
      <div style={{ width: `${percentage}%` }} className={twMerge(classNames.inner)} />
    </div>
  );
};
