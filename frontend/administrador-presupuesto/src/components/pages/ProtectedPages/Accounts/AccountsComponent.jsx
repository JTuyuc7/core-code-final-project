import React from 'react';
import { AccountsContainer, ActionsContainer, ButtonsActions, ButtonsContainer, ContentContainer, ContentMainContainer, DisplayContainer, MainAccountContainer, MainContainer, NoAccountsYet, SingleButton, TitleOptions } from './styles/AccountsComponentsStyles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AccountComponents = ({handleOpenModal}) => {
    const navigate = useNavigate();
    const { allAccounts } = useSelector((state) => state.accounts);
    const handleNavigation = (page) => {
        navigate(page);
    }

    return (
        <>
            <MainContainer>
                <DisplayContainer>
                    <AccountsContainer>
                        <MainAccountContainer>
                            { allAccounts.length < 1 && (<NoAccountsYet>There are no associated accounts yet</NoAccountsYet>)}
                            {
                                allAccounts.map((acc) => {
                                    const date = new Date(acc.createdAt);
                                    const dollarFormat = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(acc.amount);
                                    const createdDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
                                    return (
                                        <li key={acc.accountId}>
                                            <ContentMainContainer>
                                                <ContentContainer>
                                                    <p>Accont type <span>{acc.accountType}</span></p>
                                                </ContentContainer>
                                                <ContentContainer>
                                                    <p>Account Number <span>{acc.accountNumber }</span></p>
                                                </ContentContainer>
                                                <ContentContainer>
                                                    <p>Amount available <span>{dollarFormat}</span></p>
                                                </ContentContainer>
                                                <ContentContainer>
                                                    <p>Created <span>{createdDate}</span></p>
                                                </ContentContainer>
                                            </ContentMainContainer>
                                        </li>
                                    )
                                })
                            }
                        </MainAccountContainer>
                    </AccountsContainer>
                    <ActionsContainer>
                        <TitleOptions>Options</TitleOptions>

                        <ButtonsContainer>
                            <ButtonsActions>
                                <SingleButton buttonH={'45px'} onClick={handleOpenModal}>New Account</SingleButton>
                                {
                                    allAccounts.length > 0 && (
                                        <>
                                            <SingleButton buttonH={'45px'} onClick={() => handleNavigation('expenses') } isDisabled={false} >Expenses</SingleButton>
                                            <SingleButton buttonH={'45px'} onClick={() => handleNavigation('incomes') }  isDisabled={false} >Incomes</SingleButton>
                                            <SingleButton buttonH={'45px'} onClick={() => handleNavigation('movements') } isDisabled={false} >Movements</SingleButton>
                                        </>
                                    )
                                }
                            </ButtonsActions>
                        </ButtonsContainer>
                    </ActionsContainer>
                </DisplayContainer>
            </MainContainer>
        </>
    )
}

export default AccountComponents;