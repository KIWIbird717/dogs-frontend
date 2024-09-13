"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { HeaderWithIcon } from "@/shared/ui/HeaderWithIcon";
import { Navbar } from "@/widgets/Navbar";
import { BreedCountryBlock } from "@/widgets/BreedCountryBlock";
import World from "@/public/images/svg/country/world.svg";
import { useCountries } from "@/shared/hooks/useCountries";
import { Gradient } from "@/shared/ui/Gradient";
import { useTgBackButton } from "@/shared/hooks/useTgBackButton";

interface ICountryPageProps {}

export interface IBreedCountry {
  flag?: string;
  iso2: string;
  iso3: string;
  name: string;
}

const CountryPage: NextPage<ICountryPageProps> = () => {
  useTgBackButton("/profile");
  const {
    currentCountryName,
    countries,
    handleChangeCountry,
    handleSearch,
    searchValue,
    clearValue,
  } = useCountries();

  return (
    <>
      <View fadeInOnLoad className="relative flex h-svh w-full flex-col gap-4 px-4 pt-6">
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
      </View>

      <Gradient.First className={"scale-130 absolute left-[-60%] top-[-20%]"} />
      <Gradient.Second className={"absolute -bottom-[27%] right-[-50%] z-[1] scale-150"} />
    </>
  );
};
export default CountryPage;
