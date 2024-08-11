import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import IUserSlice = UserSlice.IUserSlice;

type ExcludePassword = {
  guild: never;
  lastDailyReward: never;
};

export type GetMeUserType = IUserSlice & ExcludePassword;

export const useUser = () => {
  const dispatch = useAppDispatch();
  const [userSS, setUserSS] = useSessionStorage<GetMeUserType | null>("user", null);

  const [userSS, setUserSS] = useSessionStorage<GetMeUserType | null>("user", null);

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

  const onChangeUser = (user: GetMeUserType) => {
    dispatch(UserSlice.setUser(user));
  };

  return {
    age,
    breedKey,
    country,
    user,

    onChangeAge,
    onChangeBreed,
    onChangeCountry,
    onChangeUser,
  };
};
