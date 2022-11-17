import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CloseContainer, ContentContainer, ContentFormValues, FormContainer, MainOverlarContainer, OveralyContainer, SingleButton } from './styles/NewAccountFormStyles';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { createNewAccount, getAllMyAccounts } from '../../../../services/accountServices';
import CustomSpinner from '../../../UI/CustomSpinner';
import { accountActions } from '../../../../features/accountsSlice';

const NewAccountForm = ({ handleOpenModal }) => {
    const dispatch = useDispatch();
    const { allAccountTypes, loadingCreating, isSuccess } = useSelector((state) => state.accounts);
    useEffect(() => {
        if (isSuccess) {
            handleOpenModal();
        }
        return () => {
            dispatch(accountActions.dispatchSuccessRequest(null));
            dispatch(getAllMyAccounts());
        }
    },[isSuccess])
    const [ newAccountData, setNewAccountType ] = useState({
        accountType: '',
        amount: '',
        currency: 'Dollar'
    });
    const { accountType, amount, currency } = newAccountData;
    const isDisabled = !accountType || !amount;
    const [formErrors, setFormErros] = useState({
        accountTypeError: false,
        amountError: false
    });
    const { accountTypeError, amountError } = formErrors;

    const newAccountHandler = (e) => {
        e.preventDefault();
        const ele = allAccountTypes.find((acc) => acc.typeAccountId === accountType);
        if (!accountType || !amount) return;
        let budgetAcc = {};
        
        budgetAcc.accountType = ele.typeAccount;
        budgetAcc.amount = amount;
        budgetAcc.currency = currency;
        dispatch(createNewAccount(budgetAcc));
        setNewAccountType({
            accountType: '',
            amount: '',
            currency: 'Dollar'
        });
        setFormErros({
            accountTypeError: false,
            amountError: false
        })
    }

    return (
        <>
            <MainOverlarContainer>
                <OveralyContainer onClick={handleOpenModal} />
                
                <ContentContainer>
                    <CloseContainer
                        onClick={handleOpenModal}
                    ><span>X</span></CloseContainer>
                    <h3>Create account</h3>
                    <FormContainer
                        onSubmit={newAccountHandler}
                    >
                        <ContentFormValues>
                            <FormControl fullWidth>
                                <InputLabel id='accountType'>Account Type</InputLabel>
                                <Select
                                    labelId='accountType'
                                    id='accountTypeSelect'
                                    value={accountType}
                                    label='Account Type'
                                    placeholder='Select an account type'
                                    required
                                    onChange={(e) => {setNewAccountType({ ...newAccountData, accountType: e.target.value })}}
                                    onBlur={() => setFormErros({ ...formErrors, accountTypeError: true })}
                                    error={accountTypeError && accountType === ''}
                                >
                                    {
                                        allAccountTypes.map((acc) => {
                                            return (
                                                <MenuItem key={acc.typeAccountId} value={acc.typeAccountId} >{acc.typeAccount}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                { accountTypeError && accountType === '' && <FormHelperText>Please select an account type</FormHelperText>}
                            </FormControl>
                        </ContentFormValues>
                        <ContentFormValues>
                            <FormControl fullWidth>
                                <TextField
                                    id='amount'
                                    label='Initial Amount'
                                    type='number'
                                    value={amount}
                                    required
                                    placeholder='Example 500'
                                    onChange={ (e) => setNewAccountType({...newAccountData, amount: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    onBlur={() => setFormErros({ ...formErrors, amountError: true })}
                                    error={amountError && amount === '' ? true : amount !== '' && Number(amount) === 0 ? true : false}
                                    helperText={amountError && amount === '' ? 'Please enter an amount' : amount !== '' && Number(amount) === 0 && 'Amount must be greater than 0'}
                                />
                            </FormControl>
                        </ContentFormValues>
                        <ContentFormValues>
                            <SingleButton buttonH={'45px'} isDisabled={isDisabled}>{ loadingCreating ? <CustomSpinner color='#742ff6' /> : 'Create Account'}</SingleButton>
                        </ContentFormValues>
                    </FormContainer>
                </ContentContainer>
            </MainOverlarContainer>
            
        </>
    )
}

export default NewAccountForm;