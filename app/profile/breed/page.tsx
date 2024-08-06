"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { HeaderWithIcon } from "@/widgets/HeaderWithIcon";
import DogIcon from "@/public/images/svg/breed/dog.svg";
import { useUser } from "@/shared/hooks/useUser";
import { Navbar } from "@/widgets/Navbar";
import { useEffect, useState } from "react";
import { BreedCountryBlock } from "@/widgets/BreedCountryBlock";

import Gradient1 from "@/public/images/svg/breed/gradient/gradient1.svg";
import Gradient2 from "@/public/images/svg/breed/gradient/gradient2.svg";
import { IBreedCountry } from "../country/page";
import { UsersService } from "@/shared/lib/services/users/users";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { StatsService } from "@/shared/lib/services/stats/stats";

interface IBreedPageProps {}

const breeds: IBreedCountry[] = [
  {
    name: "The mutt",
    iso2: "Husky",
    iso3: "Husky",
  },

  {
    name: "Husky",
    iso2: "Husky",
    iso3: "Husky",
  },
  {
    name: "Bulldog",
    iso2: "Bulldog",
    iso3: "Bulldog",
  },
  {
    name: "Doberman",
    iso2: "Doberman",
    iso3: "Doberman",
  },
  {
    name: "Fox Terrie",
    iso2: "Fox Terrie",
    iso3: "Fox Terrie",
  },
  {
    name: "Jeck Rassel",
    iso2: "Jeck Rassel",
    iso3: "Jeck Rassel",
  },
];

const BreedPage: NextPage<IBreedPageProps> = () => {
  const [searchValue, setSearchValue] = useState("");
  const { onChangeUser, onChangeBreed, breedKey } = useUser();
  const [breedLocal, setBreedLocal] = useState(breedKey);

  const logger = new Logger("BreedPage");

  const handleClick = (breed: string) => setBreedLocal(breed);
  const handleSearch = (value: string) => setSearchValue(value);
  const clearValue = () => setSearchValue("");

  useEffect(() => {
    (async () => {
      try {
        await UsersService.updateUser({
          breedKey: breedLocal,
        });

        const { data } = await UsersService.getMe();
        onChangeUser(data);
      } catch (error) {
        logger.error(error);
      }
    })();
  }, [breedLocal]);

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-4 overflow-hidden bg-gradient-background px-4 pt-6"
    >
      <HeaderWithIcon title={"Select Breed"} icon={<DogIcon />} />

      <BreedCountryBlock
        item={breedKey}
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
