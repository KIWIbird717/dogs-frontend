import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import LinkIcon from "@/public/images/svg/guild/inner-guild/link.svg";

interface IShareAndInviteProps {
  onShareHandler: () => void
  onCopyHandler: () => void
}

export const ShareAndInvite: FC<IShareAndInviteProps> = (
  {
    onShareHandler,
    onCopyHandler
  }
) => {
  return (
    <div className={"absolute left-4 bottom-[116px] w-[calc(100%-32px)] flex gap-2 z-[10]"}>
      <Button variant={"deepBlue"}
              className={"text-[18px] font-bold leading-6 text-white-900"}
              onClick={onShareHandler}
      >
        Invite Friend
      </Button>
      <Button variant={"deepBlue"}
              className={"w-fit p-4"}
              onClick={onCopyHandler}
      >
        <LinkIcon />
      </Button>
    </div>
  );
};