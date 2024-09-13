import { Typography } from "@/shared/ui/Typography/Typography";
import OnboardingImg1 from "@/public/images/onboarding/onboarding1.png";
import OnboardingImg2 from "@/public/images/onboarding/onboarding2.png";
import OnboardingImg3 from "@/public/images/onboarding/onboarding3.png";
import OnboardingImg4 from "@/public/images/onboarding/onboarding4.png";
import OnboardingImg5 from "@/public/images/onboarding/onboarding5.png";
import { HeadersType } from "../types/headers-type";

export const headers: HeadersType[] = [
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
    image: OnboardingImg5,
  },
];
