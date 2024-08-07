import { serverApi } from "../axios";
import { ApiTypes } from "./types";

export namespace UsersService {
  /**
   * GET /users/get-me
   */
  export const getMe = () => {
    return serverApi.get<any>("/users/get-me");
  };

  /**
   * POST /users/create
   */
  export const createUser = (dto: any) => {};

  /**
   * POST /users/update-user
   */
  export const updateUser = (dto: ApiTypes.UpdateUserDto) => {
    return serverApi.post("/users/update-user", dto);
  };
}
