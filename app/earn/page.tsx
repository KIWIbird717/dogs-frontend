"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Header } from "@/widgets/Header";
import { Button } from "@/shared/ui/Button/Button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { Navbar } from "@/widgets/Navbar";

import YoutubeIcon from "@/public/images/svg/earn/youtube.svg";
import XIcon from "@/public/images/svg/earn/x.svg";
import NFTIcon from "@/public/images/svg/earn/nft.svg";
import { TaskList } from "@/widgets/TaskList";
import { ITaskObj } from "@/shared/lib/redux-store/slices/modal-slice/type";

import Gradient1 from "@/public/images/svg/earn/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/earn/gradient/gradient2.svg";


interface IEarnPageProps {
}

const dogiYoutube: ITaskObj[] = [
  {
    title: "Dogi Youtube",
    tasks: [
      {
        icon: <YoutubeIcon />,
        title: "Special Task",
        description: "Post a Story on Instagram",
        purpose: "Take a look and come back to collect your rewar",
        coin: 25000,
      },
      {
        icon: <YoutubeIcon />,
        title: "Special Task",
        description: "Post a Story on Instagram",
        purpose: "Take a look and come back to collect your rewar",
        coin: 25000,
      },
    ],
  },
  {
    title: "Dogi Task",
    tasks: [
      {
        icon: <YoutubeIcon />,
        title: "Special Task",
        description: "Post a Story on Instagram",
        purpose: "Take a look and come back to collect your rewar",
        coin: 25000,
      },
      {
        icon: <YoutubeIcon />,
        title: "Special Task",
        description: "Post a Story on Instagram",
        purpose: "Take a look and come back to collect your rewar",
        coin: 25000,
      },
    ],
  },
];

const tasks: ITaskObj[] = [
  {
    title: "Dogi Youtube",
    tasks: [
      {
        icon: <YoutubeIcon />,
        title: "Follow Kori our Co-Founder",
        description: "Post a Story on Instagram",
        purpose: "Follow Kori on Twitter for educantional content and crypto advice.",
        coin: 25000,
        isClaim: false,
      },
      {
        icon: <XIcon />,
        title: "Share In X",
        description: "Post a Story on Instagram",
        purpose: "Follow Kori on Twitter for educantional content and crypto advice.",
        coin: 25000,
        isClaim: false,
      },{

        icon: <NFTIcon />,
        title: "Special Task",
        description: "Post a Story on Instagram",
        purpose: "Follow Kori on Twitter for educantional content and crypto advice.",
        coin: 25000,
        isClaim: true,
      },{
        icon: <YoutubeIcon />,
        title: "Follow Kori our Co-Founder",
        description: "Post a Story on Instagram",
        purpose: "Follow Kori on Twitter for educantional content and crypto advice.",
        coin: 25000,
        isClaim: true,
      },
      {
        icon: <XIcon />,
        title: "Share In X",
        description: "Post a Story on Instagram",
        purpose: "Follow Kori on Twitter for educantional content and crypto advice.",
        coin: 25000,
        isClaim: true,
      },{

        icon: <NFTIcon />,
        title: "Special Task",
        description: "Post a Story on Instagram",
        purpose: "Follow Kori on Twitter for educantional content and crypto advice.",
        coin: 25000,
        isClaim: true,
      },
    ],
  }
];

export type ToggleCategoryType =  "rewards" | "tasks"

const EarnPage: NextPage<IEarnPageProps> = () => {
  const [toggle, setToggle] = useState<ToggleCategoryType>("rewards");
  const onSetRewards = () => setToggle("rewards");
  const onSetTasks = () => setToggle("tasks");

  return (
    <View fadeInOnLoad
          className="flex flex-col gap-4 w-full h-screen relative px-4 pt-6 overflow-hidden"
    >
      <Header />

      <div className={"w-full flex gap-2 h-[48px] z-[10]"}>
        <Button variant={"default"}
                className={twMerge(
                  "border-b border-b-white-800 rounded-none h-full text-[15px] leading-[18px] font-bold",
                  toggle === "rewards" && "border-b-blue-900",
                )}
                onClick={onSetRewards}
        >
          Rewards
        </Button>
        <Button variant={"default"}
                className={twMerge(
                  "border-b border-b-white-800 rounded-none h-full text-[15px] leading-[18px] font-bold",
                  toggle === "tasks" && "border-b-blue-900",
                )}
                onClick={onSetTasks}
        >
          Tasks
        </Button>
      </div>

      {toggle === "rewards" && <TaskList tasks={dogiYoutube}
                                         toggle={toggle}
      />}
      {toggle === "tasks" && <TaskList tasks={tasks}
                                       toggle={toggle}
      />}

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute right-0 bottom-0 z-[1]"} />
    </View>
  );
};
export default EarnPage;