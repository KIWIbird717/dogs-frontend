"use client";

import { FC } from "react";
import { HeadersType } from "../onboardingMedia/shared/types/headers-type";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

interface IOnboardingHeaderProps {
  header: HeadersType;
  step: number;
}

export const OnboardingHeader: FC<IOnboardingHeaderProps> = ({ header, step }) => {
  return (
    <AnimatePresence mode={"wait"}>
      <MotionDiv
        className={"flex w-full flex-col gap-2"}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        key={step}
      >
        <div>{header.title}</div>
        <div className={""}>{header.description}</div>
      </MotionDiv>
    </AnimatePresence>
  );
};
