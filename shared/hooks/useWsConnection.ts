"use client";

import { useEffect } from "react";
import io from "socket.io-client";
import { useAppDispatch } from "../lib/redux-store/hooks";
import { StatsSlice } from "../lib/redux-store/slices/stats-slice/statsSlice";
import { useTelegram } from "./useTelegram";
import { parseTgInitData } from "../lib/utils/parseTelegeramInitData";
import toast from "react-hot-toast";
import { formatNumber } from "../lib/utils/formatNumber";

export enum SocketEvent {
  TAP_BOT_EARN = "tap-bot-earn",
  ONLINE_USER_UPDATE = "online-users-update",
}

export const useWsConnection = () => {
  const dispatch = useAppDispatch();
  const telegram = useTelegram();

  useEffect(() => {
    if (!telegram?.initData) return;
    const parsedTgInitData = parseTgInitData(telegram?.initData);
    const serializedInitData = encodeURIComponent(JSON.stringify(parsedTgInitData.user));

    // Подключаемся к WebSocket-серверу
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "NEXT_PUBLIC_SOCKET_URL not stated", {
      extraHeaders: {
        user: serializedInitData,
      },
    });

    // Слушаем событие 'onlineUsersUpdate' и обновляем количество пользователей
    socket.on(SocketEvent.ONLINE_USER_UPDATE, (data) => {
      dispatch(StatsSlice.updateOnlineUsers(data));
    });

    socket.on(SocketEvent.TAP_BOT_EARN, (data: { earned: number }) => {
      if (data.earned > 0) {
        toast.success(`Earned with tap bot: ${formatNumber(data.earned)}`);
      }
    });

    return () => {
      if (socket) {
        socket.off(SocketEvent.ONLINE_USER_UPDATE);
        socket.off(SocketEvent.TAP_BOT_EARN);
        socket.disconnect();
      }
    };
  }, [telegram?.initData]);
};
