import { AxiosResponse } from "axios";
import { Logger } from "./logger/Logger";

export const errorHandler = async <T>(
  serviceName: string,
  request: Promise<AxiosResponse<T>>,
): Promise<AxiosResponse<T>> => {
  const logger = new Logger(serviceName);
  try {
    return await request;
  } catch (error) {
    logger.error(`Error while handling request with service name: ${serviceName}`, error);
    throw error;
  }
};
