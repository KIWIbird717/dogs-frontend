"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { HeaderWithIcon } from "@/widgets/HeaderWithIcon";
import DogIcon from "@/public/images/svg/breed/dog.svg";
import { useUser } from "@/shared/hooks/useUser";
import { Navbar } from "@/widgets/Navbar";
import { useState } from "react";
import { BreedCountryBlock } from "@/widgets/BreedCountryBlock";

import Gradient1 from "@/public/images/svg/breed/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/breed/gradient/gradient2.svg";
import { IBreedCountry } from "../country/page";

interface IBreedPageProps {}

const breeds: IBreedCountry[] = [
  {
    name: "Husky",
    iso2: "Husky",
    iso3: "Husky",
    flag: "Husky",
  },
  {
    name: "Bulldog",
    iso2: "Bulldog",
    iso3: "Bulldog",
    flag: "Bulldog",
  },
  {
    name: "Doberman",
    iso2: "Doberman",
    iso3: "Doberman",
    flag: "Doberman",
  },
  {
    name: "Fox Terrie",
    iso2: "Fox Terrie",
    iso3: "Fox Terrie",
    flag: "Fox Terrie",
  },
  {
    name: "Jeck Rassel",
    iso2: "Jeck Rassel",
    iso3: "Jeck Rassel",
    flag: "Jeck Rassel",
  },
];

const BreedPage: NextPage<IBreedPageProps> = () => {
  const [searchValue, setSearchValue] = useState("");
  const { onChangeBreed, breed } = useUser();

  const handleClick = (breed: string) => onChangeBreed(breed);
  const handleSearch = (value: string) => setSearchValue(value);
  const clearValue = () => setSearchValue("");

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden bg-gradient-background px-4 pt-6"
    >
      <HeaderWithIcon title={"Select Breed"} icon={<DogIcon />} />

      <BreedCountryBlock
        item={breed}
        onClick={handleClick}
        items={breeds}
        onChange={handleSearch}
        value={searchValue}
        setClearValue={clearValue}
        pageName={"breed"}
      />

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-0 right-0 z-[1]"} />
    </View>
  );
};
export default BreedPage;
