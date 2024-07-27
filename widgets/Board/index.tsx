import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Button } from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";

interface IBoardProps {
}


export const Board: FC<IBoardProps> = () => {
  const {push} = useRouter()
  return (
    <div className={"w-full flex rounded-xl"}>
      <div
        className={"w-1/2 min-h-[62px] h-full flex flex-col gap-2 items-center justify-center border border-black-300 rounded-l-xl shadow-buttonNoAccent bg-black-400 px-2"}
      >

        <Typography tag={"p"}
                    className={"text-[15px] font-bold leading-[18px] text-white-900"}
        >
          Level 1
        </Typography>

        <div className={"w-full rounded-[32px] border border-black-300 h-[8px] relative "}>
          <div className={"absolute left-0 top-0 h-full w-[33%] bg-gradient-loading"} />
        </div>
      </div>
      <Button onClick={() => push('/guilds')}
        className={"w-1/2 min-h-[62px] h-full flex flex-col rounded-l-none gap-1 items-center justify-center border border-black-300 rounded-r-xl shadow-buttonNoAccent bg-black-400 px-2"}
      >
        <Typography tag={"p"}
                    className={"text-[15px] font-bold leading-[18px] text-white-900"}
        >
          Pack
        </Typography>
        <Typography tag={"h4"}
                    className={"text-[18px] font-normal leading-[18px] text-blue-800"}
        >
          Tom & Jerry
        </Typography>
      </Button>
    </div>
  );
};