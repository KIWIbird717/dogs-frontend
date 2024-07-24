import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import Gradient1 from "@/public/images/svg/onboarding/gradient.svg";
import Gradient2 from "@/public/images/svg/onboarding/gradient2.svg";
import { OnboardingMedia } from "@/widgets/onboardingMedia";

interface IOnboardingProps {
}

const Onboarding: NextPage<IOnboardingProps> = () => {
  return (
    <View fadeInOnLoad
          className="flex flex-col gap-7 justify-between w-full h-screen relative bg-gradient-background px-4 pt-6"
    >
      <OnboardingMedia />
      <Gradient1 className={"absolute top-0 left-0 z-[1]"} />
      <Gradient2 className={"absolute top-0 left-0 z-[1]"} />
    </View>
  );
};
export default Onboarding;