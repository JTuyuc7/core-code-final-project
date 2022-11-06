import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/userSlice';
import { accountSlice } from '../features/accountsSlice';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        accounts: accountSlice.reducer,
        // Here will added more reducers
    }
})