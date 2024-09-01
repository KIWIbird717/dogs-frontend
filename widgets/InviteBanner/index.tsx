import { FC } from "react";
import { InviteBlock } from "@/shared/ui/InviteBlock";
import { Typography } from "@/shared/ui/Typography/Typography";
import { TopInviteBlocks } from "@/shared/ui/InviteBlock/TopInviteBlocks";
import { BottomInviteBlock } from "@/shared/ui/InviteBlock/BottomInviteBlock";

interface IInviteBannerProps {
}

export const InviteBanner: FC<IInviteBannerProps> = () => {
  return (
    <div className={"z-[10] flex w-full flex-wrap gap-2"}>
      <InviteBlock index={0}>
        <TopInviteBlocks coin={25000} />
      </InviteBlock>
      <InviteBlock index={1}>
        <TopInviteBlocks coin={5000} />
      </InviteBlock>
      <InviteBlock index={2}>
        <BottomInviteBlock  />
      </InviteBlock>
      <div className={"flex w-full justify-center"}>
        <Typography tag={"span"} className={"text-center text-white-800"}>
          Score 5% from buddies + 1,5 from their ref friends
        </Typography>
      </div>
    </div>
  );
};
