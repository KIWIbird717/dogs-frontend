import { useEffect, useState } from "react";
import { UserApiTypes } from "@/shared/lib/services/users/types";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { UsersService } from "@/shared/lib/services/users/users";

export const useDailyReward = () => {
  const [daily, setDaily] = useState<UserApiTypes.DailyRewardResponse | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const logger = new Logger("RewardsBoard");

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

  const claimDailyReward = async () => {
    try {
      await UsersService.setBonusDaily();
      await getDailyReward();
    } catch (error) {
      logger.error(error);
    }
  };

  const onToggleDisabled = (disabled: boolean) => setIsDisabled(disabled);

  return {
    daily,
    isDisabled,

    getDailyReward,
    claimDailyReward,
    onToggleDisabled
  }
}