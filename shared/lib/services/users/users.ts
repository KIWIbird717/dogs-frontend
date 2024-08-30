import { serverApi } from "../../axios";
import { UserApiTypes } from "./types";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import IUserSlice = UserSlice.IUserSlice;

export namespace UsersService {

  /**
   * GET /users/get-user
   */
  export const getUser = (userId: string) => {
    return serverApi.get<any>(`/users/get-getUser/${userId}`);
  };
  /**
   * GET /users/get-me
   */
  export const getMe = () => {
    return serverApi.get<IUserSlice>("/users/get-me");
  };

  /**
   * POST /users/create
   */
  export const createUser = () => {
    return serverApi.post("/users/create");
  };

  /**
   * POST /users/update-user
   */
  export const updateUser = (dto: UserApiTypes.UpdateUserDto) => {
    return serverApi.post("/users/update-user", dto);
  };

  /**
   * POST /users/add-friend
   */
  export const addFriend = (userId: string) => {
    return serverApi.post("/users/add-friend", {
      userId: userId,
    });
  };

  /**
   * POST /users/earn
   */
  export const addUseMoney = (dto: UserApiTypes.EarnDto) => {
    return serverApi.post<UserApiTypes.ResponseEarnDto>("/users/tap", dto);
  };
}
