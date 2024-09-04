import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Button } from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";
import { useUser } from "@/shared/hooks/useUser";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { getNextLevelValue } from "@/shared/lib/utils/getNextLevelValue";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";
import { ProgressBar as ProgressBarV2 } from "@/shared/ui/ProgressBar/v2/index";
import { useGetLevelProgressPercentage } from "./shared/useGetLevelProgressPercentage";

interface IBoardProps {}

export const Board: FC<IBoardProps> = () => {
  const { push } = useRouter();
  const { user } = useUser();
  const { level, guildName, balance } = user;
  const { levels } = useAppSelector((store) => store.game);
  const { nextLevelBalance } = getNextLevelValue(level, levels);

  const levelProgress = useGetLevelProgressPercentage();

  const onRedirectStats = () => push("/stats");
  const onRedirectGuilds = () => push("/guilds");

  return (
    <div className={"flex w-full rounded-xl"}>
      <Button
        onClick={onRedirectStats}
        className={
          "flex h-full min-h-[62px] w-1/2 flex-col items-center justify-center gap-2 rounded-l-xl rounded-r-none border border-black-300 bg-black-400 px-2 shadow-buttonNoAccent"
        }
      >
        <Typography tag={"p"} className={"text-[15px] font-bold leading-[18px] text-white-900"}>
          Level {level}
        </Typography>

        <ProgressBar page={"main"} currentBalance={balance} balanceTo={nextLevelBalance} />
        {typeof levelProgress === "number" ? (
          <ProgressBarV2 progressPercentage={levelProgress} />
        ) : (
          "max"
        )}
      </Button>
      <Button
        onClick={onRedirectGuilds}
        className={
          "flex h-full min-h-[62px] w-1/2 flex-col items-center justify-center gap-1 rounded-l-none rounded-r-xl border border-black-300 bg-black-400 px-2 shadow-buttonNoAccent"
        }
      >
        <Typography tag={"p"} className={"text-[15px] font-bold leading-[18px] text-white-900"}>
          Pack
        </Typography>
        <Typography tag={"h4"} className={"text-[18px] font-normal leading-[18px] text-blue-800"}>
          {guildName || "-"}
        </Typography>
      </Button>
    </div>
  );
};
