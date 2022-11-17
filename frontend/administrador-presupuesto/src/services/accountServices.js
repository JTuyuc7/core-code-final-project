import { createAsyncThunk } from '@reduxjs/toolkit';
import { accountActions } from '../features/accountsSlice';
import { axiosClient } from '../config/axios';
import { toast } from 'react-toastify';

const storageUsertoken = () => {
    const token = localStorage.getItem('$userToken');
    return token;
}

export const getMovementsByAccount = createAsyncThunk(
    'get_movements_by_account',
    async (data, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const result = await axiosClient.get(`/api/movements/all/${data.account}?filter=${data.filter}`, config);
            thunkApi.dispatch(accountActions.dispatchAllMovements(result.data.movements))
        } catch (error) {
            console.log(error, 'Unable to get your data')
        }
    }
)

export const getAllMovementsService = createAsyncThunk(
    'get_all_movements',
    async (_, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const result = await axiosClient.get(`/api/movements/all`, config);
            if (result.status === 200) {
                thunkApi.dispatch(accountActions.dispatchAllMovements(result.data.movements))
            }
        } catch (error) {
            console.log(error, 'Unable to get all your movements')
        }
    }
)

export const newTransactionService = createAsyncThunk(
    'create_new_transaction',
    async (values, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            console.log(values.data, 'en servicios')
            thunkApi.dispatch(accountActions.dipatchLoadingRequest(true));
            await axiosClient.post(`/api/movements/transfer`, values.data, config);
        } catch (error) {
            console.log(error, 'Unable to complete the request');
        } finally {
            setTimeout(() => {
                thunkApi.dispatch(accountActions.dipatchLoadingRequest(false));
                thunkApi.dispatch(accountActions.successCompleted(true));
            }, 900);
        }
    }
)

export const getDestinationAccountService = createAsyncThunk(
    'get_destination_account',
    async (acc, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            console.log(acc, 'llega aca')
            const result = await axiosClient.get(`/api/movements/find/${acc}`, config);
            
            console.log(result.data, typeof result.data, 'cuenta enctonrada ?')
            if (result.status === 200) {
                thunkApi.dispatch(accountActions.dispatchUserTransferInfo(result.data))
            }
        } catch (error) {
            console.log(error, 'unable to get the account info');
        }
    }
)

export const getAllIncomesExpensesByAccount = createAsyncThunk(
    'get_data_by_account',
    async (data, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const result = await axiosClient.get(`/api/incomes-expenses/all/${data.acc}?type=${data.type}`, config);
            if (data.type === 'Expense') {
                thunkApi.dispatch(accountActions.dispatchAllExpenses(result.data.data));
            }

            if (data.type === 'Income') {
                thunkApi.dispatch(accountActions.dipatchAllIncomes(result.data.data));
            }
        } catch (error) {
            console.log(error, 'unable to get data')
        }
    }
)

export const getAllIncomesExpenses = createAsyncThunk(
    'get_all_incomes_expenses',
    async (_, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            thunkApi.dispatch(accountActions.dispatchLoadingRequestExpenseIncome(true));
            const result = await axiosClient.get(`/api/incomes-expenses/all`, config);

            const expenses = [];
            const incomes = [];
            if (result.data.data) {
                result.data.data.forEach((ele) => {
                    
                    if (ele.inExType === 'Expense') {
                        expenses.push(ele);
                    }

                    if (ele.inExType === 'Income') {
                        incomes.push(ele);
                    }
                });
                thunkApi.dispatch(accountActions.dispatchAllExpenses(expenses));
                thunkApi.dispatch(accountActions.dipatchAllIncomes(incomes));
            }
        } catch (error) {
            console.log(error, 'Unable to get your data')
        } finally { 
            thunkApi.dispatch(accountActions.dispatchLoadingRequestExpenseIncome(false));
        }
    }
)

export const createNewExpenseIncome = createAsyncThunk(
    'add_new_expense',
    async (data, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            thunkApi.dispatch(accountActions.dipatchLoadingRequest(true));
            const result = await axiosClient.post(`/api/incomes-expenses/new/${data.account}`, data.values, config);
            if (result.data.codeStatus === 3) {
                toast.error(result.data.msg);
            }

            if (result.data.codeStatus === 2) {
                toast.warn(result.data.msg);
            }
            
            if (result.data.codeStatus === 1) {
                toast.success(result.data.msg);
                thunkApi.dispatch(accountActions.dispatchNewExpenseIncome(result.data.data))
            }
        } catch (error) {
            console.log(error, 'Unable to record you expense')
        } finally {
            setTimeout(() => {
                thunkApi.dispatch(accountActions.dipatchLoadingRequest(false));
                thunkApi.dispatch(accountActions.successCompleted(true));
            }, 900)
        }
    }
)

export const createNewAccount = createAsyncThunk(
    'create_budget_account',
    async (data, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        thunkApi.dispatch(accountActions.dispatchLoadingCreateAccount(true));
        try {
            const result = await axiosClient.post(`/api/budget/create-account`,data, config);
            if (result.status === 200) {
                toast.success(result.data.msg);
                thunkApi.dispatch(accountActions.dispatchSuccessRequest(true));
            }
        } catch (error) {
            console.log(error, 'unable to create the account')
        } finally {
            setTimeout(() => {
                thunkApi.dispatch(accountActions.dispatchLoadingCreateAccount(false));
            },900)
        }
    }
)

export const getAllAccountTypes = createAsyncThunk(
    'get_all_account_types', 
    async (_, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const result = await axiosClient.get(`api/budget/account-types`, config);
            if (result.status === 200) {
                thunkApi.dispatch(accountActions.dispatchGetAllAccountTypes(result.data.accounts));
            }
        } catch (error) {
            console.log(error, 'Unable to get all account types')
        }
    }
)

export const getAllMyAccounts = createAsyncThunk(
    'get_all_accounts',
    async (_, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        // Dispatch loading state
        thunkApi.dispatch(accountActions.dispatchLoadingAccounts(true))
        try {
            const result = await axiosClient.get(`/api/budget/all-accounts`, config);
            if (result.status === 200) {
                thunkApi.dispatch(accountActions.dispatchAllUserAccounts(result.data.accounts))
            }
        } catch (error) {
            console.log(error, 'unable to get my accounts')
        } finally {
            thunkApi.dispatch(accountActions.dispatchLoadingAccounts(false));
        }
    }
)