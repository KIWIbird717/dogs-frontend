export const getNumeralSuffix = (value: number | string) => {
  const number = Number(value);
  if (number >= 1000000000) return "B";
  if (number >= 1000000) return "M";
  return "K";
};
