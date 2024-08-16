import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { StatsSlice } from "@/shared/lib/redux-store/slices/stats-slice/statsSlice";
import IStatsSlice = StatsSlice.IStatsSlice;

export const useStats = () => {
  const dispatch = useAppDispatch();
  const { dailyUsers, online, totalUsers, totalTouches } = useAppSelector((state) => state.stats);

  const onChangeStats = (stats: IStatsSlice) => {
    dispatch(StatsSlice.setAllUserStats({
      dailyUsers: stats.dailyUsers,
      online: stats.online,
      totalUsers: stats.totalUsers,
      totalTouches: stats.totalTouches
    }));
  };

  return {
    dailyUsers,
    online,
    totalUsers,
    totalTouches,
    onChangeStats,
  };
};
