import { serverApi } from "../../axios";
import { GuildsApiTypes } from "./types";

export enum JoinMethod {
  OPEN = "open",
  BYLINK = "bylink"
}

export interface IGuildResponse {
  joinMethod: JoinMethod,
  members: number,
  name: string,
  _id: string,
  guildBalance: null | number
  image: string
}

type ExcludeMembers = {
  members: never
};

export type GetGuildType = IGuildResponse & ExcludeMembers;

export type GuildMembersType =  {
  balance: number
  first_name: string
  level: number
  role: string
  username: string
}

export type GuildResponseWithMembersType = {
  membersCount: number
  members: GuildMembersType[];
} & GetGuildType

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
  export const createGuild = (dto: GuildsApiTypes.GuildDto) => {
    return serverApi.post<any>(`/guilds/create`, dto);
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
    return serverApi.post<any>(`/guilds/join`, { id: guildId });
  };

  /**
   * POST /guilds/join
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
