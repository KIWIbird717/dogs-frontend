"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { HeaderWithIcon } from "@/widgets/HeaderWithIcon";
import { Navbar } from "@/widgets/Navbar";
import { BreedCountryBlock } from "@/widgets/BreedCountryBlock";
import World from "@/public/images/svg/country/world.svg";

import Gradient1 from "@/public/images/svg/breed/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/breed/gradient/gradient2.svg";
import { useCountries } from "@/shared/hooks/useCountries";

interface ICountryPageProps {}

export interface IBreedCountry {
  flag?: string;
  iso2: string;
  iso3: string;
  name: string;
}

const CountryPage: NextPage<ICountryPageProps> = () => {
  const {
    currentCountryName,
    countries,
    handleChangeCountry,
    handleSearch,
    searchValue,
    clearValue,
  } = useCountries();

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden bg-gradient-background px-4 pt-6"
    >
      <HeaderWithIcon title={"Select Country"} icon={<World />} />

      <BreedCountryBlock
        item={currentCountryName || "-"}
        onClick={handleChangeCountry}
        items={countries}
        onChange={handleSearch}
        value={searchValue}
        setClearValue={clearValue}
        pageName={"country"}
      />

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-0 right-0 z-[1]"} />
    </View>
  );
};
export default CountryPage;
