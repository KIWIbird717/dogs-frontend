"use client";

import { FC, ReactNode, useState } from "react";
import { OnboardingHeader } from "@/widgets/onboardingHeader";
import DuckSvg from "@/public/images/svg/duck.svg";
import OnBoardingImg from "@/public/images/onboarding.png";
import DuckImg from "@/public/images/duck.png";
import { OnboardingSteps } from "@/widgets/onboardingMedia/entities/Steps";
import { OnBoardingFooter } from "@/widgets/onboardingFooter";
import { Typography } from "@/shared/ui/Typography/Typography";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";

interface IOnboardingMediaProps {
}

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
        <span className={"text-[28px] font-normal leading-8 text-blue-800"}>Increase your score</span>&nbsp;
        by collecting coins <span className={"text-[28px] font-normal leading-8 text-blue-800"}>with every tap</span>
      </Typography>
    ),
    image: OnBoardingImg,
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
        <span className={"text-[28px] font-normal leading-8 text-blue-800"}>
         more coins
        </span>
      </Typography>
    ),
    image: OnBoardingImg,
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
        you&apos;ll be able to <span className={"text-[28px] font-normal leading-8 text-blue-800"}>
         improve your coin accumulation
        </span>
      </Typography>
    ),
    image: DuckImg,
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
        <span className={"text-[28px] font-normal leading-8 text-blue-800"}>
         maximum bonuses!
        </span>
      </Typography>
    ),
    image: DuckImg,
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
  const [step, setStep] = useState(0);

  const onNextStep = () => {
    if (step > 4) return;
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
  const redirectToMain = () => push("/main");

  return (
    <>
      <div className={"z-[10] flex w-full flex-col items-center gap-6"}>
        <OnboardingHeader header={headers[step]} step={step} />
        <AnimatePresence mode={"wait"}>
          <motion.div
            className={"relative"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={step}
          >
            {/*{headers[step].image}*/}
            <Image src={headers[step].image}
                   alt={""}
                   className={twMerge("w-[398px] h-[398px]", step === 4 && "w-[346px] h-[346px]")}
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
