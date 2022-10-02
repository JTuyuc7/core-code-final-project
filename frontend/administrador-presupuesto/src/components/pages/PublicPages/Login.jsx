import React from 'react';
import { NavLink } from 'react-router-dom';
import bgImg from '../../assets/imgs/bgImage.jpg';
import { FormMainContainer, ImageContainer, MainContainer, FormContainer, Title, Img, ValuesContainer, ContentContainer, ButtonContainer, Button, AccountContainer } from './styles/LoginStyle';
import { TextField, FormControl } from '@mui/material';

const Login = () => {

    return(
        <>
            <MainContainer >
                <ImageContainer >
                    <Img src={bgImg} alt='Logo' />
                </ImageContainer>

                <FormMainContainer>
                    <FormContainer >
                        <Title>Log in</Title>

                        <ValuesContainer >
                            <ContentContainer>
                                <FormControl fullWidth >
                                    <TextField 
                                        required
                                        id='outlined-required'
                                        label='Email address'
                                        style={{ marginTop: '30px'}}
                                    />
                                </FormControl>

                                <FormControl fullWidth >
                                    <TextField 
                                        required
                                        id='outlined-required'
                                        label='Password'
                                        style={{ marginTop: '30px'}}
                                    />
                                </FormControl>
                            </ContentContainer>

                            <ButtonContainer>
                                <Button>Log in</Button>
                            </ButtonContainer>

                        </ValuesContainer>
                        <AccountContainer >
                            <NavLink style={{ textDecoration: 'none', fontFamily: 'Roboto', fontSize: '14px', fontWeight: 'semibold', color: '#742ff6'}} to={'/create-account'}>Do not have an account? Get one</NavLink>
                        </AccountContainer>
                    </FormContainer>
                </FormMainContainer>
            </MainContainer>
        </>
    )
}

export default Login