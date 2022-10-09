import React from 'react';
import { NavLink } from 'react-router-dom';
import { BurgerContainer, OverlayContainer, ContenContainer, ContenContainerOverlay, NavigationContainer, CloseNaivationContainer, ContainerElements, NavigationLinksContainer, UserLinksContainer } from './styles/MobileNavStyles';
import { GiHamburgerMenu, GiReceiveMoney, GiPayMoney, GiSplitArrows, GiCharacter, GiExitDoor } from "react-icons/gi";
import { BiWindowClose } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';

const MobileNav = ({isOpen, openModal}) => {
    return(
        <>
            <BurgerContainer
                onClick={openModal}
            >
                <GiHamburgerMenu size={'2rem'} color='#742ff6' />
            </BurgerContainer>

            {
                isOpen && (
                    <OverlayContainer>
                        <ContenContainerOverlay onClick={openModal} />
                        <ContenContainer>
                            <NavigationContainer>
                                <CloseNaivationContainer>
                                    <div 
                                        onClick={openModal}
                                    >
                                        <BiWindowClose size={'2.5rem'} color='#742ff6' />
                                    </div>

                                    <p>Menu</p>
                                </CloseNaivationContainer>
                                <ContainerElements>
                                    <NavigationLinksContainer >
                                        <NavLink
                                            onClick={openModal}
                                            to={'/budget'}
                                        >Home <FiHome size={'1.5rem'} /></NavLink>
                                        <NavLink
                                            onClick={openModal}
                                            to={'incomes'}
                                        >Incomes <GiReceiveMoney size={'1.5rem'} /></NavLink>
                                        <NavLink
                                            onClick={openModal}
                                            to={'expenses'}
                                        >Expenses <GiPayMoney size={'1.5rem'} /></NavLink>
                                        <NavLink
                                            onClick={openModal}
                                            to={'movements'}
                                        >Movements <GiSplitArrows size={'1.5rem'} /></NavLink>
                                    </NavigationLinksContainer>
                                    <NavigationLinksContainer>
                                        <NavLink
                                            onClick={openModal}
                                            to={'profile'}
                                        >Profile <GiCharacter size={'1.5rem'} /></NavLink>

                                        <button>
                                            <p> Log Out <GiExitDoor size={'1.5rem'} /></p>
                                        </button>
                                    </NavigationLinksContainer>
                                </ContainerElements>
                            </NavigationContainer>
                        </ContenContainer>
                    </OverlayContainer>
                )
            }
        </>
    )
}

export default MobileNav;