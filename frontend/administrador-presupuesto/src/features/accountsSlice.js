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
    allExpenses: [],
    expenseIncomeLoading: false,
    allIncomes: [],
    completed: null,
    filtterOpt: '',
    stateToFilter: [],
    userTransferInfo: {},
    allMovements: []
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
        dispatchNewExpenseIncome(state, action) {
            if (action.payload.inExType === 'Expense') {
                state.allExpenses = [action.payload, ...state.allExpenses];
            }

            if (action.payload.inExType === 'Income') {
                state.allIncomes = [action.payload, ...state.allIncomes]
            }
            
        },
        successCompleted(state, action) {
            state.completed = action.payload;
        },
        dispatchAllExpenses(state, action) {
            state.allExpenses = action.payload;
        },
        dipatchAllIncomes(state, action) {
            state.allIncomes = action.payload
        },
        dispatchLoadingRequestExpenseIncome(state, action) {
            state.expenseIncomeLoading = action.payload;
        },
        dispatchUserTransferInfo(state, action) {
            state.userTransferInfo = action.payload
        },
        dispatchAllMovements(state, action) {
            state.allMovements = action.payload
        },
        dispatchLogOutUserAccount(state, action) {
            state.loadingAccounts = false;
            state.allAccounts = [];

            // All type accounts
            state.allAccountTypes = [];

            // Create account
            state.loadingCreating = false;
            state.isSuccess = null;

            // New income expense
            state.loadingRequest = false;
            state.allExpenses = [];
            state.expenseIncomeLoading = false;
            state.allIncomes = [];
            state.completed = null;
            state.filtterOpt = '';
            state.stateToFilter = [];
            state.userTransferInfo = {};
            state.allMovements = [];
        }
    }
})


// Export the actions
export const accountActions = accountSlice.actions;