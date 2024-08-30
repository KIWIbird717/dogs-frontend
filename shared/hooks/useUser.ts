import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { useSessionStorage } from "@uidotdev/usehooks";
import { UsersService } from "@/shared/lib/services/users/users";
import IUserSlice = UserSlice.IUserSlice;

export const useUser = () => {
  const dispatch = useAppDispatch();
  const [userSS, setUserSS] = useSessionStorage<IUserSlice | null>("user", null);

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

  const onChangeUser = (user: IUserSlice) => {
    dispatch(UserSlice.setUser(user));
  };

  const onChangeGuildName = (guildName: string | null) => {
    dispatch(UserSlice.setGuildName(guildName));
  };

  const getMe = async () => {
    const { data } = await UsersService.getMe();
    onChangeUser(data);
    setUserSS(data);

    return data;
  };

  return {
    age,
    breedKey,
    country,
    user,

    onChangeAge,
    onChangeBreed,
    onChangeCountry,
    onChangeGuildName,
    onChangeUser,
    getMe,
  };
};
