export enum LocalstorageKeys {
  LevelBeforeBowlUpdate = "level-before-bowl-update",
  CompliedTask = "complied-task",
}

export namespace Localstorage {
  export type CompliedTaskRawType = {
    taskId: string;
    earned: number;
  };
}
