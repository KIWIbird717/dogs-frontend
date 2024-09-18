import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import { store } from "@/shared/lib/redux-store/store";
import { UserApiTypes } from "@/shared/lib/services/users/types";
import { UsersService } from "@/shared/lib/services/users/users";
import { getTimeLeftUntil } from "@/shared/lib/utils/getTimeLeft";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import toast from "react-hot-toast";

export namespace BoostsService {
  const logger = new Logger();

  type ReduxDispatchType = ReturnType<typeof useAppDispatch>;
  type CallbackType = () => void | Promise<void>;

  const ssrPreventionCheck = () => {
    const isServer = typeof window === "undefined";
    if (isServer) {
      logger.error("namespace [BoostsService]. ssr in client only function");
      throw new Error(
        "namespace [BoostsService] func [ssrPreventionCheck]. ssr in client only function",
      );
    }
  };

  export const useTurbo = async (dispatch: ReduxDispatchType, callback: CallbackType) => {
    ssrPreventionCheck();
    const user = store.getState().user;

    const turboLeft = user.boosts.turbo.turboLeft;
    if (!turboLeft) return;

    const response = await UsersService.boost(UserApiTypes.BoostName.TURBO);
    toast.success(
      `Turbo active for ${getTimeLeftUntil(new Date(response.data.boosts.turbo.activeFor))}`,
    );

    dispatch(UserSlice.updateBoosts({ key: "turbo", updates: response.data.boosts.turbo }));
    dispatch(UserSlice.setBalance(response.data.balance));
    dispatch(UserSlice.revalidateLevel());

    callback();
  };

  export const useFullTank = async (dispatch: ReduxDispatchType, callback: CallbackType) => {
    ssrPreventionCheck();
    const userBoosts = store.getState().user.boosts;
    const currentEnergy = store.getState().clicker.currentEnergy;

    if (currentEnergy >= userBoosts.energyLimit.energyLimit) {
      logger.warn(
        "namespace [BoostsService] func [useFullTank]. Can not use full tank, user energy already full",
      );
      return;
    }

    const response = await UsersService.boost(UserApiTypes.BoostName.FULL_TANK);
    toast.success("Energy restored");

    dispatch(UserSlice.updateBoosts({ key: "fullTank", updates: response.data.boosts.fullTank }));
    dispatch(UserSlice.setBalance(response.data.balance));
    dispatch(UserSlice.revalidateLevel());

    callback();
  };

  export const useMultitap = async (dispatch: ReduxDispatchType, callback: CallbackType) => {
    ssrPreventionCheck();

    const { data } = await UsersService.boost(UserApiTypes.BoostName.MULTITAP);
    toast.success(`Multitap activate`);

    dispatch(UserSlice.updateBoosts({ key: "multitap", updates: data.boosts.multitap }));
    dispatch(UserSlice.setBalance(data.balance));
    dispatch(UserSlice.revalidateLevel());

    callback();
  };

  export const useEnergyLimit = async (dispatch: ReduxDispatchType, callback: CallbackType) => {
    ssrPreventionCheck();

    const { data } = await UsersService.boost(UserApiTypes.BoostName.ENERY_LIMIT);
    toast.success(`Energy limit updated to ${data.boosts.energyLimit.energyLimit}`);

    dispatch(UserSlice.updateBoosts({ key: "energyLimit", updates: data.boosts.energyLimit }));
    dispatch(UserSlice.setBalance(data.balance));
    dispatch(UserSlice.revalidateLevel());

    callback();
  };

  export const useRechargingSpeed = async (dispatch: ReduxDispatchType, callback: CallbackType) => {
    ssrPreventionCheck();

    const { data } = await UsersService.boost(UserApiTypes.BoostName.RECHARGE_SPEED);
    toast.success(`Recharge speed level: ${data.boosts.rechargingSpeed.level}`);

    dispatch(
      UserSlice.updateBoosts({ key: "rechargingSpeed", updates: data.boosts.rechargingSpeed }),
    );
    dispatch(UserSlice.setBalance(data.balance));
    dispatch(UserSlice.revalidateLevel());

    callback();
  };

  export const useTapBot = async (dispatch: ReduxDispatchType, callback: CallbackType) => {
    ssrPreventionCheck();

    const { data } = await UsersService.boost(UserApiTypes.BoostName.TAP_BOT);
    toast.success(`Tapbot active for ${getTimeLeftUntil(data.boosts.tapBot.activeFor)}`);

    dispatch(UserSlice.updateBoosts({ key: "tapBot", updates: data.boosts.tapBot }));
    dispatch(UserSlice.setBalance(data.balance));
    dispatch(UserSlice.revalidateLevel());

    callback();
  };
}
