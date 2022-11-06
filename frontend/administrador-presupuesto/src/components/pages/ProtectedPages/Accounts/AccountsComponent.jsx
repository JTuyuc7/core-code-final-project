import React, { useState } from 'react';
import { AccountsContainer, ActionsContainer, ButtonsActions, ButtonsContainer, ContentContainer, ContentMainContainer, DisplayContainer, MainAccountContainer, MainContainer, NoAccountsYet, OptionsContainer, SingleButton, Title, TitleOptions } from './styles/AccountsComponentsStyles';
import { useSelector } from 'react-redux';

const AccountComponents = ({handleOpenModal}) => {

    const { allAccounts } = useSelector((state) => state.accounts);
    const [accountSelected, setAccountSelected] = useState(null);
    
    // const isDisabled = allAccounts.length === 0;
    const isDisabled = true;

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
                                <SingleButton onClick={handleOpenModal}>New Account</SingleButton>
                                {
                                    allAccounts.length > 0 && (
                                        <>
                                            <SingleButton isDisabled={false} >New Expense</SingleButton>
                                            <SingleButton isDisabled={false} >New Income</SingleButton>
                                            <SingleButton isDisabled={false} >New Transfer</SingleButton>
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