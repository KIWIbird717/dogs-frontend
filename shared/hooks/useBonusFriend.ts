import { useEffect, useState } from "react";
import { UserApiTypes } from "@/shared/lib/services/users/types";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { UsersService } from "@/shared/lib/services/users/users";

export const useBonusFriend = () => {
  const [bonus, setBonus] = useState<UserApiTypes.BonusFriendResponse | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const logger = new Logger("useBonusFriend");

  const getBonusFriend = async () => {
    try {
      const { data } = await UsersService.getBonusFriend();
      setBonus(data);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getBonusFriend();
    })();
  }, []);

  const onClaimBonusFriend = async () => {
    try {
      await UsersService.setBonusFriend();
      await getBonusFriend();
    } catch (error) {
      logger.error(error);
    }
  };

  const onToggleDisabled = (disabled: boolean) => setIsDisabled(disabled);

  return {
    bonus,
    isDisabled,

    getBonusFriend,
    onClaimBonusFriend,
    onToggleDisabled
  }
}