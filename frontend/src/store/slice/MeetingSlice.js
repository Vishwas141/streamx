import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  toasts: [],
};

const meetingsSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    setToasts: (state, action) => {
      state.toasts = action.payload;
    },
  },
});

export const { setToasts } = meetingsSlice.actions;
export default meetingsSlice.reducer;