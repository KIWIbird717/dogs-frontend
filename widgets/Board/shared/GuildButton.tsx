"use client";

import { FC, MouseEventHandler, useEffect } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Button } from "@/shared/ui/Button/Button";

type GuildButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  guildName?: string | null;
};
export const GuildButton: FC<GuildButtonProps> = (props) => {
  useEffect(() => {
    console.log({ guildName: props.guildName });
  }, [props.guildName]);

  return (
    <Button
      onClick={props.onClick}
      className={
        "flex h-full min-h-[62px] w-1/2 flex-col items-center justify-center gap-1 rounded-l-none rounded-r-xl border border-black-300 bg-black-400 px-2 shadow-buttonNoAccent"
      }
    >
      {props.guildName ? (
        <>
          <Typography tag={"p"} className={"text-[15px] font-bold leading-[18px] text-white-900"}>
            Guild
          </Typography>
          <Typography tag={"h4"} className={"text-[18px] font-normal leading-[18px] text-blue-800"}>
            {props.guildName}
          </Typography>
        </>
      ) : (
        <>
          <Typography tag="p" className={"text-[15px] font-bold leading-[18px] text-white-500"}>
            Press & Join to
          </Typography>
          <Typography tag="p" className="text-[18px] font-bold leading-[18px] text-white-500">
            GUILD
          </Typography>
        </>
      )}
    </Button>
  );
};
