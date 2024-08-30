const NEXT_PUBLIC_LOGGER_STATE = process.env.NEXT_PUBLIC_LOGGER_STATE;
const NEXT_PUBLIC_TRACE_ERRORS = process.env.NEXT_PUBLIC_TRACE_ERRORS;

type LogType = "[DEBUG]" | "[LOG]  " | "[WARN] " | "[ERROR]";

const nodeColors = {
  Reset: "\x1b[0m",
  magenta: "\x1b[35m",
  green: "\x1b[32m",
  orange: "\x1b[33m",
  red: "\x1b[31m",
};
type NodeColorsKeys = keyof typeof nodeColors;
type Color = Exclude<NodeColorsKeys, "Reset">;

/**
 * Класс Logger выводит сообщения в консоль в зависимости от настроек окружения.
 *
 * **🚀 Get started**
 *
 * Использовать вместо обычного console.log, console.error, console.warn. Данный
 * класс должен использоваться только во время разработки. После сборки проекта
 * отключить вывод сообщений в консоль в .env файле поставив переменную окружения
 * `NEXT_PUBLIC_LOGGER_STATE = off`. Изначально переменная окружения `NEXT_PUBLIC_LOGGER_STATE`
 * стоит в значении `on`.
 *
 * Если в логере нужно отслеживать где была вызвана ошибка, то в переменной окружения
 * в .env файле нужно поставить переменную окружения `NEXT_PUBLIC_NEXT_PUBLIC_TRACE_ERRORS = true`.
 * Таким образом в консоли будет отображаться стек вызовов функций.
 *
 * **ℹ️ Usage**
 *
 * @example
 *
 * // Логирование без контекста
 * Logger.log("log message");     // [LOG]    05:10:21  -  log message
 * Logger.debug("debug message"); // [DEBUG]  05:10:21  -  debug message
 * Logger.warn("warn message");   // [WARN]   05:10:21  -  warn message
 * Logger.error("error message"); // [ERROR]  05:10:21  -  error message
 *
 * // Логирование c контекста
 * const logger = new Logger("context");
 * logger.log("log message with context");     // [LOG]    05:10:21  [context]  - log message with context
 * logger.debug("debug message with context"); // [DEBUG]  05:10:21  [context]  - debug message with context
 * logger.warn("warn message with context");   // [WARN]   05:10:21  [context]  - warn message with context
 * logger.error("error message with context"); // [ERROR]  05:10:21  [context]  - error message with context
 */
export class Logger {
  constructor(private readonly context?: string) {}

  private static get consoleAlwd() {
    // eslint-disable-next-line no-console
    return console;
  }

  private static get isDebug() {
    if (NEXT_PUBLIC_LOGGER_STATE === undefined) {
      const logMsg =
        'Logger can not find NEXT_PUBLIC_LOGGER_STATE variable. Look at .env file and be sure that you have NEXT_PUBLIC_LOGGER_STATE in .env file with proper value "on" or "off"';
      this.consoleAlwd.error(logMsg);
      return false;
    }
    return NEXT_PUBLIC_LOGGER_STATE === "on";
  }

  private static get isTracingErrors() {
    if (NEXT_PUBLIC_TRACE_ERRORS === undefined) {
      this.consoleAlwd.warn("NEXT_PUBLIC_TRACE_ERRORS is not defined");
      return false;
    }
    if (NEXT_PUBLIC_TRACE_ERRORS !== "true" && NEXT_PUBLIC_TRACE_ERRORS === "false") {
      this.consoleAlwd.warn('NEXT_PUBLIC_TRACE_ERRORS could be only "true" or "false"');
      return false;
    }
    return NEXT_PUBLIC_TRACE_ERRORS === "true";
  }

  private static getTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  private static textColor(text: string, color: Color) {
    return nodeColors[color] + text + nodeColors.Reset;
  }

  private static printLog({
    logType,
    context,
    message,
    optionalParams,
  }: {
    logType: LogType;
    context?: string;
    message?: any;
    optionalParams: any[];
  }) {
    if (!this.isDebug) return; // если дебаг мод выключен, но не выводим логи

    const isNode = typeof window === "undefined";

    let textColor: Color;
    switch (logType) {
      case "[LOG]  ":
        textColor = "green";
        break;
      case "[WARN] ":
        textColor = "orange";
        break;
      case "[DEBUG]":
        textColor = "magenta";
        break;
      case "[ERROR]":
        textColor = "red";
        break;
      default:
        textColor = "green";
        break;
    }

    const currentTime = `${this.getTime()}`;

    if (context) {
      if (isNode) {
        this.consoleAlwd.log(
          Logger.textColor(logType, textColor),
          currentTime,
          Logger.textColor(`[${context}]`, textColor),
          "-",
          message,
          ...optionalParams,
        );
      } else {
        this.consoleAlwd.log(
          `%c${logType} ` + `%c${currentTime} ` + `%c[${context}] `,
          `color: ${textColor}`,
          "color: inherit",
          `color: ${textColor}`,
          message,
          ...optionalParams,
        );
      }
    } else {
      if (isNode) {
        this.consoleAlwd.log(
          Logger.textColor(logType, textColor),
          currentTime,
          " - ",
          message,
          ...optionalParams,
        );
      } else {
        this.consoleAlwd.log(
          `%c${logType} ` + `%c${currentTime} `,
          `color: ${textColor}`,
          "color: inherit",
          message,
          ...optionalParams,
        );
      }
    }
  }

  public log(message?: any, ...optionalParams: any[]) {
    Logger.printLog({
      logType: "[LOG]  ",
      context: this.context,
      message,
      optionalParams,
    });
  }

  public warn(message?: any, ...optionalParams: any[]) {
    Logger.printLog({
      logType: "[WARN] ",
      context: this.context,
      message,
      optionalParams,
    });
  }

  public debug(message?: any, ...optionalParams: any[]) {
    Logger.printLog({
      logType: "[DEBUG]",
      context: this.context,
      message,
      optionalParams,
    });
  }

  public error(message?: any, ...optionalParams: any[]) {
    Logger.printLog({
      logType: "[ERROR]",
      context: this.context,
      message,
      optionalParams,
    });
  }

  public static log(message?: any, ...optionalParams: any[]) {
    Logger.printLog({
      logType: "[LOG]  ",
      message,
      optionalParams,
    });
  }

  public static warn(message?: any, ...optionalParams: any[]) {
    Logger.printLog({
      logType: "[WARN] ",
      message,
      optionalParams,
    });
  }

  public static debug(message?: any, ...optionalParams: any[]) {
    Logger.printLog({
      logType: "[DEBUG]",
      message,
      optionalParams,
    });
  }

  public static error(message?: any, ...optionalParams: any[]) {
    Logger.printLog({
      logType: "[ERROR]",
      message,
      optionalParams,
    });
  }
}
