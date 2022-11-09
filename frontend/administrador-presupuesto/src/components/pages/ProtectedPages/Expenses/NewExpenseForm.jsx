import React, { useState } from 'react';
import { CloseContainer, ContentContainer, ContentFormValues, ElementMenuItem, FormContainer, MainOverlarContainer, OveralyContainer, SingleButton } from './styles/NewExpenseFormStyle';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField, } from '@mui/material';
import { accounts } from '../../../helpers/tempData';
import CustomSpinner from '../../../UI/CustomSpinner';
import { useDispatch } from 'react-redux';
import { createNewExpense } from '../../../../services/accountServices';

const NewExpenseForm = ({handleOpenModal}) => {
    const dispatch = useDispatch();
    const [expenseData, setExpenseData] = useState({
        accountNumber: '',
        inExType: 'Expense',
        amount: '',
        description: ''
    });
    const { accountNumber, amount, inExType, description } = expenseData;
    
    // Errors
    const [expenseDataError, setExpenseDataError] = useState({
        accountNumberError: false,
        amountError: false,
        descriptionError: false
    });

    const { accountNumberError, amountError, descriptionError } = expenseDataError;
    const [ accSelected, setAccSelected] = useState({})

    const changeAccountSelected = (e) => {
        setExpenseData({ ...expenseData, accountNumber: e.target.value });
        const acc = accounts.find((acc) => acc.accountId === e.target.value);
        setAccSelected(acc);
    }
    const isDisabled = !accountNumber || amount <= 0 || Number(amount) > Number(accSelected.amount);

    const handleNewExpense = (e) => {
        e.preventDefault();
        let expenseData = {};
        if (!accountNumber || !amount || Number(amount) > Number(accSelected.amount)) return;
        expenseData.description = description;
        expenseData.inExType = inExType;
        expenseData.amount = Number(amount);
        console.log(expenseData, 'nuevo expense');
        dispatch(createNewExpense({ expense: expenseData, account: accSelected.accountNumber }));
    }

    return (
        <>
            <MainOverlarContainer>
                <OveralyContainer onClick={handleOpenModal} />

                <ContentContainer>
                    <CloseContainer
                        onClick={handleOpenModal}
                    ><span>X</span></CloseContainer>
                    <h3>New Expense</h3>
                    <FormContainer
                        onSubmit={handleNewExpense}
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
                                    onBlur={() => setExpenseDataError({ ...expenseDataError, accountNumberError: true })}
                                    error={accountNumberError && accountNumber === ''}
                                >
                                    {
                                        accounts.map((acc) => {
                                            return (
                                                <MenuItem key={acc.accountId} value={acc.accountId} disabled={Number(acc.amount) <= 0}>
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
                                            onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                                            value={amount}
                                            onBlur={() => setExpenseDataError({ ...expenseDataError, amountError: true })}
                                            error={amountError && amount === '' ? true : amount !== '' && Number(amount) === 0 ? true : Number(amount) > Number(accSelected.amount) }
                                            helperText={ amountError && amount === '' ? 'Please enter an amount' : amount !== '' && Number(amount) === 0 ? 'Amount needs to be grater than 0' : Number(amount) > Number(accSelected.amount) && 'The amount cannot exceed the available balance' }
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
                                            />
                                        </FormControl>
                                    </ContentFormValues>
                                        <ContentFormValues>
                                        <SingleButton isDisabled={isDisabled}>{ false ? <CustomSpinner color='#742ff6' /> : 'Save Expense'}</SingleButton>
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

export default NewExpenseForm;