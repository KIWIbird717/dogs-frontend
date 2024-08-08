import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import IUserSlice = UserSlice.IUserSlice;

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { age, breedKey, country } = user as IUserSlice;

  const onChangeAge = (age: string | number) => {
    dispatch(UserSlice.setAge(Number(age)));
  };

  const onChangeBreed = (breed: string) => {
    dispatch(UserSlice.setBreed(breed));
  };

  const onChangeCountry = (country: string) => {
    dispatch(UserSlice.setCountry(country));
  };

  return {
    age,
    breedKey,
    country,

    onChangeAge,
    onChangeBreed,
    onChangeCountry,
  };
};
