import { FC, useMemo } from "react";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useProgressBar } from "@/shared/hooks/useProgressBar";
import { getNumeralSuffix } from "@/shared/lib/utils/getNumeralSuffix";

interface IProgressProps {
  currentRank: string;
  serialNumber: number;
}

export const Progress: FC<IProgressProps> = ({ currentRank, serialNumber }) => {
  const { nextLevelBalance, balance } = useProgressBar();

  const numeral = useMemo(() => getNumeralSuffix(balance).toLowerCase(), [balance]);
  const nextNumeral = useMemo(() => getNumeralSuffix(nextLevelBalance), [nextLevelBalance]);

  return (
    <div className={"flex w-full flex-col items-center gap-[11px]"}>
      <div className={"flex w-full flex-col justify-center"}>
        <Typography tag={"h1"} className={"text-center text-white-900"}>
          #{serialNumber} {currentRank}
        </Typography>
        <Typography
          tag={"p"}
          className={"text-center text-[17px] font-normal leading-6 text-white-900"}
        >
          {balance}
          {numeral}/{nextLevelBalance}
          {nextNumeral}
        </Typography>
      </div>

      <ProgressBar page={"stats"} />
    </div>
  );
};
