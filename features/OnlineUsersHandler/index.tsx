"use client";

import { useWsConnection } from "@/shared/hooks/useWsConnection";

export const OnlineUsersHandler = () => {
  useWsConnection();
  return null;
};
