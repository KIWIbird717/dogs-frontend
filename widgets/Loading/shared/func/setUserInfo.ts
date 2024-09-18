import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { UsersService } from "@/shared/lib/services/users/users";

export const setUserInfo = async (dispatch: ReturnType<typeof useAppDispatch>) => {
  const { data } = await UsersService.getMe();
  dispatch(UserSlice.updateUser(data));
};
