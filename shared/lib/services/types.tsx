/**
 * Partial - делать все типы внутри объекта необязательными
 * Omi - Исключение типа
 * Pick - выбор определенного типа
 */
export namespace ApiTypes {
  export type UserDto = {
    age: number;
    first_name: string;
    country: string;
    breedKey: string;
    username: string;
    guild: string;
    balance: number;
    earnPerHour: number;
    lastDailyReward: number;
  };

  export type UpdateUserDto = Partial<UserDto>;
}
