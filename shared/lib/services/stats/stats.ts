import { serverApi } from "../../axios";
import { StatsApiTypes } from "@/shared/lib/services/stats/types";
import { StatsSlice } from "@/shared/lib/redux-store/slices/stats-slice/statsSlice";

export namespace StatsService {
  /**
   * GET /stats/level-leaders
   */
  export const getLevelLeaders = (level: number) => {
    return serverApi.get<any>(`/stats/level-leaders/${level}`);
  };

  /**
   * GET /stats/league-leaders
   */
  export const getLeagueLeaders = (dto: StatsApiTypes.UsersByLevelDto) => {
    return serverApi.get<StatsApiTypes.LeagueLeadersResponse>(`/stats/league-leaders`, {
      params: dto,
    });
  };

  /**
   * GET /stats/all-users-stats
   */
  export const getAllUsersStats = () => {
    return serverApi.get<StatsSlice.Type>(`/stats/all-users-stats`);
  };
}
