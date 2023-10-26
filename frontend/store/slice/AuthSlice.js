import {createSlice} from '@reduxjs/toolkit';

const initialState = {}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // login: (state, action) => {
        //     state.user = action.payload
        // },
        // logout: (state) => {
        //     state.user = null
        // }
    }
})
export const authActions = AuthSlice.actions
export default AuthSlice
