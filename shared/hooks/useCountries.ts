import useRequest from "@/shared/hooks/useRequest";
import axios from "axios";
import { useEffect, useState } from "react";
import { IBreedCountry } from "@/app/profile/country/page";
import { useUser } from "@/shared/hooks/useUser";
import { UsersService } from "@/shared/lib/services/users/users";
import { Logger } from "@/shared/lib/utils/logger/Logger";

export const useCountries = () => {
  const logger = new Logger("useCountries");

  const [countries, setCountries] = useState<IBreedCountry[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const { onChangeUser, country } = useUser();
  const [currentCountryISO2, setCurrentCountryISO2] = useState(country);
  const [currentCountryName, setCurrentCountryName] = useState<string | null>(null);

  useRequest(async () => {
    const { data } = await axios.get("https://countriesnow.space/api/v0.1/countries/flag/images");

    setCountries(data.data);
  }, []);

  useEffect(() => {
    const newCountry = countries.find((obj) => obj.iso2 === currentCountryISO2);
    if (newCountry) {
      setCurrentCountryName(newCountry.name);
    }
  }, [countries, currentCountryISO2]);

  const handleChangeCountry = async (countryISO2: string) => {
    setCurrentCountryISO2(countryISO2);

    try {
      await UsersService.updateUser({
        country: countryISO2,
      });

      const { data } = await UsersService.getMe();
      onChangeUser(data);
    } catch (error) {
      logger.error(error);
    }

  };
  const handleSearch = (value: string) => setSearchValue(value);
  const clearValue = () => setSearchValue("");

  return {
    currentCountryName,
    countries,
    searchValue,
    clearValue,

    handleChangeCountry,
    handleSearch
  }
}