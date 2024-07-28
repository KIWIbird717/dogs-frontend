import { FC, useState } from "react";
import { InviteBlock } from "@/shared/ui/InviteBlock";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IInviteBannerProps {
}

export const InviteBanner: FC<IInviteBannerProps> = () => {
  const [isClaimed, setIsClaimed] = useState(false);

  const onClickHandler = () => setIsClaimed(!isClaimed)
  const buttonText = isClaimed ? "Claim in 6h69m" : "Claim"

  return (
    <div className={"w-full flex flex-wrap gap-2 z-[10]"}>
      <InviteBlock index={0}
                   coin={25000}
      />
      <InviteBlock index={1}
                   coin={5000}
      />
      <InviteBlock index={2}
                   coin={5000}
                   claimTime={buttonText}
                   isClaimed={isClaimed}
                   onClickHandler={onClickHandler}
      />
      <div className={"w-full flex justify-center"}>
        <Typography tag={"span"}
                    className={"text-white-800 text-center"}
        >
          Score 5% from buddies + 1,5 from their ref friends
        </Typography>
      </div>
    </div>
  );
};