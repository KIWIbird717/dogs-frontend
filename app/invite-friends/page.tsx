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
import { GuildPlayers, IUserPlayer } from "@/widgets/GuildPlayers";
import { GuildPlayers, IUserPlayer } from "@/widgets/GuildPlayers";
import { Bonus } from "@/widgets/Bonus";

import Gradient1 from "@/public/images/svg/invite-friends/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/invite-friends/gradient/gradient2.svg";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import IUserSlice = UserSlice.IUserSlice;

const players: IUserPlayer = {
  id: "1",
  avatarUrl: "",
  title: "Name",
  league: "Gold",
  coins: "2,64",
};

interface IInviteFriendsProps {}

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
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden px-4 pt-6"
    >
      <HeaderWithIcon title={"Invite Friends"} icon={<PeopleIcon />} />

      <InviteBanner />

      <div className={"z-[10] h-[56px] w-full"}>
        <Button
          variant={isShowBonus ? "select" : "deepBlue"}
          className={twMerge(
            "text-[18px] font-bold leading-6",
            isShowBonus && "border-[2px] border-blue-900",
          )}
          onClick={handleToggle}
        >
          More Bonus
        </Button>
      </div>

      {!isShowBonus && (
        <GuildPlayers title={"Friends"} classNameList={"pb-[190px]"} players={players} />
      )}
      {isShowBonus && <Bonus />}

      <ShareAndInvite onShareHandler={onShareHandler} onCopyHandler={onCopyHandler} />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-0 right-0 z-[1]"} />

      <Navbar />
    </View>
  );
};
export default InviteFriends;
