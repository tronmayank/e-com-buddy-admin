// src/store/slices/papSlice.ts
import { Slice, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SliceStateType } from "src/models/SliceStateType";

const initialState: SliceStateType = {
  isOpenAddDialog: false,
  isOpenEditDialog: false,
};

const papSlice: Slice<SliceStateType> = createSlice({
  name: "pap",
  initialState,
  reducers: {
    setIsOpenAddDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpenAddDialog = action.payload;
    },
    setIsOpenEditDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpenEditDialog = action.payload;
    },
  },
});

export const { setIsOpenAddDialog, setIsOpenEditDialog } = papSlice.actions;
export default papSlice.reducer;
