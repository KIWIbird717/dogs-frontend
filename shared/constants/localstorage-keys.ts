export enum LocalstorageKeys {
  LevelBeforeBowlUpdate = "level-before-bowl-update",
  CompliedTask = "complied-task",
  InviterId = "inviterId",
  InviterGuildId = "inviterGuildId",
}

export namespace Localstorage {
  export type CompliedTaskRawType = {
    taskId: string;
    earned: number;
  };
}
