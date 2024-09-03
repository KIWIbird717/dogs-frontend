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
import toast, { Toaster } from "react-hot-toast";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";

interface IInviteFriendsProps {}
const inviteText = "Join and play DOGS with me";
const inviteTitle = "Join to DOGS";

const InviteFriends: NextPage<IInviteFriendsProps> = () => {
  const [isShowBonus, setIsShowBonus] = useState(false);
  const me = useAppSelector((store) => store.user);

  const inviteLink = process.env.NEXT_PUBLIC_INVITE_LINK + `?startapp=huh${me.telegram_id}`;
  const fullInviteLink = process.env.NEXT_PUBLIC_INVITE_LINK
    ? inviteLink
    : "we can not create invite link :(";

  const { data } = useSWR("/task", UsersService.getMyFriends);
  const friends = data?.data;

  const handleToggle = () => setIsShowBonus(!isShowBonus);

  const onCopyHandler = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() => toast.success("Copied"))
      .catch(() => toast.error("Copy not allowed in your telegram app. Allow it in settings"));
  };

  const onShareHandler = () => {
    navigator
      .share({ title: inviteTitle, text: inviteText, url: fullInviteLink })
      .catch((error) => {
        if (error.name === "AbortError") return;
        toast.error("Share not allowed in your telegram app. Allow it in settings");
      });
  };

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden px-4 pt-6"
    >
      <Toaster />
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
