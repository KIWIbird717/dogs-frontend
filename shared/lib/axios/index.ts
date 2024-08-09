import axios from "axios";
import { parseTgInitData } from "../utils/parseTelegeramInitData";

const isServer = typeof window === "undefined";

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

serverApi.interceptors.request.use((config) => {
  if (isServer) return config;

  const initData = window.Telegram.WebApp.initData;

  if (!initData) return config;
  console.log({ initData });
  const serializedInitData = initData.split("user=")[1].split("auth_date")[0].slice(0, -1);
  console.log({ serializedInitData });
  config.headers.user = serializedInitData;
  return config;
});
