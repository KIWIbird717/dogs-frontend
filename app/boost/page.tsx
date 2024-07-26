"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { BoostBowl } from "@/widgets/BoostBowl";
import Gradient1 from "@/public/images/svg/boost/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/boost/gradient/gradient2.svg";
import { useClicker } from "@/shared/hooks/useClicker";
import RacketIcon from "@/public/images/svg/boost/racket.svg";
import EnergyIcon from "@/public/images/svg/energy.svg";
import { Block } from "@/widgets/Block";
import { HeaderWithIcon } from "@/widgets/HeaderWithIcon";

interface IBoostPageProps {
}

const BoostPage: NextPage<IBoostPageProps> = () => {
  const {
    boosts,
    maxBoost,
    onMaxBoost,
  } = useClicker(true);

  return (
    <View fadeInOnLoad
          className="flex flex-col gap-4 w-full h-screen bg-gradient-background relative pt-6 px-4 overflow-hidden"
    >
      <HeaderWithIcon title={"Boost"}
        icon={<RacketIcon />}
                      button={
                     <Block icon={<EnergyIcon />}
                            title={`${boosts}/${maxBoost}`}
                            onClick={() => {}}
                     />}
      />
      <BoostBowl onMaxBoost={onMaxBoost} />

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute right-0 bottom-0 z-[1]"} />
    </View>
  );
};
export default BoostPage;