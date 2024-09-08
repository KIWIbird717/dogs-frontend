import { FC, MouseEventHandler, useEffect } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Button } from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";
import { ProgressBar as ProgressBarV2 } from "@/shared/ui/ProgressBar/v2/index";
import { useGetLevelProgressPercentage } from "./shared/useGetLevelProgressPercentage";
import { GuildButton } from "./shared/GuildButton";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";

interface IBoardProps {}

export const Board: FC<IBoardProps> = (props) => {
  const router = useRouter();

  const level = useAppSelector((store) => store.user.level);
  const guildName = useAppSelector((store) => store.user.guildName);
  const balance = useAppSelector((store) => store.user.balance);

  const levelProgress = useGetLevelProgressPercentage(balance);

  useEffect(() => {
    router.prefetch("/stats");
    router.prefetch("/guilds");
  }, [router]);

  const onRedirectStats = () => router.push("/stats");
  const onRedirectGuilds = () => router.push("/guilds");

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

        {typeof levelProgress === "number" ? (
          <ProgressBarV2 progressPercentage={levelProgress} />
        ) : (
          "max"
        )}
      </Button>

      <GuildButton onClick={onRedirectGuilds} guildName={guildName} />
    </div>
  );
};
