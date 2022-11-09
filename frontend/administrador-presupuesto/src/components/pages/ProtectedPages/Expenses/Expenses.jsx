import React, { useState } from 'react'
import { ContentListContainer, FilterContainer, ListExpensesContainer, MainContainer, SubMenuExpenses } from './styles/ExpensesStyles';
import { BiDownArrowAlt } from "react-icons/bi";
import { SingleButton } from '../Accounts/styles/AccountsComponentsStyles';
import NewExpenseForm from './NewExpenseForm';

const Expenses = () => {

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(!openModal);
        console.log('closing modal');
    }

    return (
        <>
            <MainContainer>
                <ListExpensesContainer>
                    <FilterContainer>
                        <p>Opciones para filtrar por cuenta</p>
                    </FilterContainer>
                    <ContentListContainer>
                        <ul>
                            <li>
                                <div>
                                    <div>
                                        <p>Type *-*-*-*- <span>Expense <BiDownArrowAlt /></span></p>
                                    </div>
                                    <div>
                                        <p>Description: <span>Comprar agua</span></p>
                                    </div>
                                    <div>
                                        <p>Expense amount: <span>125.00</span></p>
                                    </div>
                                    <div>
                                        <p>Expense belongs to: <span>35799985</span></p>
                                    </div>
                                    <div>
                                        <p>Registered to <span>Nov 5, 2022, 6:16 PM</span></p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>
                                        <p>Type <span>Expense <BiDownArrowAlt /></span></p>
                                    </div>
                                    <div>
                                        <p>Description: <span>Comprar agua</span></p>
                                    </div>
                                    <div>
                                        <p>Expense amount: <span>125.00</span></p>
                                    </div>
                                    <div>
                                        <p>Expense belongs to: <span>35799985</span></p>
                                    </div>
                                    <div>
                                        <p>Registered to <span>Nov 5, 2022, 6:16 PM</span></p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>
                                        <p>Type <span>Expense <BiDownArrowAlt /></span></p>
                                    </div>
                                    <div>
                                        <p>Description: <span>Comprar agua</span></p>
                                    </div>
                                    <div>
                                        <p>Expense amount: <span>125.00</span></p>
                                    </div>
                                    <div>
                                        <p>Expense belongs to: <span>35799985</span></p>
                                    </div>
                                    <div>
                                        <p>Registered to <span>Nov 5, 2022, 6:16 PM</span></p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>
                                        <p>Type <span>Expense <BiDownArrowAlt /></span></p>
                                    </div>
                                    <div>
                                        <p>Description: <span>Comprar agua</span></p>
                                    </div>
                                    <div>
                                        <p>Expense amount: <span>125.00</span></p>
                                    </div>
                                    <div>
                                        <p>Expense belongs to: <span>35799985</span></p>
                                    </div>
                                    <div>
                                        <p>Registered to <span>Nov 5, 2022, 6:16 PM</span></p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>
                                        <p>Type <span>Expense <BiDownArrowAlt /></span></p>
                                    </div>
                                    <div>
                                        <p>Description: <span>Comprar agua</span></p>
                                    </div>
                                    <div>
                                        <p>Expense amount: <span>125.00</span></p>
                                    </div>
                                    <div>
                                        <p>Expense belongs to: <span>35799985</span></p>
                                    </div>
                                    <div>
                                        <p>Registered to <span>Nov 5, 2022, 6:16 PM</span></p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>
                                        <p>Type <span>Expense <BiDownArrowAlt /></span></p>
                                    </div>
                                    <div>
                                        <p>Description: <span>Comprar agua</span></p>
                                    </div>
                                    <div>
                                        <p>Expense amount: <span>125.00</span></p>
                                    </div>
                                    <div>
                                        <p>Expense belongs to: <span>35799985</span></p>
                                    </div>
                                    <div>
                                        <p>Registered to <span>Nov 5, 2022, 6:16 PM</span></p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>
                                        <p>Type <span>Expense <BiDownArrowAlt /></span></p>
                                    </div>
                                    <div>
                                        <p>Description: <span>Comprar agua</span></p>
                                    </div>
                                    <div>
                                        <p>Expense amount: <span>125.00</span></p>
                                    </div>
                                    <div>
                                        <p>Expense belongs to: <span>35799985</span></p>
                                    </div>
                                    <div>
                                        <p>Registered to <span>Nov 5, 2022, 6:16 PM</span></p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>
                                        <p>Type <span>Expense <BiDownArrowAlt /></span></p>
                                    </div>
                                    <div>
                                        <p>Description: <span>Comprar agua</span></p>
                                    </div>
                                    <div>
                                        <p>Expense amount: <span>125.00</span></p>
                                    </div>
                                    <div>
                                        <p>Expense belongs to: <span>35799985</span></p>
                                    </div>
                                    <div>
                                        <p>Registered to <span>Nov 5, 2022, 6:16 PM</span></p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>
                                        <p>Type <span>Expense <BiDownArrowAlt /></span></p>
                                    </div>
                                    <div>
                                        <p>Description: <span>Comprar agua</span></p>
                                    </div>
                                    <div>
                                        <p>Expense amount: <span>125.00</span></p>
                                    </div>
                                    <div>
                                        <p>Expense belongs to: <span>35799985</span></p>
                                    </div>
                                    <div>
                                        <p>Registered to <span>Nov 5, 2022, 6:16 PM</span></p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>
                                        <p>Type <span>Expense <BiDownArrowAlt /></span></p>
                                    </div>
                                    <div>
                                        <p>Description: <span>Comprar agua</span></p>
                                    </div>
                                    <div>
                                        <p>Expense amount: <span>125.00</span></p>
                                    </div>
                                    <div>
                                        <p>Expense belongs to: <span>35799985</span></p>
                                    </div>
                                    <div>
                                        <p>Registered to <span>Nov 5, 2022, 6:16 PM</span></p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div>
                                        <p>Type <span>Expense <BiDownArrowAlt /></span></p>
                                    </div>
                                    <div>
                                        <p>Description: <span>Comprar agua</span></p>
                                    </div>
                                    <div>
                                        <p>Expense amount: <span>125.00</span></p>
                                    </div>
                                    <div>
                                        <p>Expense belongs to: <span>35799985-*-*-*-*-</span></p>
                                    </div>
                                    <div>
                                        <p>Registered to <span>Nov 5, 2022, 6:16 PM</span></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </ContentListContainer>
                </ListExpensesContainer>
                <SubMenuExpenses>
                    <SingleButton onClick={handleOpenModal}>New Expense</SingleButton>
                </SubMenuExpenses>
            </MainContainer>

            { openModal && <NewExpenseForm handleOpenModal={handleOpenModal} />}
        </>
    )
}

export default Expenses;