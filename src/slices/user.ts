import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
    id: number;
    name: string;
    email: string;
    token: string
}

const initialState: { user: UserState | null } = {
    user: null
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserState>) {
            state.user = action.payload
        },
        logout(state) {
            state.user = null
        }
    }
})

export const {login, logout} = slice.actions
export default slice.reducer