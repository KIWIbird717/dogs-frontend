"use client";

import { FC, useMemo } from "react";
import { Button } from "@/shared/ui/Button/Button";
import NftIcon from "@/public/images/svg/nav/nft.svg";
import StatusIcon from "@/public/images/svg/nav/status.svg";
import EarnIcon from "@/public/images/svg/nav/earn.svg";
import FriendIcon from "@/public/images/svg/nav/friend.svg";
import BoneIcon from "@/public/images/svg/nav/bone.svg";

import { INavItems, NavItems } from "@/widgets/Navbar/shared/ui/NavItems";
import { usePathname } from "next/navigation";

interface INavbarProps {}

export const Navbar: FC<INavbarProps> = () => {
  const pathName = usePathname();

  const navItemsFirst: INavItems[] = useMemo(
    () => [
      {
        icon: NftIcon,
        title: "NFT",
        link: "/nft",
      },
      {
        icon: StatusIcon,
        title: "Stats",
        link: "/leaderboard",
      },
    ],
    [],
  );

  const navItemsSecond: INavItems[] = useMemo(
    () => [
      {
        icon: EarnIcon,
        title: "NFT",
        link: "/earn",
      },
      {
        icon: FriendIcon,
        title: "NFT",
        link: "/nft3",
      },
    ],
    [],
  );

  return (
    <div className={"fixed bottom-0 left-0 z-[10] flex h-[107px] w-full items-end"}>
      <div
        className={"relative flex h-[75px] w-full justify-between rounded-t-xl bg-black-790 px-4"}
      >
        <NavItems items={navItemsFirst} pathName={pathName} />

        <div className={"relative flex w-full justify-center"}>
          <div
            className={
              "absolute -top-[28px] flex h-[72px] w-[72px] items-center justify-center rounded-full bg-black-790"
            }
          >
            <Button
              className={
                "absolute top-2.5 z-[10] h-[56px] w-[56px] rounded-full bg-gradient-button-accent shadow-boneButton"
              }
            >
              <BoneIcon />
            </Button>

            <div className={"absolute top-[38%] h-[26px] w-[100px] bg-none"} />

            <div
              className={"absolute -left-[32px] top-[-12px] h-[40px] w-[40px] rounded-full bg-none"}
              style={{ boxShadow: "20px 25px #1E1E1E" }}
            />
            <div
              className={
                "absolute -right-[32px] top-[-12px] h-[40px] w-[40px] rounded-full bg-none"
              }
              style={{ boxShadow: "-20px 25px #1E1E1E" }}
            />
          </div>
        </div>

        <NavItems items={navItemsSecond} pathName={pathName} />
      </div>
    </div>
  );
};
