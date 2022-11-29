import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccountTypes, getAllMyAccounts, getDestinationAccountService, newTransactionService } from '../../../../services/accountServices';
import CustomSpinner from '../../../UI/CustomSpinner';
import { ElementMenuItem } from '../Incomes/styles/IncomesFormStyle';
import { FormContainer, LabelsContainer, MainFormContainer, SingleButton } from './styles/FormTransferStyles';

const FormNewTransfer = () => {
    const dispatch = useDispatch();
    const { allAccounts, userTransferInfo } = useSelector((state) => state.accounts);
    useEffect(() => {
        // All user accounts
        dispatch(getAllMyAccounts());
        // All Account types
        dispatch(getAllAccountTypes());
    }, []);
    const [transferData, setTransferData] = useState({
        shippingAccount: '',
        destinationAccount: '',
        amount: '',
        description: '',
        userReceivedId: '',
        transferType: "Transfer",
    });
    const { shippingAccount, destinationAccount, amount, description, transferType } = transferData;
    const [errorData, setErrorData] = useState({
        shippingAccountErr: false,
        destinationAccountErr: false,
        amountErr: false,
    });
    const { shippingAccountErr, destinationAccountErr, amountErr } = errorData;
    const [selectedAcc, setSelectedAcc] = useState({});
    const isDisabled = !shippingAccount || !destinationAccount || !amount || Number(amount) > Number(selectedAcc.amount);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (destinationAccount !== '' && destinationAccount.length === 8) {
                dispatch(getDestinationAccountService(destinationAccount));
            }
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [destinationAccount])

    // Funciones
    const handleSelectedAccount = (e) => {
        setTransferData({ ...transferData, shippingAccount: e.target.value });
        const acc = allAccounts.find((acc) => acc.accountId === e.target.value);
        setSelectedAcc(acc);
    }

    // Send data
    const handleNewTransaction = (e) => {
        e.preventDefault();
        const transferObj = {};
        if (!shippingAccount || !destinationAccount || !amount || Number(amount) > Number(selectedAcc.amount)) return;

        transferObj.movementType = transferType;
        transferObj.description = description;
        transferObj.amount = Number(amount);
        transferObj.shippingAccount = selectedAcc.accountNumber;
        transferObj.destinationAccount = userTransferInfo.accountUser.accountNumber;
        transferObj.userReceivedId = userTransferInfo.accountUser.belongsTo;
        dispatch(newTransactionService({ data: transferObj }))
        setTransferData({
            shippingAccount: '',
            destinationAccount: '',
            amount: '',
            description: '',
            userReceivedId: '',
            transferType: "Transfer",
        });
        setErrorData({
            shippingAccountErr: false,
            destinationAccountErr: false,
            amountErr: false,
        })
    }

    return (
        
        <>
            <MainFormContainer>
                <h3>New Transfer</h3>

                <FormContainer
                    onSubmit={handleNewTransaction}
                >
                    <LabelsContainer>
                        <FormControl fullWidth size='small'>
                            <InputLabel id='transferAcc'>From account</InputLabel>
                                <Select
                                    labelId='filterAccount'
                                    id='accountFilter'
                                    label='Filter by account'
                                    placeholder='Filter By Account'
                                    onChange={handleSelectedAccount}
                                    required
                                    value={shippingAccount}
                                    onBlur={() => setErrorData({...errorData, shippingAccountErr: true})}
                                    error={ shippingAccountErr && shippingAccount === ''}    
                                >
                                    {
                                        allAccounts.map((acc) => {
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
                                { shippingAccountErr && shippingAccount === '' && <FormHelperText>Please select an account to continue</FormHelperText> }
                        </FormControl>
                    </LabelsContainer>

                            <LabelsContainer>
                                <FormControl fullWidth>
                                    <TextField
                                        type='number'
                                        placeholder='Acc. example 12345678'
                                        id='desAccount'
                                        required
                                        label={userTransferInfo.codeStatus === 1 ? `Destination user ${userTransferInfo.accountUser.userName} ${userTransferInfo.accountUser.userLastName}` :'Account destination'}
                                        size='small'
                                        onChange={(e) => setTransferData({ ...transferData, destinationAccount: e.target.value })}
                                        value={destinationAccount}
                                        onBlur={() => setErrorData({ ...errorData, destinationAccountErr: true })}
                                        error={destinationAccountErr && destinationAccount === '' ? true : destinationAccount !== '' && destinationAccount.length !== 8 ? true : userTransferInfo.codeStatus === 2 ? true : selectedAcc.accountNumber === destinationAccount  }
                                        helperText={ destinationAccountErr && destinationAccount === '' ? 'Enter the destination account' : destinationAccount !== '' && destinationAccount.length !== 8 ? 'Account number should be 8 digits' : userTransferInfo.codeStatus === 2 ? userTransferInfo.msg : selectedAcc.accountNumber === destinationAccount ? 'Destination account should be different' : '' }
                                    />
                                </FormControl>
                            </LabelsContainer>

                            <LabelsContainer>
                                <FormControl fullWidth>
                                    <TextField
                                        type='number'
                                        placeholder='Amount example, 300.50'
                                        id='amount'
                                        required
                                        label='Amount'
                                        size='small'
                                        onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                                        value={amount}
                                        onBlur={() => setErrorData({ ...errorData, amountErr: true })}
                                        error={amountErr && amount === '' ? true : amount !== '' && Number(amount) === 0 ? true : Number(amount) > Number(selectedAcc.amount) }
                                        helperText={ amountErr && amount === '' ? 'Please enter an amount' : amount !== '' && Number(amount) === 0 ? 'Amount needs to be grater than 0' : Number(amount) > Number(selectedAcc.amount) && 'The amount cannot exceed the available balance' }
                                    />
                                </FormControl>
                            </LabelsContainer>

                                <LabelsContainer>
                                    <FormControl fullWidth>
                                        <TextField
                                            type='text'
                                            placeholder='Description (Optional)'
                                            id='description'
                                            required={false}
                                            label='Description (optional)'
                                            rows={2}
                                            multiline
                                            onChange={(e) => setTransferData({ ...transferData, description: e.target.value })}
                                            value={description}
                                        />
                                    </FormControl>
                                </LabelsContainer>
                                <LabelsContainer>
                                    <SingleButton isDisabled={isDisabled}>{ false ? <CustomSpinner color='#742ff6' /> : 'Transfer'}</SingleButton>
                                </LabelsContainer>
                </FormContainer>
            </MainFormContainer>
        </>
    )
}

export default FormNewTransfer;