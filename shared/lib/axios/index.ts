import axios from "axios";

const isServer = typeof window === "undefined";

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

serverApi.interceptors.request.use((config) => {
  if (isServer) return config;

  const initData = window.Telegram.WebApp.initData;
  config.headers.user = initData;
  return config;
});
