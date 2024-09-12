export enum LocalStorageKeys {
  LevelBeforeBowlUpdate = "level-before-bowl-update",
  CompliedTask = "complied-task",
  InviterId = "inviterId",
  InviterGuildId = "inviterGuildId",
  BreedPack = "breed-pack",
  Clicker = "clicker",

  // settings
  SettingsVibration = "settings-vibration",
}

export namespace Localstorage {
  export type CompliedTaskRawType = {
    taskId: string;
    earned: number;
  };
}
