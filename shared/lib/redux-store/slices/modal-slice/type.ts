export type ModelType = "settings" | "editAge"

export interface IModalData {}

export interface IModelSlice {
  type: ModelType | null;
  isOpen: boolean;
  data?: IModalData;
}
