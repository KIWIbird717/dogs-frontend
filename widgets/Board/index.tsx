import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Button } from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";
import { useUser } from "@/shared/hooks/useUser";
import { ProgressBar } from "@/shared/ui/ProgressBar";

interface IBoardProps {}

export const Board: FC<IBoardProps> = () => {
  const { push } = useRouter();
  const { user } = useUser();
  const { level, guildName } = user;

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

        <ProgressBar page={"main"} />
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
          {guildName || "-"}
        </Typography>
      </Button>
    </div>
  );
};
