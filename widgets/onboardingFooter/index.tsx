import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { AnimatePresence, motion } from "framer-motion";

interface IOnBoardingFooterProps {
  step: number;
  onNext: () => void;
  onPrev: () => void;
  redirect: () => void;
}

export const OnBoardingFooter: FC<IOnBoardingFooterProps> = (
  {
    step,
    onPrev,
    onNext,
    redirect,
  },
) => {
  return (
    <div className={"w-full flex flex-col gap-1 pb-3 relative z-[10]"}>
      <div className={"w-full flex gap-2"}>
        <AnimatePresence>
          {step !== 0 && (
            <motion.div
              initial={{ opacity: 0, width: "0px" }}
              animate={{ opacity: 1, width: "calc(37% - 4px)" }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, width: "0px" }}
              // className={"w-[calc(37%-4px)]"}
              key="back-button"
            >
              <Button variant={"noAccent"}
                      onClick={onPrev}

              >
                Back
              </Button>
            </motion.div>
          )}

          <motion.div
            initial={{
              opacity: 0, width: step === 0
                ? "100%"
                : "calc(63% - 4px)",
            }}
            exit={{
              opacity: 0, width: step === 0
                ? "100%"
                : "calc(63% - 4px)",
            }}
            animate={{
              opacity: 1, width: step === 0
                ? "100%"
                : "calc(63% - 4px)",
            }}
            transition={{ duration: 0.1 }}

            key="next-button"
          >
            <Button variant={"primary"}
                    onClick={onNext}
                    className={"w-full"}

            >
              Continue
            </Button>
          </motion.div>
        </AnimatePresence>

      </div>
      <Button
        onClick={redirect}
      >
        I already know
      </Button>
    </div>
  );
};