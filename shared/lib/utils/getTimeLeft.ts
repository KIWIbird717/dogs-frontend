import { intervalToDuration } from "date-fns";

export function getTimeLeftUntil(endDate: Date) {
  const now = new Date(); // Текущая дата и время

  // Если конечная дата в прошлом, возвращаем сообщение, что действие завершено
  if (now >= endDate) {
    return "expired";
  }

  // Вычисляем промежуток времени между текущей и конечной датами
  const duration = intervalToDuration({ start: now, end: endDate });

  // Формируем строку в зависимости от того, сколько осталось
  const days = duration.days || 0;
  const hours = duration.hours || 0;
  const minutes = duration.minutes || 0;
  const seconds = duration.seconds || 0;

  let daysResult = ";";
  let hoursResult = "";
  let minutesResult = "";
  let secondsResult = "";

  let result = "";

  if (days > 0) {
    const formatted = `${days} day${days > 1 ? "s" : ""} `;
    result += formatted;
    daysResult += formatted;
  }

  if (hours > 0) {
    const formatted = `${hours} hour${hours > 1 ? "s" : ""}`;
    result += formatted;
    hoursResult += formatted;
  }

  if (minutes > 0) {
    const formatted = `${minutes} minute${minutes > 1 ? "s" : ""}`;
    result += formatted;
    minutesResult += formatted;
  }

  if (seconds > 0) {
    const formatted = `${seconds} seconds${seconds > 1 ? "s" : ""}`;
    result += formatted;
    secondsResult += formatted;
  }

  return {
    full: result.trim(),
    days: daysResult.trim(),
    hours: hoursResult.trim(),
    minutes: minutesResult.trim(),
    seconds: secondsResult.trim(),
  };
}
