import { ReactNode } from "react";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";

export type ModelType = "settings" | "editAge" | "earn" | "boosts"

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
  icon: ReactNode;
  title: string
  info: string,
  description?: string
  price?: number
  key?: "full-tank" | "turbo",
  value?: number | null,
  boosts?: number
  buttonTitle: string
  onClick: () => Promise<void>
}

export interface IModalData {
  task?: TasksApiTypes.TasksDto;
  boost?: IBoost;
}

export interface IModelSlice {
  type: ModelType | null;
  isOpen: boolean;
  data?: IModalData | null;
}
