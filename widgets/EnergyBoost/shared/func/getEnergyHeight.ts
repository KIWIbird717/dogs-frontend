import { isNumber } from "@/shared/lib/utils/isNumber";

export const getBoostHeight = (energyLimit: number) => {
  const BRAKE_SYMBOL_LENGTH = 5;
  // sizes
  const MIDDLE_SIZE = 17;
  const SMALL_SIZE = 14;

  if (!isNumber(energyLimit)) return MIDDLE_SIZE;

  const symbolsLength = `${energyLimit}`.length;

  if (symbolsLength >= BRAKE_SYMBOL_LENGTH) return SMALL_SIZE;

  return MIDDLE_SIZE;
};
