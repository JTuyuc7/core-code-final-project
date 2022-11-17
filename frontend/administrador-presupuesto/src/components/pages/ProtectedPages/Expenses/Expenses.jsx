import React, { useEffect, useState } from 'react'
import { BackButtonContainer, ContentContainer, ContentListContainer, FilterContainer, HeaderContainer, InfoContainer, ListExpensesContainer, MainContainer, NoExpenses, SubMenuExpenses } from './styles/ExpensesStyles';
import { BiDownArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { SingleButton } from '../Accounts/styles/AccountsComponentsStyles';
import NewExpenseForm from './NewExpenseForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams,  } from 'react-router-dom';
import { getAllIncomesExpenses, getAllIncomesExpensesByAccount, getAllMyAccounts } from '../../../../services/accountServices';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import NoData from '../../../UI/NoData';

const Expenses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allExpenses, expenseIncomeLoading, allAccounts } = useSelector((state) => state.accounts);
    const [openModal, setOpenModal] = useState(false);
    const [filterByAccount, setFilterByAccount] = useState('');
    const [params, setParams] = useSearchParams();
    useEffect(() => {
        dispatch(getAllMyAccounts());
        dispatch(getAllIncomesExpenses());
    }, []);
    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }

    const filterAccountHandler = (e) => {
        setFilterByAccount(e.target.value);
        const dataFound = allAccounts.find((acc) => acc.accountId === e.target.value);
        if (e.target.value === 0) {
            setParams({})
        } else {
            setParams({account: `${dataFound.accountNumber}`})
        }
    }

    const backHandler = () => {
        navigate('/budget')
    }

    useEffect(() => {
        if (filterByAccount === 0) {
            dispatch(getAllIncomesExpenses());
        }else if (filterByAccount !== '') {
            const dataFound = allAccounts.find((acc) => acc.accountId === filterByAccount);
            dispatch(getAllIncomesExpensesByAccount({acc:dataFound.accountNumber, type: 'Expense'}));
        }
        
    },[filterByAccount])

    return (
        <>
            <MainContainer>
                <BackButtonContainer
                    onClick={backHandler}
                >
                    <BiLeftArrowAlt size={'1.5rem'} color={`rgba(116,47,246,0.9)`} style={{ fontWeight: 'bold'}} />
                </BackButtonContainer>
                {
                    allAccounts.length === 0 && (
                        <NoData />
                    )
                }
                {
                    allAccounts.length !== 0 && (
                        <>
                            <ListExpensesContainer>
                                <FilterContainer>
                                    <FormControl fullWidth size='small'>
                                        <InputLabel id='filterAccount'>Filter by account</InputLabel>
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
                                            : allExpenses.length === 0
                                            ? (<NoExpenses>No Expenses yet</NoExpenses>)
                                            : (
                                                allExpenses.map((exp) => {
                                                    const date = new Date(exp.createdAt);
                                                    const createdDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
                                                    const dollarFormat = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(exp.amount);
                                                    return (
                                                    <ul key={exp.inExId}>
                                                        <li>
                                                            <ContentContainer>
                                                                <HeaderContainer>
                                                                    <p>Type <span>Expense <BiDownArrowAlt size={'1.2rem'}/></span></p>
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
                                <SingleButton onClick={handleOpenModal}>New Expense</SingleButton>
                            </SubMenuExpenses>
                        </>
                    )
                }
                
            </MainContainer>

            { openModal && <NewExpenseForm handleOpenModal={handleOpenModal} />}
        </>
    )
}

export default Expenses;