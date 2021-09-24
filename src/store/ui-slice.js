import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { modalIsVisible: false },
  reducers: {
    open(state) {
      state.modalIsVisible = true;
    },
    close(state) {
      state.modalIsVisible = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
