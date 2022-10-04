import React, { useState, useRef, useEffect } from 'react';
import { FormControl, TextField } from '@mui/material';
import ImgCreateAccount from '../../assets/imgs/bgImage1.jpg';
import { NavLink } from 'react-router-dom';
import { Button, AccountContainer, AccountImg, ButtonContainer, MainContainer, FormContentContainer, ImageContentContainer, ContentContainer, ImageContent, Title, NameLastNameContainer, EmailContainer, PasswordContainer } from './styles/CreateAccountStyles';

const CreateAccount = () => {

    const [ valuesForm, setValuesForm ] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPass: ''
    });
    const { name, lastName, email, password, confirmPass } = valuesForm;

    const nameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRed = useRef();

    console.log(nameInputRef, 'referencia');
    const handleSubmit = (e) => {
        e.preventDefault()
        const currentValueName = nameInputRef.current.value;
        console.log(currentValueName, 'nombre-/*-*--*-')
    }

    console.log(valuesForm, 'datos ');

    return(
        <>
            <MainContainer>
                <FormContentContainer
                    onSubmit={handleSubmit}
                >
                    <ContentContainer >
                        <Title>Sign up</Title>

                        <NameLastNameContainer >
                            <FormControl fullWidth >
                                <TextField 
                                    required
                                    id='name'
                                    label='Name'
                                    type='text'
                                    value={name}
                                    onChange={ (e) => setValuesForm({ ...valuesForm, name : e.target.value })}
                                    ref={nameInputRef}
                                />
                            </FormControl>
                            <FormControl fullWidth >
                                <TextField 
                                    required
                                    id='lastName'
                                    label='Last Name'
                                    type='text'
                                    value={lastName}
                                    onChange={ (e) => setValuesForm({ ...valuesForm, lastName : e.target.value })}
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