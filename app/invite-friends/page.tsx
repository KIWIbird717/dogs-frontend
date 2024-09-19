"use client";

import { NextPage } from "next";
import PeopleIcon from "@/public/images/svg/invite-friends/people.svg";
import { HeaderWithIcon } from "@/shared/ui/HeaderWithIcon";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { ShareAndInvite } from "@/widgets/ShareAndInvite";
import { InviteBanner } from "@/widgets/InviteBanner";
import { Button } from "@/shared/ui/Button/Button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { GuildPlayers } from "@/widgets/GuildPlayers";
import { Bonus } from "@/widgets/Bonus";
import useSWR from "swr";
import { UsersService } from "@/shared/lib/services/users/users";
import toast from "react-hot-toast";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";
import { Gradient } from "@/shared/ui/Gradient";

interface IInviteFriendsProps {}
const inviteText = "Join and play DOGS with me";

const InviteFriends: NextPage<IInviteFriendsProps> = () => {
  const [isShowBonus, setIsShowBonus] = useState(false);
  const telegram_id = useAppSelector((store) => store.user.telegram_id);

  const inviteLink =
    process.env.NEXT_PUBLIC_INVITE_LINK +
    `?startapp=${process.env.NEXT_PUBLIC_INVITE_LINK_PREFIX}${telegram_id}`;
  const fullInviteLink = process.env.NEXT_PUBLIC_INVITE_LINK
    ? inviteLink
    : "we can not create invite link :(";

  const { data } = useSWR("GET /users/my-friends", UsersService.getMyFriends);
  const friends = data?.data;

  const handleToggle = () => setIsShowBonus(!isShowBonus);

  const onCopyHandler = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() => toast.success("Copied"))
      .catch(() => toast.error("Copy not allowed in your telegram app. Allow it in settings"));
  };

  return (
    <>
      <View
        fadeInOnLoad
        className="relative z-[2] flex h-screen w-full flex-col gap-4 overflow-x-hidden px-4 pt-6"
      >
        <HeaderWithIcon title="Invite Friends" icon={<PeopleIcon />} />

        <div className="flex h-full w-full flex-col gap-4">
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
              {isShowBonus ? "Less bonus" : "More bonus"}
            </Button>
          </div>

          {!isShowBonus && (
            <GuildPlayers title={"Friends"} classNameList="pb-[190px]" friends={friends} />
          )}
          {isShowBonus && <Bonus />}
        </div>

        <ShareAndInvite
          inviteText={inviteText}
          fullInviteLink={fullInviteLink}
          onCopyHandler={onCopyHandler}
        />

        <Navbar />
      </View>

      <Gradient.First className="absolute top-[-30%] scale-150" />
      <Gradient.Second className="absolute bottom-[-10%] scale-150" />
    </>
  );
};
export default InviteFriends;
