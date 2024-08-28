import { ReactNode } from "react";

export type ModelType = "settings" | "editAge" | "earn";

export interface ITaskObj {
  title: string;
  tasks: ITask[];
}

export interface ITask {
  icon: ReactNode;
  title: string;
  description?: string;
  purpose: string;
  coin: number;
  isClaim?: boolean;
}

export interface IModalData {
  task: ITask;
}

export interface IModelSlice {
  type: ModelType | null;
  isOpen: boolean;
  data?: IModalData | null;
}
