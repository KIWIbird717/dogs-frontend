import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import LinkIcon from "@/public/images/svg/guild/inner-guild/link.svg";

interface IShareAndInviteProps {
  onShareHandler: () => void;
  onCopyHandler: () => void;
  fullInviteLink: string;
  inviteText: string;
}

export const ShareAndInvite: FC<IShareAndInviteProps> = ({
  onShareHandler,
  onCopyHandler,
  ...props
}) => {
  return (
    <div className={"fixed bottom-[116px] left-4 z-[10] flex w-[calc(100%-32px)] gap-2"}>
      <a
        href={`https://telegram.me/share/url?url=${props.fullInviteLink}&text=${props.inviteText}`}
      >
        Test
      </a>
      <Button
        variant={"deepBlue"}
        className={"text-[18px] font-bold leading-6 text-white-900"}
        onClick={onShareHandler}
      >
        Invite Friend
      </Button>
      <Button variant={"deepBlue"} className={"w-fit p-4"} onClick={onCopyHandler}>
        <LinkIcon />
      </Button>
    </div>
  );
};
