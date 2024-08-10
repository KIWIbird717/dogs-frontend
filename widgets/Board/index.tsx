import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Button } from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";
import { useUser } from "@/shared/hooks/useUser";

interface IBoardProps {}

export const Board: FC<IBoardProps> = () => {
  const { push } = useRouter();
  const {user} = useUser()
  const {level, guild} = user

  return (
    <div className={"flex w-full rounded-xl"}>
      <div
        className={
          "flex h-full min-h-[62px] w-1/2 flex-col items-center justify-center gap-2 rounded-l-xl border border-black-300 bg-black-400 px-2 shadow-buttonNoAccent"
        }
      >
        <Typography tag={"p"} className={"text-[15px] font-bold leading-[18px] text-white-900"}>
          Level {level}
        </Typography>

        <div className={"relative h-[8px] w-full rounded-[32px] border border-black-300"}>
          <div className={"absolute left-0 top-0 h-full w-[33%] bg-gradient-loading"} />
        </div>
      </div>
      <Button
        onClick={() => push("/guilds")}
        className={
          "flex h-full min-h-[62px] w-1/2 flex-col items-center justify-center gap-1 rounded-l-none rounded-r-xl border border-black-300 bg-black-400 px-2 shadow-buttonNoAccent"
        }
      >
        <Typography tag={"p"} className={"text-[15px] font-bold leading-[18px] text-white-900"}>
          Pack
        </Typography>
        <Typography tag={"h4"} className={"text-[18px] font-normal leading-[18px] text-blue-800"}>
          {guild || "null"}
        </Typography>
      </Button>
    </div>
  );
};
