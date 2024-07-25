import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IModelSlice } from "./type";

export namespace ModalSlice {
  const initialState: IModelSlice = {
    type: null,
    isOpen: false,
    data: {},
  };

  export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
      setOpenModal: (state, action: PayloadAction<IModelSlice>) => {
        state.isOpen = true;
        state.type = action.payload.type;
        state.data = action.payload.data;
      },
      setCloseModal: (state) => {
        state.isOpen = false;
        state.type = null;
        state.data = {};
      },
    },
  });

  export const { setOpenModal, setCloseModal } = modalSlice.actions;
  export const modalReducer = modalSlice.reducer;
  export type Type = IModelSlice;
}
