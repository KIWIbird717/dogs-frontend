import type { Telegram } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram: Telegram;
  }

  interface Navigator {
    virtualKeyboard: {
      boundingRect: DOMRect;
      ongeometrychange: unknown;
      overlaysContent: boolean;
    };
  }
}
declare module "*.jpg";

declare module "*.scss";
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
