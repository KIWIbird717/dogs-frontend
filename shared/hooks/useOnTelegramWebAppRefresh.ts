import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logger } from "../lib/utils/logger/Logger";

export const useOnTelegramWebAppRefresh = () => {
  const router = useRouter();
  const logger = new Logger("useOnTelegramWebAppRefresh");

  useEffect(() => {
    if (window.performance) {
      logger.log("window.performance works fine on this browser");
    }
    logger.log("navigation.type:", performance.navigation.type);
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      logger.log("This page is reloaded");
      router.replace("./"); // redirect on loader screen after reload page
    } else {
      logger.debug("This page is not reloaded");
    }
  }, []);
};
