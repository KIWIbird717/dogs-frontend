/**
 * Добавление пробелов между тысячными
 * 800000 -> "800 000"
 */
export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en").format(value).replace(/,/g, " ");
};
