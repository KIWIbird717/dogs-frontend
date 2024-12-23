import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { HeadersType } from "../../shared/types/headers-type";

interface IOnboardingStepsProps {
  step: number;
  headers: HeadersType[];
}

export const OnboardingSteps: FC<IOnboardingStepsProps> = ({ step, headers }) => {
  return (
    <div className={"relative flex h-[36px] w-[116px] items-center justify-center self-center"}>
      <div className={"relative z-[4] flex gap-3"}>
        <AnimatePresence>
          {headers.map((value, index) => {
            return (
              <motion.div
                key={`steps-${value.id}`}
                className={twMerge(
                  "h-[8px] w-[8px] rounded-full bg-black-300",
                  step >= index && "bg-white",
                )}
                initial={{ scale: 0.5, opacity: 0.5 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  backgroundColor: step >= index ? "#FFFFFF" : "#000000",
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <motion.div
        className={twMerge("absolute left-2 z-[3] h-[20px] rounded-[34px] bg-green")}
        initial={{ width: `calc(20px * ${step})` }}
        animate={{ width: `calc(20px * ${step + 1})` }}
        transition={{ duration: 0.3 }}
        key={`step-${step}`}
      />
    </div>
  );
};
