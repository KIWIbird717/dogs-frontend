"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { HeaderWithIcon } from "@/shared/ui/HeaderWithIcon";
import DogIcon from "@/public/images/svg/breed/dog.svg";
import { Navbar } from "@/widgets/Navbar";
import { useState } from "react";
import { BreedCountryBlock } from "@/widgets/BreedCountryBlock";
import { IBreedCountry } from "../country/page";
import { UsersService } from "@/shared/lib/services/users/users";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { Gradient } from "@/shared/ui/Gradient";
import { useTgBackButton } from "@/shared/hooks/useTgBackButton";

interface IBreedPageProps {}

const breeds: IBreedCountry[] = [
  {
    name: "The mutt",
    iso2: "The mutt",
    iso3: "The mutt",
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
  useTgBackButton("/profile");

  const [searchValue, setSearchValue] = useState("");
  const breedKey = useAppSelector((store) => store.user.breedKey);
  const [breedLocal, setBreedLocal] = useState(breedKey);
  const dispatch = useAppDispatch();

  const logger = new Logger("BreedPage");

  const handleChangeBreed = async (breed: string) => {
    setBreedLocal(breed);

    try {
      await UsersService.updateUser({
        breedKey: breed,
      });

      dispatch(UserSlice.updateUser({ breedKey: breed }));
    } catch (error) {
      logger.error(error);
    }
  };
  const handleSearch = (value: string) => setSearchValue(value);
  const clearValue = () => setSearchValue("");

  return (
    <>
      <View
        fadeInOnLoad
        className="relative z-[2] flex h-svh w-full flex-col gap-4 overflow-x-hidden px-4 pt-6"
      >
        <HeaderWithIcon title={"Select Breed"} icon={<DogIcon />} />

        <BreedCountryBlock
          item={breedLocal}
          onClick={handleChangeBreed}
          items={breeds}
          onChange={handleSearch}
          value={searchValue}
          setClearValue={clearValue}
          pageName={"breed"}
        />

        <Navbar />
      </View>

      <Gradient.First className={"scale-130 absolute left-[-60%] top-[-20%]"} />
      <Gradient.Second className={"absolute -bottom-[27%] right-[-50%] z-[1] scale-150"} />
    </>
  );
};
export default BreedPage;
