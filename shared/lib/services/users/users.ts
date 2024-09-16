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
   * @deprecated
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

  /**
   * POST /users/boost
   */
  export const boost = (boostName: UserApiTypes.BoostName) => {
    return serverApi.post<UserApiTypes.BoostResponse>("/users/boost", {
      boostName,
    });
  };

  /**
   * GET /users/my-friends
   */
  export const getMyFriends = () => {
    return serverApi.get<UserApiTypes.MyFriendsResponse[]>("/users/my-friends");
  };

  /**
   * GET /users/bonus/daily
   */
  export const getBonusDaily = () => {
    return serverApi.get<UserApiTypes.DailyRewardResponse>("/users/bonus/daily");
  };
  /**
   * POST /users/bonus/daily
   */
  export const setBonusDaily = () => {
    return serverApi.post<UserApiTypes.GetBonusDailyResponse>("/users/bonus/daily");
  };

  /**
   * GET /users/bonus/friend
   */
  export const getBonusFriend = () => {
    return serverApi.get<UserApiTypes.BonusFriendResponse>("/users/bonus/friend");
  };
  /**
   * POST /users/bonus/friend
   */
  export const setBonusFriend = () => {
    return serverApi.post("/users/bonus/friend");
  };

  export const iAmFromInviteLink = (dto: UserApiTypes.IAmFromInviteLinkDto) => {
    return serverApi.post<UserApiTypes.IAmFromInviteLinkResponse>(
      "/users/i-am-from-invite-link",
      dto,
    );
  };
}
