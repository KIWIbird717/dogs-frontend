"use client";

import useRequest from "@/shared/hooks/useRequest";
import axios from "axios";
import { useEffect, useState } from "react";
import { IBreedCountry } from "@/app/profile/country/page";
import { UsersService } from "@/shared/lib/services/users/users";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { useAppDispatch, useAppSelector } from "../lib/redux-store/hooks";
import { UserSlice } from "../lib/redux-store/slices/user-slice/userSlice";
import useSWR, { preload } from "swr";

const getCountries = async () => {
  return await axios.get<{ data: IBreedCountry[] }>(
    "https://countriesnow.space/api/v0.1/countries/flag/images",
  );
};

preload("/countries/flag/images", getCountries);

export const useCountries = () => {
  const logger = new Logger("useCountries");

  const country = useAppSelector((store) => store.user.country);
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentCountryISO2, setCurrentCountryISO2] = useState(country);
  const [currentCountryName, setCurrentCountryName] = useState<string | null>(null);

  const { data } = useSWR("/countries/flag/images", getCountries);

  useEffect(() => {
    const newCountry = (data?.data.data || []).find((obj) => obj.iso2 === currentCountryISO2);
    if (newCountry) {
      setCurrentCountryName(newCountry.name);
    }
  }, [currentCountryISO2, data?.data.data]);

  const handleChangeCountry = async (countryISO2: string) => {
    setCurrentCountryISO2(countryISO2);

    try {
      await UsersService.updateUser({
        country: countryISO2,
      });

      dispatch(UserSlice.updateUser({ country: countryISO2 }));
    } catch (error) {
      logger.error(error);
    }
  };
  const handleSearch = (value: string) => setSearchValue(value);
  const clearValue = () => setSearchValue("");

  return {
    currentCountryName,
    countries: data?.data.data || [],
    searchValue,
    clearValue,

    handleChangeCountry,
    handleSearch,
  };
};
