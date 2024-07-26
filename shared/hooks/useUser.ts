import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import IUserSlice = UserSlice.IUserSlice;

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { age } = user as IUserSlice;


  const onChangeAge = (age: string | number) => {
    console.log("CHangeAge", age);
    dispatch(UserSlice.setAge(Number(age)));
  };

  return {
    age,
    onChangeAge,
  };
};