import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadingAccounts: false,
    allAccounts: [],

    // All type accounts
    allAccountTypes: [],

    // Create account
    loadingCreating: false,
    isSuccess: null,

    // New income expense
    loadingRequest: false,
    allExpenses: []
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
        },
        // Incomes Expenses
        dipatchLoadingRequest(state, action) {
            state.loadingRequest = action.payload
        },
        dispatchNewExpense(state, action) {
            state.allExpenses = [...state.allExpenses, action.payload]
        }
    }
})


// Export the actions
export const accountActions = accountSlice.actions;