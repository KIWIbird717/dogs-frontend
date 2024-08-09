import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import TickIcon from "@/public/images/svg/onboarding/tick.svg";
import { OnboardingSteps } from "@/widgets/onboardingMedia/entities/Steps";
import { HeadersType } from "@/widgets/onboardingMedia";
import { headers } from "next/headers";

interface IOnBoardingFooterProps {
  step: number;
  onNext: () => void;
  onPrev: () => void;
  redirect: () => void;
  headers: HeadersType[]
}

export const OnBoardingFooter: FC<IOnBoardingFooterProps> = (
  {
    step,
    onPrev,
    onNext,
    redirect,
    headers
  },
) => {
  const isLastStep = step === 4

  return (
    <div className={"relative z-[10] flex w-full flex-col gap-10 pb-3"}>

     <div className={"w-full flex flex-col gap-[22px]"}>
       {isLastStep && <Button variant={"default"}
                              className={"h-[56px] border-[2px] border-blue-900 text-white-900 text-[18px] font-bold leading-6"}
       >
           Go to community
       </Button>}

       <OnboardingSteps step={step} headers={headers} />
     </div>


      <div className={"flex flex-col gap-1"}>
        <div className={"flex w-full gap-2"}>
            {step !== 0 && (
              <motion.div
                initial={{ opacity: 0, width: "0px" }}
                animate={{ opacity: 1, width: "calc(37%)" }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0, width: "0px" }}
                // className={"w-[calc(37%-4px)]"}
              >
                <Button variant={"noAccent"}
                        onClick={onPrev}
                        className={"font-bold text-[18px] leading-6"}
                >
                  Back
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{
                opacity: 0,
                width: step === 0 ? "100%" : "calc(63%)",
              }}
              exit={{
                opacity: 0,
                width: step === 0 ? "100%" : "calc(63%x)",
              }}
              animate={{
                opacity: 1,
                width: step === 0 ? "100%" : "calc(63%)",
              }}
              transition={{ duration: 0.1 }}
            >
              <Button variant={"primary"}
                      onClick={onNext}
                      className={"w-full font-bold text-[18px] leading-6 text-white-900"}
              >
                {isLastStep
                  ? <div className={"flex gap-2"}>
                    <div>
                      <TickIcon />
                    </div>
                    <div>
                      Finish
                    </div>
                  </div>
                  : <div>
                    Continue
                  </div>}
              </Button>
            </motion.div>
        </div>
        <Button onClick={redirect}>I already know</Button>
      </div>

    </div>
  );
};
