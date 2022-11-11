import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountActions } from '../../../../features/accountsSlice';
import { createNewExpenseIncome, getAllMyAccounts } from '../../../../services/accountServices';
import CustomSpinner from '../../../UI/CustomSpinner';
import { CloseContainer, ContentContainer, ContentFormValues, ElementMenuItem, FormContainer, MainOverlarContainer, OveralyContainer, SingleButton } from './styles/IncomesFormStyle';

const IncomesForm = ({handleOpenModal}) => {
    const dispatch = useDispatch();
    const { allAccounts, loadingRequest, completed } = useSelector((state) => state.accounts);

    useEffect(() => {
        if (completed) {
            handleOpenModal();
        }
        return () => {
            dispatch(accountActions.successCompleted(null));
            dispatch(getAllMyAccounts());
        }
    },[completed])
    const [expenseData, setIncomeData] = useState({
        accountNumber: '',
        inExType: 'Income',
        amount: '',
        description: ''
    });
    const { accountNumber, amount, inExType, description } = expenseData;
    
    // Errors
    const [expenseDataError, setIncomeDataError] = useState({
        accountNumberError: false,
        amountError: false,
        descriptionError: false
    });
    const { accountNumberError, amountError, descriptionError } = expenseDataError;

    const [ accSelected, setAccSelected] = useState({})

    const changeAccountSelected = (e) => {
        setIncomeData({ ...expenseData, accountNumber: e.target.value });
        const acc = allAccounts.find((acc) => acc.accountId === e.target.value);
        setAccSelected(acc);
    }

    const handleNewIncome = (e) => {
        e.preventDefault();
        let incomeData = {};
        if (!accountNumber || !amount) return;
        incomeData.description = description;
        incomeData.inExType = inExType;
        incomeData.amount = Number(amount);
        dispatch(createNewExpenseIncome({values: incomeData, account: accSelected.accountNumber}))
        
    }
    return (
        <>
            <MainOverlarContainer>
                <OveralyContainer onClick={handleOpenModal} />

                <ContentContainer>
                    <CloseContainer
                        onClick={handleOpenModal}
                    ><span>X</span></CloseContainer>
                    <h3>New Income</h3>
                    <FormContainer
                        onSubmit={handleNewIncome}
                    >
                        <ContentFormValues>
                            <FormControl fullWidth>
                                <InputLabel id='account'>Select an account</InputLabel>
                                <Select
                                    labelId='account'
                                    id='expenseAccount'
                                    label='Account'
                                    placeholder='Select an account to continue'
                                    required
                                    value={accountNumber}
                                    onChange={changeAccountSelected}
                                    onBlur={() => setIncomeDataError({ ...expenseDataError, accountNumberError: true })}
                                    error={accountNumberError && accountNumber === ''}
                                >
                                    {
                                        allAccounts.map((acc) => {
                                            return (
                                                <MenuItem key={acc.accountId} value={acc.accountId}>
                                                    <ElementMenuItem>
                                                        <p>{acc.accountType} <span>Av. {Number(acc.amount).toFixed(2)} $</span></p>
                                                        <span>{acc.accountNumber}</span>
                                                    </ElementMenuItem>
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                { accountNumberError && accountNumber === '' && <FormHelperText>Please select an account to continue</FormHelperText>}
                            </FormControl>
                        </ContentFormValues>
                        {
                            accountNumber !== '' && (
                                <ContentFormValues>
                                    <FormControl fullWidth>
                                        <TextField
                                            type='number'
                                            placeholder='Enter an amount'
                                            id='amount'
                                            required
                                            label='Expense Amount'
                                            onChange={(e) => setIncomeData({ ...expenseData, amount: e.target.value })}
                                            value={amount}
                                            onBlur={() => setIncomeDataError({ ...expenseDataError, amountError: true })}
                                            error={amountError && amount === '' ? true : amount !== '' && Number(amount) === 0 && true }
                                            helperText={ amountError && amount === '' ? 'Please enter an amount' : amount !== '' && Number(amount) === 0 && 'Amount needs to be grater than 0' }
                                        />
                                    </FormControl>
                                </ContentFormValues>
                            )
                        }

                        {
                            Number(amount) > 0 && (
                                <>
                                    <ContentFormValues>
                                        <FormControl fullWidth>
                                            <TextField
                                                type='text'
                                                placeholder='Expense description'
                                                id='description'
                                                required={false}
                                                label='Expense Description (optional)'
                                                rows={3}
                                                multiline
                                                value={description}
                                                onChange={(e) => setIncomeData({...expenseData, description: e.target.value})}
                                            />
                                        </FormControl>
                                    </ContentFormValues>
                                        <ContentFormValues>
                                        <SingleButton isDisabled={false}>{ loadingRequest ? <CustomSpinner color='#742ff6' /> : 'Save Expense'}</SingleButton>
                                    </ContentFormValues>
                                </>
                            )
                        }
                    </FormContainer>
                </ContentContainer>
            </MainOverlarContainer>
        </>
    )
}

export default IncomesForm;