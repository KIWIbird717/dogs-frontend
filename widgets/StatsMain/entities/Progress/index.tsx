import { FC, useMemo } from "react";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useProgressBar } from "@/shared/hooks/useProgressBar";
import { getNumeralSuffix } from "@/shared/lib/utils/getNumeralSuffix";
import { StatsApiTypes } from "@/shared/lib/services/stats/types";
import LeaguesStatusBar = StatsApiTypes.LeaguesStatusBar;

interface IProgressProps {
  currentRank: string;
  serialNumber: number;
  statusBar: LeaguesStatusBar | null | undefined;
  isMyRank: boolean
}

export const Progress: FC<IProgressProps> = (
  {
    currentRank,
    serialNumber,
    statusBar,
    isMyRank
  },
) => {
  const numeral = useMemo(() => getNumeralSuffix(statusBar?.currentBalance!).toLowerCase(), [statusBar?.currentBalance!]);
  const nextNumeral = useMemo(() => getNumeralSuffix(statusBar?.balanceTo!), [statusBar?.balanceTo!]);

  return (
    <div className={"flex w-full flex-col items-center gap-[11px] h-[75px]"}>
      <div className={"flex w-full flex-col justify-center"}>
        <Typography tag={"h1"} className={"text-center text-white-900"}>
          {isMyRank && <>#{serialNumber}</>} {currentRank}
        </Typography>

        {isMyRank && <>
            <Typography
              tag={"p"}
              className={"text-center text-[17px] font-normal leading-6 text-white-900"}
            >
              {statusBar?.currentBalance!}{numeral}/{statusBar?.balanceTo!}{nextNumeral}
            </Typography>
          </>
        }
      </div>

      {isMyRank && <ProgressBar page={"stats"}
                    balanceTo={statusBar?.balanceTo!}
                    currentBalance={statusBar?.currentBalance!}
      />}
    </div>
  );
};
