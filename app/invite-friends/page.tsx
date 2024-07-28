"use client";

import { NextPage } from "next";
import PeopleIcon from "@/public/images/svg/invite-friends/people.svg";
import { HeaderWithIcon } from "@/widgets/HeaderWithIcon";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { ShareAndInvite } from "@/widgets/ShareAndInvite";
import { InviteBanner } from "@/widgets/InviteBanner";
import { Button } from "@/shared/ui/Button/Button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { GuildPlayers } from "@/widgets/GuildPlayers";
import { Bonus } from "@/widgets/Bonus";

import Gradient1 from "@/public/images/svg/invite-friends/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/invite-friends/gradient/gradient2.svg";

interface IInviteFriendsProps {
}

const InviteFriends: NextPage<IInviteFriendsProps> = () => {
  const [isShowBonus, setIsShowBonus] = useState(false);

  const handleToggle = () => setIsShowBonus(!isShowBonus);

  const onCopyHandler = () => {
    navigator.clipboard.writeText("" as string);
  };

  const onShareHandler = () => {
    navigator.share({ text: "" as string });
  };

  return (
    <View fadeInOnLoad
          className="flex flex-col gap-4 w-full h-screen relative px-4 pt-6 overflow-hidden"
    >
      <HeaderWithIcon title={"Invite Friends"}
                      icon={<PeopleIcon />}
      />

      <InviteBanner />

      <div className={"w-full h-[56px] z-[10]"}>
        <Button variant={isShowBonus ? "select" : "deepBlue"}
                className={twMerge(
                  "text-[18px] font-bold leading-6",
                  isShowBonus && "border-[2px] border-blue-900",
                )}
                onClick={handleToggle}
        >
          More bonus
        </Button>
      </div>

      {!isShowBonus && <GuildPlayers title={"Friends"}
                                     classNameList={"pb-[190px]"}
      />}
      {isShowBonus && <Bonus />}


      <ShareAndInvite onShareHandler={onShareHandler}
                      onCopyHandler={onCopyHandler}
      />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute right-0 bottom-0 z-[1]"} />

      <Navbar />
    </View>
  );
};
export default InviteFriends;