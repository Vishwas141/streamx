import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkTheme: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.isDarkTheme = action.payload.isDarkTheme;
    }
  },
});

export const {changeTheme} = authSlice.actions;
export default authSlice.reducer;