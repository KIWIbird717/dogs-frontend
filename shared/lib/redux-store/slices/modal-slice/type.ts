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

export interface IBoost {
  title: string
  info: string,
  description: string
  price?: number
  buttonTitle: string
}

export interface IModalData {
  task: ITask;
  boost: IBoost;
}

export interface IModelSlice {
  type: ModelType | null;
  isOpen: boolean;
  data?: IModalData | null;
}
