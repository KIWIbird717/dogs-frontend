"use client";

import { useState } from "react";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { UsersService } from "@/shared/lib/services/users/users";
import useSWR, { useSWRConfig } from "swr";

export const useBonusFriend = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const logger = new Logger("useBonusFriend");

  const { data } = useSWR("GET /users/bonus/friend", UsersService.getBonusFriend);
  const { mutate } = useSWRConfig();

  const onClaimBonusFriend = async () => {
    try {
      await UsersService.setBonusFriend();
      mutate("GET /users/bonus/friend");
    } catch (error) {
      logger.error(error);
    }
  };

  const onToggleDisabled = (disabled: boolean) => setIsDisabled(disabled);

  return {
    bonus: data?.data,
    isDisabled,
    onClaimBonusFriend,
    onToggleDisabled,
  };
};
