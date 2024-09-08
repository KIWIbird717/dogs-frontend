/**
 * Partial - делать все типы внутри объекта необязательными
 * Omi - Исключение типа
 * Pick - выбор определенного типа
 */
export namespace GuildsApiTypes {
  export enum JoinMethod {
    OPEN = "open",
    BYLINK = "bylink",
  }
  export type CreateDto = {
    name: string;
    description: string;
    link: string;
    avatar: File;
    joinMethod: JoinMethod;
  };

  export type CreateResponse = {
    status: number;
    message: string;
    image: string;
    id: string;
    name: string;
  };

  export type SearchGuild = {
    name: string;
    start: number;
    pagination: number;
  };

  export type GuildJoinResponse = {
    guild: string;
    guildName: string;
  };
}
