import React from 'react';
import { NavLink } from 'react-router-dom';
import bgImg from '../../assets/imgs/bgImage.jpg';
import { FormMainContainer, ImageContainer, MainContainer, FormContainer, Title, Img, ValuesContainer, ContentContainer, ButtonContainer, Button, AccountContainer } from './styles/LoginStyle';
import { TextField, FormControl } from '@mui/material';

const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Verificar inicio de sesion');
    }

    return(
        <>
            <MainContainer >
                <ImageContainer >
                    <Img src={bgImg} alt='Logo' />
                </ImageContainer>

                <FormMainContainer
                    onSubmit={handleSubmit}
                >
                    <FormContainer >
                        <Title>Log in</Title>

                        <ValuesContainer >
                            <ContentContainer>
                                <FormControl fullWidth >
                                    <TextField 
                                        required
                                        id='email'
                                        label='Email address'
                                        type='email'
                                        style={{ marginTop: '30px'}}
                                    />
                                </FormControl>

                                <FormControl fullWidth >
                                    <TextField 
                                        required
                                        id='password'
                                        label='Password'
                                        type='password'
                                        style={{ marginTop: '30px'}}
                                    />
                                </FormControl>
                            </ContentContainer>

                            <ButtonContainer>
                                <Button type='submit'>Log in</Button>
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