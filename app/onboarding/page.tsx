import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { OnboardingMedia } from "@/widgets/onboardingMedia";
import { Gradient } from "@/shared/ui/Gradient";

interface IOnboardingProps {}

const Onboarding: NextPage<IOnboardingProps> = () => {
  return (
    <>
      <View
        fadeInOnLoad
        className="relative flex h-svh w-full flex-col justify-between gap-[6.512vw] overflow-hidden bg-gradient-background px-4 pt-6"
      >
        <OnboardingMedia />
      </View>

      <Gradient.Second className="absolute top-[20%] scale-[250%]" />
      <Gradient.Second className="absolute top-[20%] scale-[250%]" />
    </>
  );
};
export default Onboarding;
