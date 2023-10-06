import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user'
import permissionsReducer from './slices/permission'

export const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        permissions: permissionsReducer
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch