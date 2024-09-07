import { FC, MouseEventHandler } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Button } from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";
import { useUser } from "@/shared/hooks/useUser";
import { ProgressBar as ProgressBarV2 } from "@/shared/ui/ProgressBar/v2/index";
import { useGetLevelProgressPercentage } from "./shared/useGetLevelProgressPercentage";
import { GuildButton } from "./shared/GuildButton";

interface IBoardProps {
  balance?: number;
}

export const Board: FC<IBoardProps> = (props) => {
  const { push } = useRouter();
  const { user } = useUser();
  const { level, guildName, balance } = user;

  const levelProgress = useGetLevelProgressPercentage(props.balance || balance);

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
