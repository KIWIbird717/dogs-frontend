"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { HeaderWithIcon } from "@/widgets/HeaderWithIcon";
import { useUser } from "@/shared/hooks/useUser";
import { Navbar } from "@/widgets/Navbar";
import { useState } from "react";
import { BreedCountryBlock } from "@/widgets/BreedCountryBlock";
import World from "@/public/images/svg/country/world.svg";

import Gradient1 from "@/public/images/svg/breed/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/breed/gradient/gradient2.svg";
import useRequest from "@/shared/hooks/useRequest";
import axios from "axios";

interface ICountryPageProps {
}

export interface IBreedCountry {
  flag: string;
  iso2: string;
  iso3: string;
  name: string;
}


const CountryPage: NextPage<ICountryPageProps> = () => {
  const [countries, setCountries] = useState<IBreedCountry[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const { onChangeCountry, country } = useUser();

  useRequest(async () => {
    const { data } = await axios.get("https://countriesnow.space/api/v0.1/countries/flag/images");

    setCountries(data.data);
  }, []);

  const handleClick = (breed: string) => onChangeCountry(breed);
  const handleSearch = (value: string) => setSearchValue(value);
  const clearValue = () => setSearchValue("");

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden bg-gradient-background px-4 pt-6"
    >
      <HeaderWithIcon title={"Select Country"} icon={<World />} />

      <BreedCountryBlock
        item={country}
        onClick={handleClick}
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
