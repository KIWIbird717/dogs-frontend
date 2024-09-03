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
import useSWR from "swr";
import { UsersService } from "@/shared/lib/services/users/users";

interface IInviteFriendsProps {}

const InviteFriends: NextPage<IInviteFriendsProps> = () => {
  const [isShowBonus, setIsShowBonus] = useState(false);

  const { data } = useSWR("/task", UsersService.getMyFriends);
  const friends = data?.data;
  console.log({ data });

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

      <div className={"flex h-full w-full flex-col gap-4 overflow-y-auto"}>
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
          <GuildPlayers title={"Friends"} classNameList={"pb-[190px]"} friends={friends} />
        )}
        {isShowBonus && <Bonus />}
      </div>

      <ShareAndInvite onShareHandler={onShareHandler} onCopyHandler={onCopyHandler} />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-0 right-0 z-[1]"} />

      <Navbar />
    </View>
  );
};
export default InviteFriends;
