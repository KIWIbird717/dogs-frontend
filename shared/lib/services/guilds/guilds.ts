import { serverApi } from "../../axios";
import { GuildsApiTypes } from "./types";

export namespace GuildsService {
  /**
   * GET /guilds/image
   */
  export const getGuildsImage = (fileImageId: string) => {
    return serverApi.get<any>(`/guilds/image?filename=${fileImageId}`);
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
    return serverApi.post<any>(`/guilds/delete`, {id: guildId});
  };

  /**
   * POST /guilds/join
   */
  export const joinGuild = (guildId: string) => {
    return serverApi.post<any>(`/guilds/join`, {id: guildId});
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
    return serverApi.post<any>(`/guilds/leave`);
  };
}
