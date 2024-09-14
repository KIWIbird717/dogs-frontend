"use client";

import { useOnlineUsersStats } from "@/shared/hooks/useOnlineUsersStats";

export const OnlineUsersHandler = () => {
  useOnlineUsersStats();
  return null;
};
