import { Slice, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SideNavLayoutSliceStateType = {
  isNavBarExpanded: boolean;
};

const initialState: SideNavLayoutSliceStateType = {
  isNavBarExpanded: true,
};

const sideNavLayoutSlice: Slice<SideNavLayoutSliceStateType> = createSlice({
  name: "sideNavLayoutSlice",
  initialState,
  reducers: {
    setIsNavBarExpanded: (state, action: PayloadAction<boolean>) => {
      state.isNavBarExpanded = action.payload;
    },
  },
});

export const { setIsNavBarExpanded } = sideNavLayoutSlice.actions;
export default sideNavLayoutSlice.reducer;
