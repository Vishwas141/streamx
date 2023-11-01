import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/AuthSlice";
import meetingsSlice from "./slice/MeetingSlice";
const store = configureStore({
    reducer: {
        auth: authSlice,
        meetings: meetingsSlice
    }
})

export default store
