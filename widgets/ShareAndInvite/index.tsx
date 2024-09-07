import { FC } from "react";
import { Button, ButtonNS } from "@/shared/ui/Button/Button";
import LinkIcon from "@/public/images/svg/guild/inner-guild/link.svg";
import { cn } from "@/shared/lib/utils/cn";

interface IShareAndInviteProps {
  onCopyHandler: () => void;
  fullInviteLink: string;
  inviteText: string;
}

export const ShareAndInvite: FC<IShareAndInviteProps> = ({ onCopyHandler, ...props }) => {
  const formattedLink = `https://telegram.me/share/url?url=${props.fullInviteLink}&text=${props.inviteText}`;

  return (
    <div className={"fixed bottom-[116px] left-4 z-[10] flex w-[calc(100%-32px)] gap-2"}>
      {/* <a
        href={`https://telegram.me/share/url?url=${props.fullInviteLink}&text=${props.inviteText}`}
      >
        Test
      </a> */}
      <a
        className={cn(
          ButtonNS.DEFAULT_CLASSES,
          "bg-gradient-button-accent text-white-900 shadow-buttonAccent",
          "text-[18px] font-bold leading-6 text-white-900",
        )}
        href={formattedLink}
      >
        Invite Friend
      </a>
      <Button
        variant={"deepBlue"}
        className={cn(ButtonNS.DEFAULT_CLASSES, "w-fit p-4")}
        onClick={onCopyHandler}
      >
        <LinkIcon />
      </Button>
    </div>
  );
};
