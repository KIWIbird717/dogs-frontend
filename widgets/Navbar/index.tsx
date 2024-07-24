import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import NftIcon from "@/public/images/svg/nav/nft.svg";
import StatusIcon from "@/public/images/svg/nav/status.svg";
import EarnIcon from "@/public/images/svg/nav/earn.svg";
import FriendIcon from "@/public/images/svg/nav/friend.svg";
import BoneIcon from "@/public/images/svg/nav/bone.svg";

import { INavItems, NavItems } from "@/widgets/Navbar/shared/ui/NavItems";

interface INavbarProps {
}

const navItemsFirst: INavItems[] = [
  {
    icon: <NftIcon />,
  },
  {
    icon: <StatusIcon />,
  },
];
const navItemsSecond: INavItems[] = [
  {
    icon: <EarnIcon />,
  },
  {
    icon: <FriendIcon />,
  },
];

export const Navbar: FC<INavbarProps> = () => {
  return (
    <div className={"flex items-end w-full h-[107px] z-[10]"}>
      <div className={"flex bg-black-790 justify-between w-full h-[75px] px-4 rounded-t-xl relative"}>
        <NavItems items={navItemsFirst}/>

        <div className={"w-full flex justify-center relative"}>
         <div className={"bg-black-790 flex items-center justify-center rounded-full absolute -top-[28px] w-[72px] h-[72px]"}>
           <Button className={"rounded-full w-[56px] h-[56px] bg-gradient-button-accent shadow-boneButton absolute top-2.5 z-[10]"}>
             <BoneIcon />
           </Button>

           <div className={"absolute top-[38%] bg-none w-[100px] h-[26px]"}/>

           <div className={"absolute top-3 -left-[13.5px] bg-black-790 w-[20px] h-[20px]"}/>
           <div className={"absolute top-2 -left-[13.5px] bg-red w-[20px] h-[20px] rounded-br-[30px]"}/>

           <div className={"absolute top-3 -right-[13.5px] bg-black-790 w-[20px] h-[20px]"}/>
           <div className={"absolute top-2 -right-[13.5px] bg-red w-[20px] h-[20px] rounded-bl-[30px]"}/>
         </div>
        </div>

        <NavItems items={navItemsSecond}/>
      </div>
    </div>
  );
};