"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { HeaderWithIcon } from "@/widgets/HeaderWithIcon";
import DogIcon from "@/public/images/svg/breed/dog.svg";
import { useUser } from "@/shared/hooks/useUser";
import { Navbar } from "@/widgets/Navbar";
import { ReactNode, useState } from "react";
import { BreedCountryBlock } from "@/widgets/BreedCountryBlock";

import Gradient1 from "@/public/images/svg/breed/gradient/gradient1.svg"
import Gradient2 from "@/public/images/svg/breed/gradient/gradient2.svg"

interface IBreedPageProps {
}

export interface IBreedCountry {
  id: string,
  value: string,
  icon?: ReactNode
}

const breeds: IBreedCountry[] = [
  {
    id: "husky",
    value: "Husky",
  }, {
    id: "bulldog",
    value: "Bulldog",
  }, {
    id: "doberman",
    value: "Doberman",
  }, {
    id: "fox_terrie",
    value: "Fox Terrie",
  }, {
    id: "jeck_rassel",
    value: "Jeck Rassel",
  },
];

const BreedPage: NextPage<IBreedPageProps> = () => {
  const [searchValue, setSearchValue] = useState("");
  const { onChangeBreed, breed } = useUser();

  const handleClick = (breed: string) => onChangeBreed(breed);
  const handleSearch = (value: string) => setSearchValue(value);
  const clearValue = () => setSearchValue("");

  return (
    <View fadeInOnLoad
          className="flex flex-col gap-4 w-full h-screen bg-gradient-background relative pt-6 px-4 overflow-hidden"
    >
      <HeaderWithIcon title={"Select Breed"}
                      icon={<DogIcon />}
      />

      <BreedCountryBlock item={breed}
                         onClick={handleClick}
                         items={breeds}
                         onChange={handleSearch}
                         value={searchValue}
                         setClearValue={clearValue}
      />

      <Navbar />

      <Gradient1 className={"absolute top-0 left-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-0 right-0 z-[1]"} />
    </View>
  );
};
export default BreedPage;