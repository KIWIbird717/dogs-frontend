import dynamic from "next/dynamic";

export const useErudaDevTooling = () => {
  const isDev = Boolean(parseInt(process.env.NEXT_PUBLIC_IS_DEBUG || "0"));

  if (isDev) {
    import("eruda").then((mod) => mod.default.init());
  }
};
