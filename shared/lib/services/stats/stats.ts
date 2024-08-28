import { serverApi } from "../../axios";
import { StatsApiTypes } from "@/shared/lib/services/stats/types";
import { StatsSlice } from "@/shared/lib/redux-store/slices/stats-slice/statsSlice";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";

export namespace StatsService {
  /**
   * GET /stats/level-leaders
   */
  export const getLevelLeaders = (level: number) => {
    return serverApi.get<any>(`/stats/level-leaders/${level}`);
  };

  /**
   * GET /stats/users-by-level
   */
  export const getStatsUsersByLevel = (dto: StatsApiTypes.UsersByLevelDto) => {
    return serverApi.get<UserSlice.IUserSlice[]>(
      `/stats/users-by-level?level=${dto.level}&start=${dto.start}&pagination=${dto.pagination}`,
    );
  };

  /**
   * GET /stats/all-users-stats
   */
  export const getAllUsersStats = () => {
    return serverApi.get<StatsSlice.IStatsSlice>(`/stats/all-users-stats`);
  };
}
