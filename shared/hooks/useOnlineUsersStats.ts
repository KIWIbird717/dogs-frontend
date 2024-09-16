"use client";

import { useEffect } from "react";
import io from "socket.io-client";
import { useAppDispatch } from "../lib/redux-store/hooks";
import { StatsSlice } from "../lib/redux-store/slices/stats-slice/statsSlice";

export const useOnlineUsersStats = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Подключаемся к WebSocket-серверу
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "NEXT_PUBLIC_SOCKET_URL not stated");

    // Слушаем событие 'onlineUsersUpdate' и обновляем количество пользователей
    socket.on("onlineUsersUpdate", (data) => {
      dispatch(StatsSlice.updateOnlineUsers(data));
    });

    return () => {
      if (socket) {
        socket.off("onlineUsersUpdate");
        socket.disconnect();
      }
    };
  }, []);
};
