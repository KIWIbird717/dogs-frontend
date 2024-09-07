import { useEffect, useState } from "react";
import { UserApiTypes } from "@/shared/lib/services/users/types";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { UsersService } from "@/shared/lib/services/users/users";
import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import toast from "react-hot-toast";

export const useDailyReward = () => {
  const [daily, setDaily] = useState<UserApiTypes.DailyRewardResponse | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const logger = new Logger("useDailyReward");
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await getDailyReward();
    })();
  }, []);

  const getDailyReward = async () => {
    try {
      const { data } = await UsersService.getBonusDaily();
      setDaily(data);
    } catch (error) {
      logger.error(error);
    }
  };

  const onClaimDailyReward = async () => {
    try {
      const response = await UsersService.setBonusDaily();
      await getDailyReward();
      dispatch(UserSlice.updateUser({ balance: response.data.balance }));
      toast.success("Claimed bonus");
    } catch (error) {
      logger.error(error);
    }
  };

  const onToggleDisabled = (disabled: boolean) => setIsDisabled(disabled);

  return {
    daily,
    isDisabled,
    getDailyReward,
    onClaimDailyReward,
    onToggleDisabled,
  };
};
