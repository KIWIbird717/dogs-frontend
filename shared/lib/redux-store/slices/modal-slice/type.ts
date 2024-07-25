export type ModelType = "settings"

export interface IModalData {}

export interface IModelSlice {
  type: ModelType | null;
  isOpen: boolean;
  data?: IModalData;
}
