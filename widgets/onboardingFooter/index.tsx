import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import TickIcon from "@/public/images/svg/onboarding/tick.svg";
import { OnboardingSteps } from "@/widgets/onboardingMedia/entities/Steps";
import { HeadersType } from "../onboardingMedia/shared/types/headers-type";

interface IOnBoardingFooterProps {
  step: number;
  onNext: () => void;
  onPrev: () => void;
  redirect: () => void;
  headers: HeadersType[];
}

export const OnBoardingFooter: FC<IOnBoardingFooterProps> = ({
  step,
  onPrev,
  onNext,
  redirect,
  headers,
}) => {
  const isLastStep = step === 4;

  return (
    /*gap-[30px]*/
    <div className="absolute bottom-0 left-0 w-full px-3 pb-3">
      <div className={"relative z-[10] flex w-full flex-col gap-[6.9768vw]"}>
        <div className={"flex w-full flex-col gap-[3.0233vw]"}>
          {/*gap-[13px]*/}
          {isLastStep && (
            <Button
              variant={"default"}
              className={
                "h-[56px] border-[2px] border-blue-900 text-[18px] font-bold leading-6 text-white-900"
              }
            >
              Go to community
            </Button>
          )}

          <OnboardingSteps step={step} headers={headers} />
        </div>

        <div className={"flex flex-col gap-1"}>
          <div className={"flex w-full gap-2"}>
            <AnimatePresence>
              {step !== 0 && (
                <motion.div
                  initial={{ opacity: 0, width: "0px" }}
                  animate={{ opacity: 1, width: "calc(37%)" }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0, width: "0px" }}
                  // className="overflow-hidden"
                >
                  <Button
                    variant={"noAccent"}
                    onClick={onPrev}
                    className={"text-[18px] font-bold leading-6"}
                  >
                    Back
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

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
              // className="overflow-hidden"
            >
              <Button
                variant={"primary"}
                onClick={onNext}
                className={"w-full text-[18px] font-bold leading-6 text-white-900"}
              >
                {isLastStep ? (
                  <div className={"flex gap-2"}>
                    <div>
                      <TickIcon />
                    </div>
                    <div>Finish</div>
                  </div>
                ) : (
                  <div>Continue</div>
                )}
              </Button>
            </motion.div>
          </div>
          <Button
            onClick={redirect}
            // className={"h-[13.024vw]"}
          >
            I already know
          </Button>
        </div>
      </div>
    </div>
  );
};
