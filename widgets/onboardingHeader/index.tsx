import { FC } from "react";
import { HeadersType } from "@/widgets/onboardingMedia";
import { AnimatePresence, motion } from "framer-motion";

interface IOnboardingHeaderProps {
  header: HeadersType;
  step: number;
}

export const OnboardingHeader: FC<IOnboardingHeaderProps> = ({ header, step }) => {
  return (
    <AnimatePresence mode={"wait"}>
      <motion.div
        className={"flex w-full flex-col gap-2"}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        key={step}
      >
        <div>{header.title}</div>
        <div>{header.description}</div>
      </motion.div>
    </AnimatePresence>
  );
};
