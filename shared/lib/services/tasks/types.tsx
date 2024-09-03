/**
 * Partial - делать все типы внутри объекта необязательными
 * Omi - Исключение типа
 * Pick - выбор определенного типа
 */
export namespace TasksApiTypes {
  export enum TaskTypeEnum {
    YOUTUBE = "YOUTUBE",
    XTWITTER = "XTWITTER",
    EXTERNAL = "EXTERNAL"
  }

  export type TasksDto = {
    id: string;
    name: string;
    desc: string;
    type: TaskTypeEnum //-- тип ENUM [XTWITTER, YOUTUBE, EXTERNAL]
    isPeriodical: boolean; //-- Переодична ли таска? (Когда дается монеты раз в день)
    amount: number; //-- Кол-во вознаграждения
    link: string; //-- Линк куда требуется перейти
    isCompleted: boolean;
  }

}
