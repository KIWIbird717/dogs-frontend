"use client";

import { FC, useEffect, useState } from "react";
import { OnboardingHeader } from "@/widgets/onboardingHeader";
import { OnBoardingFooter } from "@/widgets/onboardingFooter";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { UsersService } from "@/shared/lib/services/users/users";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { usePreventOnSwipeWindowClose } from "@/shared/hooks/usePreventSwipeClose";
import { headers } from "./shared/constants/headers";
import { sleep } from "@/shared/lib/utils/sleep";

interface IOnboardingMediaProps {}

export const OnboardingMedia: FC<IOnboardingMediaProps> = () => {
  usePreventOnSwipeWindowClose(true);

  const router = useRouter();
  const [step, setStep] = useState(0);
  const dispatch = useAppDispatch();

  const redirectToMain = () => router.push("/main");

  const onNextStep = () => {
    if (step === 4) redirectToMain();
    if (step >= 0 && step < 4) {
      setStep(step + 1);
    }
  };
  const onPrevStep = () => {
    if (step === 0) return;
    if (step !== 0 && step <= 4) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    const logger = new Logger("OnboardingMedia");
    router.prefetch("./main");

    (async () => {
      try {
        await UsersService.createUser();
        sleep(1000); // fo sure user is created
        const me = await UsersService.getMe();
        dispatch(UserSlice.setUser(me.data));
      } catch (error) {
        logger.error(error);
      }
    })();
  }, [dispatch, router]);

  return (
    <>
      <div className={"z-[10] flex w-full flex-col items-center gap-[5.582vw]"}>
        <OnboardingHeader header={headers[step]} step={step} />
        <AnimatePresence mode={"wait"}>
          <motion.div
            className="absolute top-[47%] flex h-auto max-h-full w-[80%] max-w-full translate-y-[-50%] justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={`image-${headers[step].id}`}
          >
            <Image
              src={headers[step].image}
              alt={""}
              layout="responsive"
              width={0}
              height={0}
              sizes="70vw"
              className={twMerge(
                "max-h-[398px] max-w-[398px]",
                step === 4 && "max-h-[346px] max-w-[346px]",
              )}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <OnBoardingFooter
        headers={headers}
        step={step}
        onNext={onNextStep}
        onPrev={onPrevStep}
        redirect={redirectToMain}
      />
    </>
  );
};
