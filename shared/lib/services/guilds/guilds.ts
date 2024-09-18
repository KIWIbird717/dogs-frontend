import { serverApi } from "../../axios";
import { GuildsApiTypes } from "./types";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import IUserSlice = UserSlice.IUserSlice;

export enum JoinMethod {
  OPEN = "open",
  BYLINK = "bylink",
}

export interface IGuildResponse {
  joinMethod: JoinMethod;
  members: number;
  name: string;
  _id: string;
  guildBalance: null | number;
  image: string;
}

export type GuildResponseWithMembersType = {
  joinMethod: JoinMethod;
  name: string;
  _id: string;
  guildBalacne: null | number;
  image: string;
  membersCount: number;
  members: {
    first_name: string;
    username: string;
    level: number;
    balance: number;
    role: string;
  }[];
};

export namespace GuildsService {
  /**
   * GET /guilds/image
   */
  export const getGuildsImage = (fileImageId: string) => {
    return serverApi.get<any>(`/guilds/image?filename=${fileImageId}`);
  };

  /**
   * GET /guilds/get-guilds
   */
  export const getGuilds = (start: number, pagination: number) => {
    return serverApi.post<IGuildResponse[]>(`/guilds/get-guilds`, {
      start,
      pagination,
    });
  };

  /**
   * GET /guilds/get-guilds
   */
  export const getGuild = (id: string) => {
    return serverApi.post<GuildResponseWithMembersType>(`/guilds/get`, {
      id,
    });
  };

  /**
   * POST /guilds/create
   */
  export const createGuild = (dto: FormData) => {
    return serverApi.post<GuildsApiTypes.CreateResponse>(`/guilds/create`, dto, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  /**
   * POST /guilds/delete
   */
  export const deleteGuild = (guildId: string) => {
    return serverApi.post<any>(`/guilds/delete`, { id: guildId });
  };

  /**
   * POST /guilds/join
   */
  export const joinGuild = (guildId: string) => {
    return serverApi.post<GuildsApiTypes.GuildJoinResponse>(`/guilds/join`, { id: guildId });
  };

  /**
   * POST /guilds/leave
   */
  export const leaveGuild = () => {
    return serverApi.post<any>(`/guilds/leave`);
  };

  /**
   * POST /guilds/search
   */
  export const searchGuild = (dto: GuildsApiTypes.SearchGuild) => {
    return serverApi.post<any>(`/guilds/search`, {
      name: dto.name,
      start: dto.start,
      pagination: dto.pagination,
    });
  };
}
