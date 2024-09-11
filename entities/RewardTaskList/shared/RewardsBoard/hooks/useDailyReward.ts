import { useState } from "react";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { UsersService } from "@/shared/lib/services/users/users";
import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";

export const useDailyReward = () => {
  const logger = new Logger("useDailyReward");
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useAppDispatch();

  const { data } = useSWR("/users/bonus/daily", UsersService.getBonusDaily);
  const { mutate } = useSWRConfig();

  const onClaimDailyReward = async () => {
    try {
      const response = await UsersService.setBonusDaily();
      dispatch(UserSlice.updateUser({ balance: response.data.balance }));
      dispatch(UserSlice.revalidateLevel());

      mutate("/users/bonus/daily");

      toast.success("Claimed bonus");
    } catch (error) {
      logger.error(error);
    }
  };

  const onToggleDisabled = (disabled: boolean) => setIsDisabled(disabled);

  return {
    daily: data?.data,
    isDisabled,
    onClaimDailyReward,
    onToggleDisabled,
  };
};
