import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { HeadersType } from "@/widgets/onboardingMedia";


interface IOnboardingStepsProps {
  step: number;
  headers: HeadersType[];
}

export const OnboardingSteps: FC<IOnboardingStepsProps> = (
  {
    step,
    headers,
  },
) => {

  return (
    <div className={"flex items-center justify-center self-center w-[116px] h-[36px] relative"}>
      <AnimatePresence initial={false}>
        <div className={"flex gap-2 relative z-[4]"}>
          {headers.map((value, index) => {
            return <motion.div
              key={value.id}
              className={twMerge(
                "bg-black-300 w-[12px] h-[12px] rounded-full",
                (step >= index) && "bg-white",
              )}
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1, backgroundColor: step >= index ? "#FFFFFF" : "#000000" }}
              transition={{ duration: 0.3 }}
            />;
          })}
        </div>
        <motion.div
          style={{ width: `calc(20px * ${step + 1})` }}
          className={twMerge(
            "bg-green h-[20px] absolute left-2 rounded-[34px] z-[3]",
          )}
          initial={{ width: 0 }}
          animate={{ width: `calc(20px * ${step + 1})` }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
    </div>
  );
};