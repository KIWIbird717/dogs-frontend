/**
 * Partial - делать все типы внутри объекта необязательными
 * Omi - Исключение типа
 * Pick - выбор определенного типа
 */
export namespace GuildsApiTypes {
  export type GuildDto = {
    image: any; //TODO: узнать type image
    name: string;
  };

  export type SearchGuild = {
    name: string;
    start: number;
    pagination: number;
  };
}
