import React, { useEffect } from 'react';
import AccountComponents from '../Accounts/AccountsComponent';
import { Title } from '../Accounts/styles/AccountsComponentsStyles';
import ExchangeRates from '../ExchangeRates/ExchangeRates';
import { ExchangeContainer, MainContainer, SubContainer } from './styles/HomeStyles';
import { useDispatch } from 'react-redux';
import { getAllAccountTypes, getAllMyAccounts } from '../../../../services/accountServices';
import { useState } from 'react';
import NewAccountForm from '../Accounts/NewAccount';

const Home = () => {
    const dispatch = useDispatch();
    // Get all the info about user
    useEffect(() => {
        // All user accounts
        dispatch(getAllMyAccounts());
        // All Account types
        dispatch(getAllAccountTypes());
    }, []);

    const [openModalForm, setOpenModalForm] = useState(false);

    const handleOpenModal = () => {
        setOpenModalForm(!openModalForm);
    }

    return(
        <>
            <MainContainer>
                <Title>Budget Home Page</Title>
                <SubContainer>
                    <AccountComponents handleOpenModal={handleOpenModal} openModalForm={openModalForm} />
                </SubContainer>
                <ExchangeContainer>
                    <ExchangeRates />
                </ExchangeContainer>       
            </MainContainer>

            { openModalForm && <NewAccountForm handleOpenModal={handleOpenModal} />}
        </>
    )
}

export default Home