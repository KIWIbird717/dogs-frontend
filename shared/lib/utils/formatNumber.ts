export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en").format(value).replace(/,/g, " ");
};
