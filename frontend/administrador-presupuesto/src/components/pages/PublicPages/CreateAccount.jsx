import { FormControl, TextField } from '@mui/material';
import ImgCreateAccount from '../../assets/imgs/bgImage1.jpg';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { Button, AccountContainer, AccountImg, ButtonContainer, MainContainer, FormContentContainer, ImageContentContainer, ContentContainer, ImageContent, Title, NameLastNameContainer, EmailContainer, PasswordContainer } from './styles/CreateAccountStyles';

const CreateAccount = () => {

    return(
        <>
            <MainContainer>
                <FormContentContainer>
                    <ContentContainer >
                    <Title>Sign up</Title>

                        <NameLastNameContainer >
                            <FormControl fullWidth >
                                <TextField 
                                    required
                                    id='name'
                                    label='Name'
                                    type='text'
                                    
                                />
                            </FormControl>
                            <FormControl fullWidth >
                                <TextField 
                                    required
                                    id='lastName'
                                    label='Last Name'
                                    type='text'
                                    
                                />
                            </FormControl>
                        </NameLastNameContainer>

                        <EmailContainer>
                            <FormControl fullWidth >
                                <TextField 
                                    required
                                    id='email'
                                    label='Email'
                                    type='text'
                                />
                            </FormControl>
                        </EmailContainer>

                        <PasswordContainer >
                            <FormControl fullWidth >
                                <TextField 
                                    required
                                    id='password'
                                    label='Password'
                                    type='password'
                                />
                            </FormControl>

                            <FormControl fullWidth >
                                <TextField 
                                    required
                                    id='confirmPassword'
                                    label='Confirm Password'
                                    type='password'
                                />
                            </FormControl>
                        </PasswordContainer>

                        <ButtonContainer>
                            <Button>Create Account</Button>
                        </ButtonContainer>

                        <AccountContainer >
                            <NavLink style={{ textDecoration: 'none', fontFamily: 'Roboto', fontSize: '14px', fontWeight: 'semibold', color: '#742ff6'}} to={'/'}>Already a member? Log in</NavLink>
                        </AccountContainer>
                    </ContentContainer>
                </FormContentContainer>

                <ImageContentContainer >
                    <ImageContent >
                        <AccountImg src={ImgCreateAccount} alt='Account Logo' />
                    </ImageContent>
                </ImageContentContainer>
            </MainContainer>
        </>
    )
}

export default CreateAccount