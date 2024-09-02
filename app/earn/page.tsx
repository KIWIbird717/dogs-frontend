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
import { Typography } from "@/shared/ui/Typography/Typography";
import useSWR from "swr";
import { TasksService } from "@/shared/lib/services/tasks/stats";

interface IEarnPageProps {}

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
      },
      {
        icon: <NFTIcon />,
        title: "Special Task",
        description: "Post a Story on Instagram",
        purpose: "Follow Kori on Twitter for educantional content and crypto advice.",
        coin: 25000,
        isClaim: true,
      },
      {
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
      },
      {
        icon: <NFTIcon />,
        title: "Special Task",
        description: "Post a Story on Instagram",
        purpose: "Follow Kori on Twitter for educantional content and crypto advice.",
        coin: 25000,
        isClaim: true,
      },
    ],
  },
];

export type ToggleCategoryType = "rewards" | "tasks";

const EarnPage: NextPage<IEarnPageProps> = () => {
  const [toggle, setToggle] = useState<ToggleCategoryType>("rewards");
  const onSetRewards = () => setToggle("rewards");
  const onSetTasks = () => setToggle("tasks");

  const {data} = useSWR("/task", TasksService.getTasks)

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden px-4 pt-6"
    >
      <Header />

      <div className={"z-[10] flex h-[48px] w-full gap-2"}>
        <Button
          variant={"default"}
          className={twMerge(
            "h-full rounded-none border-b border-b-white-800 text-[15px] font-bold leading-[18px]",
            toggle === "rewards" && "border-b-blue-900",
          )}
          onClick={onSetRewards}
        >
          <Typography
            tag={"span"}
            className={"text-[15px] font-bold leading-[18px] text-white-900"}
          >
            Rewards
          </Typography>
        </Button>
        <Button
          variant={"default"}
          className={twMerge(
            "h-full rounded-none border-b border-b-white-800 text-[15px] font-bold leading-[18px]",
            toggle === "tasks" && "border-b-blue-900",
          )}
          onClick={onSetTasks}
        >
          <Typography
            tag={"span"}
            className={"text-[15px] font-bold leading-[18px] text-white-900"}
          >
            Tasks
          </Typography>
        </Button>
      </div>

      <div className={"flex h-full flex-col overflow-y-auto"}>
        {toggle === "rewards" && <TaskList tasks={dogiYoutube} toggle={toggle} />}
        {toggle === "tasks" && <TaskList tasks={tasks} toggle={toggle} />}
      </div>

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-0 right-0 z-[1]"} />
    </View>
  );
};
export default EarnPage;
