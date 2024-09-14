import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { StatsSlice } from "@/shared/lib/redux-store/slices/stats-slice/statsSlice";
import IStatsSlice = StatsSlice.Type;

export const useStats = () => {
  const dispatch = useAppDispatch();

  const dailyUsers = useAppSelector((store) => store.stats.dailyUsers);
  const online = useAppSelector((store) => store.stats.online);
  const totalUsers = useAppSelector((store) => store.stats.totalUsers);
  const totalTouches = useAppSelector((store) => store.stats.totalTouches);

  const onChangeStats = (stats: IStatsSlice) => {
    dispatch(
      StatsSlice.setAllUserStats({
        dailyUsers: stats.dailyUsers,
        online: stats.online,
        totalUsers: stats.totalUsers,
        totalTouches: stats.totalTouches,
      }),
    );
  };

  return {
    dailyUsers,
    online,
    totalUsers,
    totalTouches,
    onChangeStats,
  };
};
