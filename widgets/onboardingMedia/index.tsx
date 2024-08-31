"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { OnboardingHeader } from "@/widgets/onboardingHeader";
import OnboardingImg1 from "@/public/images/onboarding/onboarding1.png";
import OnboardingImg2 from "@/public/images/onboarding/onboarding1.png";
import OnboardingImg3 from "@/public/images/onboarding/onboarding3.png";
import OnboardingImg4 from "@/public/images/onboarding/onboarding4.png";
import DuckImg from "@/public/images/duck.png";
import { OnBoardingFooter } from "@/widgets/onboardingFooter";
import { Typography } from "@/shared/ui/Typography/Typography";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";
import { UsersService } from "@/shared/lib/services/users/users";
import { useUser } from "@/shared/hooks/useUser";
import { Logger } from "@/shared/lib/utils/logger/Logger";

interface IOnboardingMediaProps {}

const headers: HeadersType[] = [
  {
    id: 0,
    title: (
      <Typography tag={"p"} className={"text-center text-white-800"}>
        Tap an earn coin
      </Typography>
    ),
    description: (
      <Typography tag={"h1"} className={"text-center text-white-900"}>
        <span className={"text-[28px] font-normal leading-8 text-blue-800"}>
          Increase your score
        </span>
        &nbsp; by collecting coins{" "}
        <span className={"text-[28px] font-normal leading-8 text-blue-800"}>with every tap</span>
      </Typography>
    ),
    image: OnboardingImg1,
  },
  {
    id: 1,
    title: (
      <Typography tag={"p"} className={"text-center text-white-800"}>
        Pump up the Bone
      </Typography>
    ),
    description: (
      <Typography tag={"h1"} className={"text-center text-white-900"}>
        <span className={"text-[28px] font-normal leading-8 text-blue-800"}>
          Get the best bone &nbsp;
        </span>
        and get 5 times &nbsp;
        <span className={"text-[28px] font-normal leading-8 text-blue-800"}>more coins</span>
      </Typography>
    ),
    image: OnboardingImg2,
  },
  {
    id: 2,
    title: (
      <Typography tag={"p"} className={"text-center text-white-800"}>
        Upgrade your exchange
      </Typography>
    ),
    description: (
      <Typography tag={"h1"} className={"text-center text-white-900"}>
        As you <span className={"text-[28px] font-normal leading-8 text-blue-800"}>level up</span>,
        you&apos;ll be able to{" "}
        <span className={"text-[28px] font-normal leading-8 text-blue-800"}>
          improve your coin accumulation
        </span>
      </Typography>
    ),
    image: OnboardingImg3,
  },
  {
    id: 3,
    title: (
      <Typography tag={"p"} className={"text-center text-white-800"}>
        Bring your friends and earn rewards together!
      </Typography>
    ),
    description: (
      <Typography tag={"h1"} className={"text-center text-white-900"}>
        Invite friends and build a team for &nbsp;
        <span className={"text-[28px] font-normal leading-8 text-blue-800"}>maximum bonuses!</span>
      </Typography>
    ),
    image: OnboardingImg4,
  },
  {
    id: 4,
    title: (
      <Typography tag={"p"} className={"text-center text-white-800"}>
        Help & Communication
      </Typography>
    ),
    description: (
      <Typography tag={"h1"} className={"text-center text-white-900"}>
        Subscribe to our community & socialize
      </Typography>
    ),
    image: DuckImg,
  },
];

export type HeadersType = {
  id: number;
  title: ReactNode;
  description: ReactNode;
  // image: ReactNode | StaticImageData;
  image: StaticImageData;
};

export const OnboardingMedia: FC<IOnboardingMediaProps> = () => {
  const { push } = useRouter();
  const logger = new Logger("OnboardingMedia");
  const [step, setStep] = useState(0);

  const { getMe } = useUser();

  const redirectToMain = () => push("/main");

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
    (async () => {
      try {
        await UsersService.createUser();
        await getMe();
      } catch (error) {
        logger.error(error);
      }
    })();
  }, []);

  return (
    <>
      <div className={"z-[10] flex w-full flex-col items-center gap-[5.582vw]"}>
        {/*gap-6*/}
        <OnboardingHeader header={headers[step]} step={step} />
        <AnimatePresence mode={"wait"}>
          <motion.div
            className="relative flex max-h-full max-w-full justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={`image-${headers[step].id}`}
          >
            {/*{headers[step].image}*/}
            {/*<Image*/}
            {/*  src={headers[step].image}*/}
            {/*  alt={""}*/}
            {/*  // className={twMerge("h-[398px] w-[398px]", step === 4 && "h-[346px] w-[346px]")}*/}
            {/*  className={twMerge("h-[92.58vw] w-[92.58vw]", step === 4 && "h-[80.466vw] w-[80.466vw]")}*/}
            {/*/>*/}

            <Image
              src={headers[step].image}
              alt={""}
              layout="responsive"
              width={100}
              height={100}
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
