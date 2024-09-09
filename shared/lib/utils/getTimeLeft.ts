import { intervalToDuration } from "date-fns";

export function getTimeLeftUntil(endDate: Date): string {
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

  let result = "";

  if (days > 0) {
    result += `${days} day${days > 1 ? "s" : ""} `;
  }

  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  if (minutes > 0) {
    result += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return result.trim(); // Убираем лишние пробелы
}
