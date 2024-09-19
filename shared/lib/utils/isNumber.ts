export const isNumber = (value: number) => {
  return typeof value === "number" && isFinite(value);
};
