"use client";

import { FC, ReactNode, useState } from "react";
import { OnboardingHeader } from "@/widgets/onboardingHeader";
import DuckSvg from "@/public/images/svg/duck.svg";
import { OnboardingSteps } from "@/widgets/onboardingMedia/entities/Steps";
import { OnBoardingFooter } from "@/widgets/onboardingFooter";
import { Typography } from "@/shared/ui/Typography/Typography";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";


interface IOnboardingMediaProps {
}

const headers: HeadersType[] = [
  {
    id: 0,
    title: <Typography tag={"p"}
                       className={"text-center text-white-800"}
    >
      How to make coin?
    </Typography>,
    description: <Typography tag={"h1"}
                             className={"text-white-900 text-center"}
    >
      Bite the bone <span className={"text-[28px] leading-8 font-normal text-blue-800"}>every day</span> and don&apos;t
      think
      about your teeth.
    </Typography>,
    image: <DuckSvg />
  },
  {
    id: 1,
    title: <Typography tag={"p"}
                       className={"text-center text-white-800"}
    >
      Easy
    </Typography>,
    description: <Typography tag={"h1"}
                             className={"text-white-900 text-center"}
    >
      Tap our bone and take you new coin. <span className={"text-[28px] leading-8 font-normal text-blue-800"}>Do it with us we can do you rich</span>
    </Typography>,
    image: <DuckSvg />
  },
  {
    id: 2,
    title: <Typography tag={"p"}
                       className={"text-center text-white-800"}
    >
      Easy
    </Typography>,
    description: <Typography tag={"h1"}
                             className={"text-white-900 text-center"}
    >
      Tap our bone and take you new coin. <span className={"text-[28px] leading-8 font-normal text-blue-800"}>Do it with us we can do you rich</span>
    </Typography>,
    image: <DuckSvg />
  },
  {
    id: 3,
    title: <Typography tag={"p"}
                       className={"text-center text-white-800"}
    >
      Easy
    </Typography>,
    description: <Typography tag={"h1"}
                             className={"text-white-900 text-center"}
    >
      Tap our bone and take you new coin. <span className={"text-[28px] leading-8 font-normal text-blue-800"}>Do it with us we can do you rich</span>
    </Typography>,
    image: <DuckSvg />
  },
  {
    id: 4,
    title: <Typography tag={"p"}
                       className={"text-center text-white-800"}
    >
      Easy
    </Typography>,
    description: <Typography tag={"h1"}
                             className={"text-white-900 text-center"}
    >
      Tap our bone and take you new coin. <span className={"text-[28px] leading-8 font-normal text-blue-800"}>Do it with us we can do you rich</span>
    </Typography>,
    image: <DuckSvg />
  },
];

export type HeadersType = {
  id: number
  title: ReactNode
  description: ReactNode
  image: ReactNode
}

export const OnboardingMedia: FC<IOnboardingMediaProps> = () => {
  const {push} = useRouter()
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
  const redirectToMain = () => push("/main")

  return (
    <>
      <div className={"w-full flex flex-col gap-6 z-[1]"}>
        <OnboardingHeader header={headers[step]} step={step} />
        <AnimatePresence mode={"wait"}>
          <motion.div
            className={"relative"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={step}
          >
            {headers[step].image}
          </motion.div>
        </AnimatePresence>
        <OnboardingSteps step={step} headers={headers}
        />
      </div>
      <OnBoardingFooter step={step}
                        onNext={onNextStep}
                        onPrev={onPrevStep}
                        redirect={redirectToMain}
      />
    </>
  );
};