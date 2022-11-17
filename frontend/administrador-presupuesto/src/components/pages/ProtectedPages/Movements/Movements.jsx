import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllMovementsService, getAllMyAccounts, getMovementsByAccount } from '../../../../services/accountServices';
import { BackButtonContainer } from '../Expenses/styles/ExpensesStyles';
import { SingleButton } from '../Incomes/styles/IncomesFormStyle';
import FormNewTransfer from './FormDeskTransfer';
import { TiArrowBackOutline, TiArrowForwardOutline } from "react-icons/ti";
import { ContentContainerList, FilterContainer, FormNewTransaction, HeaderItem, ItemContiner, ItemFilterContainer, ListItemContainer, ListTransactionsContainer, MovementsContainer, MovementsMainContainer, NewTransferContainer, OptionsContainer, SubContainerContent, SubContentHeader, SubMenuComponent } from './styles/MovementsStyles';
import MovementsMobile from './MovementsMobile';
import NoData from '../../../UI/NoData';

const Movements = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allMovements, allAccounts } = useSelector((state) => state.accounts);
    const [openModal, setOpenModal] = useState(false);
    const [filterData, setFilterData] = useState({
        filterType: 'all',
        accountId: 0
    });
    const { filterType, accountId } = filterData;
    const [accSelected, setAccountSelected] = useState({});
    const backHandler = () => {
        navigate('/budget')
        setFilterData({
            filterType: 'all',
            accountId: 0
        });
    }
    useEffect(() => {
        dispatch(getAllMovementsService());
        dispatch(getAllMyAccounts());
    }, []);
    
    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }

    const handleSelectedAccount = (e) => {
        setFilterData({...filterData, filterType: e.target.value});
    }

    const handleAccountChange = (e) => {
        setFilterData({...filterData, accountId: e.target.value});
        const acc = allAccounts.find((acc) => acc.accountId === e.target.value);
        setAccountSelected(acc);
    }

    useEffect(() => {
        if (accountId !== 0) {
            dispatch(getMovementsByAccount({ account: accSelected.accountNumber, filter: filterType }));
        } else if (accountId === 0) {
            dispatch(getAllMovementsService());
        }
    }, [filterType, accSelected]);

    return (
        <>
            <MovementsMainContainer>
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
                            <SubContainerContent>
                                <FilterContainer>
                                    <OptionsContainer>
                                        <ItemFilterContainer>
                                            <FormControl size='small' fullWidth>
                                                <InputLabel id='typeTransaction'>Filter by</InputLabel>
                                                <Select
                                                    labelId='filterAccount'
                                                    id='typeTransaction'
                                                    label='Filter by transaction'
                                                    placeholder='Filter by transaction'
                                                    onChange={handleSelectedAccount}
                                                    value={filterType}
                                                >
                                                    <MenuItem value={'all'}>All</MenuItem>
                                                    <MenuItem value={'transfers'}>Transfers</MenuItem>
                                                    <MenuItem value={'deposits'}>Deposits</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </ItemFilterContainer>
                                        <ItemFilterContainer>
                                            <FormControl size='small' fullWidth>
                                                <InputLabel id='accountOpt'>Choose an account</InputLabel>
                                                <Select
                                                    labelId='accountOpt'
                                                    id='accountOption'
                                                    label='Filter by account'
                                                    placeholder='Filter By Account'
                                                    onChange={handleAccountChange}
                                                    value={accountId}
                                                >
                                                    <MenuItem value={0} disabled>Select an account</MenuItem>
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
                                        </ItemFilterContainer>
                                    </OptionsContainer>


                                </FilterContainer>

                                <MovementsContainer>
                                    <SubMenuComponent>
                                        <NewTransferContainer>
                                            <SingleButton onClick={handleOpenModal} buttonH={'40px'} >New Transfer</SingleButton>
                                        </NewTransferContainer>
                                        <ListTransactionsContainer>
                                            {
                                                allMovements.length === 0 && accSelected &&(
                                                    <p>No transactions for the account <span>{accSelected.accountNumber}</span></p>
                                                )
                                            }
                                            <ul>
                                                {
                                                    allMovements.map((mov, idx) => {
                                                        const date = new Date(mov.createdAt);
                                                        const createdDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
                                                        const dollarFormat = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(mov.amount);
                                                        return (
                                                            <ListItemContainer key={idx}>
                                                                <ItemContiner>
                                                                    <HeaderItem movType={mov.movementType === 'Deposit' ? '#53a551' : '#cb444ab3'} >
                                                                        <SubContentHeader>
                                                                            <p>{mov.movementType}</p>
                                                                            {mov.movementType === 'Deposit' ? <TiArrowBackOutline size={'1.3rem'} color='#f2f3f5' /> : <TiArrowForwardOutline size={'1.3rem'} color='#f2f3f5' /> }
                                                                        </SubContentHeader>
                                                                    </HeaderItem>
                                                                    <ContentContainerList>
                                                                        {
                                                                            mov.movementType === 'Deposit' ? (
                                                                                <div>
                                                                                    <p>Received from: <span>{mov.shippingAccount}</span></p>
                                                                                        <p>Receipt account: <span>{mov.destinationAccount}</span></p>
                                                                                        <p>Amount received: <span>{dollarFormat}</span></p>
                                                                                        <p>Description: <span>{mov.description}</span></p>
                                                                                    <p>Transfer date:</p>
                                                                                    <span>{createdDate}</span>
                                                                                </div>
                                                                            ) : (
                                                                                <div>
                                                                                    <p>Send to: <span>{mov.destinationAccount}</span></p>
                                                                                        <p>From account: <span>{mov.shippingAccount}</span></p>
                                                                                        <p>Amount transferred: <span>{dollarFormat}</span></p>
                                                                                        <p>Description: <span>{mov.description}</span></p>
                                                                                        <p>Transfer date: </p>
                                                                                        <span>{createdDate}</span>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </ContentContainerList>
                                                                </ItemContiner>
                                                            </ListItemContainer>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </ListTransactionsContainer>
                                    </SubMenuComponent>

                                    <FormNewTransaction>
                                        <FormNewTransfer />
                                    </FormNewTransaction>
                                    </MovementsContainer>
                                </SubContainerContent>

                        </>
                    )
                }
            </MovementsMainContainer>

            {openModal && <MovementsMobile handleOpenModal={handleOpenModal} />}
        </>
    )
}

export default Movements;