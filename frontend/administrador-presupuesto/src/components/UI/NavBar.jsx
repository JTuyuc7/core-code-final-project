import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavBarContainer, NavBarSubContainer, NavigationContainer, NavigationTitle, NavigationUserIcon, SubNavigation, UserContainerContent } from './styles/NavBarStyles';
import { BiUser, BiCaretDown } from "react-icons/bi";
import { GiReceiveMoney, GiPayMoney, GiSplitArrows, GiCharacter, GiExitDoor } from 'react-icons/gi';
import MobileNav from './MobileNav';

const NavBar = () => {

    const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(!modalOpen);
    }

    return(
        <>
            <NavBarContainer >
                <NavBarSubContainer >
                    <NavLink 
                        to={'/budget'}
                        style={{ textDecoration: 'none', fontFamily: 'Roboto', textTransform: 'uppercase', fontWeight: 'bolder', color: '#742ff6', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
                    >
                        <h1>Budget</h1>
                    </NavLink>

                    <SubNavigation>
                        <NavigationContainer>
                            <NavigationTitle><p>Menu <BiCaretDown size='1rem' /></p> </NavigationTitle>

                            <div>
                                <li>
                                    <NavLink 
                                        to={'incomes'} 
                                    >Incomes <GiReceiveMoney /></NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to={'expenses'} 
                                    >Expenses <GiPayMoney /></NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to={'movements'} 
                                    >Movements <GiSplitArrows /></NavLink>
                                </li>
                            </div>
                        </NavigationContainer>

                        <UserContainerContent>
                            <NavigationUserIcon>
                                <p>
                                    <BiUser size='1.2rem' />
                                    <BiCaretDown size='1rem' />
                                </p>
                            </NavigationUserIcon>

                            <div>
                                <li>
                                    <NavLink 
                                    to={'profile'} 
                                >Profile <GiCharacter /></NavLink>
                                </li>
                                <li>
                                    <button><p>Logout <GiExitDoor /></p></button>
                                </li>
                            </div>
                        </UserContainerContent>
                    </SubNavigation>
                    <MobileNav isOpen={modalOpen} openModal={openModal} />
                </NavBarSubContainer>
            </NavBarContainer>
        </>
    )
}

export default NavBar;