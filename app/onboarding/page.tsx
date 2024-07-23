import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import GradientDuck from "@/public/images/svg/onboarding/gradient.svg";
import { OnboardingMedia } from "@/widgets/onboardingMedia";

interface IOnboardingProps {
}

const Onboarding: NextPage<IOnboardingProps> = () => {
  return (
    <View fadeInOnLoad
          className="flex flex-col gap-7 justify-between w-full h-screen relative bg-gradient-background px-4 pt-6"
    >
      <OnboardingMedia />
      <GradientDuck className={"absolute top-0 left-0 z-[0]"} />
    </View>
  );
};
export default Onboarding;