import axios from "axios";
import { parseTgInitData } from "../utils/parseTelegeramInitData";

const isServer = typeof window === "undefined";

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

serverApi.interceptors.request.use((config) => {
  if (isServer) return config;

  const initData =
    window.Telegram.WebApp.initData || process.env.NEXT_PUBLIC_DEV_INIT_DATA || "NOT INIT DATA";
  const parsedTgInitData = parseTgInitData(initData);

  if (!initData) return config;

  const serializedInitData = encodeURIComponent(JSON.stringify(parsedTgInitData.user));

  config.headers.user = serializedInitData;
  return config;
});
