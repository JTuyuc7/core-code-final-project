import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BurgerContainer, OverlayContainer, ContenContainer, ContenContainerOverlay, NavigationContainer, CloseNaivationContainer, ContainerElements, NavigationLinksContainer } from './styles/MobileNavStyles';
import { GiHamburgerMenu, GiReceiveMoney, GiPayMoney, GiSplitArrows, GiExitDoor } from "react-icons/gi";
import { BiWindowClose } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { accountActions } from '../../features/accountsSlice';
import { userActions } from '../../features/userSlice';

const MobileNav = ({ isOpen, openModal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo: { userName, userLastName } } = useSelector((state) => state.user);
    
    const handleLogouotUser = () => {
        navigate('/');
        dispatch(accountActions.dispatchLogOutUserAccount());
        dispatch(userActions.dispatchLogoutUser());
        localStorage.removeItem('$userToken');
    }
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
                                        {/*<NavLink
                                            onClick={openModal}
                                            to={'profile'}
                                        >Profile <GiCharacter size={'1.5rem'} /></NavLink>*/}
                                        <p>{userName} {userLastName}</p>
                                        <button
                                            onClick={handleLogouotUser}
                                        >
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