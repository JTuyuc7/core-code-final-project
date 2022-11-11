import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BiUpArrowAlt } from 'react-icons/bi';
import { getAllIncomesExpenses, getAllIncomesExpensesByAccount, getAllMyAccounts } from '../../../../services/accountServices';
import { SingleButton } from '../Accounts/styles/AccountsComponentsStyles';
import IncomesForm from './IncomesForm';
import { ContentContainer, ContentListContainer, FilterContainer, HeaderContainer, InfoContainer, ListExpensesContainer, MainContainer, NoExpenses, SubMenuExpenses } from './styles/IncomeStyles';
import { useDispatch, useSelector } from 'react-redux';

const Incomes = () => {
    const dispatch = useDispatch();
    const { allIncomes, expenseIncomeLoading, allAccounts } = useSelector((state) => state.accounts);

    const [openModal, setOpenModal] = useState(false);
    const [filterByAccount, setFilterByAccount] = useState('');
    useEffect(() => {
        dispatch(getAllMyAccounts());
        dispatch(getAllIncomesExpenses());
    }, []);

    const filterAccountHandler = (e) => {
        setFilterByAccount(e.target.value);
    }
    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }

    useEffect(() => {
        if (filterByAccount === 0) {
            dispatch(getAllIncomesExpenses());
        }else if (filterByAccount !== '') {
            const dataFound = allAccounts.find((acc) => acc.accountId === filterByAccount);
            dispatch(getAllIncomesExpensesByAccount({acc:dataFound.accountNumber, type: 'Income'}));
        }
        
    },[filterByAccount])

    return (
        <>
            <MainContainer>
                <ListExpensesContainer>
                    <FilterContainer>
                        <FormControl fullWidth size='small'>
                            <InputLabel id='filterAccount'>Choose an account</InputLabel>
                            <Select
                                labelId='filterAccount'
                                id='accountFilter'
                                label='Filter by account'
                                placeholder='Filter By Account'
                                onChange={filterAccountHandler}
                                value={filterByAccount}
                            >
                                <MenuItem value={0}>All Accounts</MenuItem>
                                {
                                    allAccounts.map((acc) => {
                                        return (
                                            <MenuItem key={acc.accountId} value={acc.accountId}>
                                                <p><span>{acc.accountNumber} </span> {acc.accountType}</p>
                                            </MenuItem>
                                        )
                                    })
                                }
                                
                            </Select>
                        </FormControl>
                    </FilterContainer>
                    <ContentListContainer>
                        {
                            expenseIncomeLoading
                                ? (<p>Cargando</p>)
                                : allIncomes.length === 0
                                ? (<NoExpenses>No Incomes yet</NoExpenses>)
                                : (
                                    allIncomes.map((exp) => {
                                        const date = new Date(exp.createdAt);
                                        const createdDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
                                        const dollarFormat = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(exp.amount);
                                        return (
                                        <ul key={exp.inExId}>
                                            <li>
                                                <ContentContainer>
                                                    <HeaderContainer>
                                                        <p>Type <span>Expense <BiUpArrowAlt size={'1.2rem'}/></span></p>
                                                    </HeaderContainer>
                                                    <InfoContainer>
                                                            <p>Description: <span>{exp.description.length === 0 ? 'No description provided': exp.description}</span></p>
                                                    </InfoContainer>
                                                    <InfoContainer>
                                                            <p>Expense amount: <span>{dollarFormat}</span></p>
                                                    </InfoContainer>
                                                    <InfoContainer>
                                                            <p>Expense belongs to: <span>{exp.inAccBelongsTo}</span></p>
                                                    </InfoContainer>
                                                    <InfoContainer>
                                                            <p>Registered to <span>{createdDate}</span></p>
                                                    </InfoContainer>
                                                </ContentContainer>
                                            </li>
                                        </ul>
                                    )
                                })
                            )
                        }
                    </ContentListContainer>
                </ListExpensesContainer>
                <SubMenuExpenses>
                    <SingleButton onClick={handleOpenModal}>New Income</SingleButton>
                </SubMenuExpenses>
            </MainContainer>

            {openModal && <IncomesForm handleOpenModal={handleOpenModal} />}
        </>
    )
}

export default Incomes;