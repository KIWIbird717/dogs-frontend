/**
 * Partial - делать все типы внутри объекта необязательными
 * Omi - Исключение типа
 * Pick - выбор определенного типа
 */
export namespace StatsApiTypes {
  export type UsersByLevelDto = {
    level: number;
    pagination: number;
    start: number;
    balance?: number;
  };
}
