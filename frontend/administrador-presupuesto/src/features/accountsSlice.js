import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadingAccounts: false,
    allAccounts: [],

    // All type accounts
    allAccountTypes: [],

    // Create account
    loadingCreating: false,
    isSuccess: null
}

export const accountSlice = createSlice({
    name: 'accountSlice',
    initialState: initialState,
    reducers: {
        dispatchLoadingCreateAccount(state, action) {
            state.loadingCreating = action.payload
        },
        dispatchLoadingAccounts(state, action) {
            state.loadingAccounts = action.payload;
        },
        dispatchAllUserAccounts(state, action) {
            state.allAccounts = action.payload;
        },
        dispatchGetAllAccountTypes(state, action) {
            state.allAccountTypes = action.payload;
        },
        dispatchSuccessRequest(state, action) {
            state.isSuccess = action.payload
        }
    }
})


// Export the actions
export const accountActions = accountSlice.actions;