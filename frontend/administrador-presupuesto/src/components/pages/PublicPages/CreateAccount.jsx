import React, { useState, useEffect } from 'react';
import { createNewUser, validateTakenEmail } from '../../../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField } from '@mui/material';
import ImgCreateAccount from '../../assets/imgs/bgImage1.jpg';
import { NavLink } from 'react-router-dom';
import { Button, AccountContainer, AccountImg, ButtonContainer, MainContainer, FormContentContainer, ImageContentContainer, ContentContainer, ImageContent, Title, NameLastNameContainer, EmailContainer, PasswordContainer } from './styles/CreateAccountStyles';
import CustomSpinner from '../../UI/CustomSpinner';

const CreateAccount = () => {
    const dispatch = useDispatch();
    const { isLoadingAuth, isTakenEmail, isTakenMsg } = useSelector( (state) => state.user);
    // Email Validation 
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const [ valuesForm, setValuesForm ] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPass: ''
    });
    const [ errorValues, setErrorValues ] = useState({
        nameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false,
    })
    // State foe email validation
    const [isInvalid, setIsInvalid] = useState(false);
    // Input values for state
    const { name, lastName, email, password, confirmPass } = valuesForm;
    // Values Error
    const { nameError, lastNameError, emailError, passwordError, confirmPasswordError } = errorValues;
    const isDisabled = !name || !lastName || !email || !password || !confirmPass || password !== confirmPass || isTakenEmail === 1;

    // Vlidate email
    useEffect(() => {
        const timer = setTimeout(() => {
            if(email !== ''){
                // Validate the the user has only one email
                if(!emailRegex.test(email)) {
                    setIsInvalid(true)
                }else {
                    setIsInvalid(false)
                    dispatch(validateTakenEmail({ email: email}))
                }
            }
        }, 1000)
        return () => {
            clearTimeout(timer);
        }
    }, [email])

    const handleSubmit = (e) => {
        e.preventDefault()
        let userObj = {};
        userObj.userName = name;
        userObj.userLastName = lastName;
        userObj.userEmail = email;
        userObj.userPassword = password;
        // send values to make the request
        dispatch(createNewUser(userObj))

        setValuesForm({
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPass: ''
        })

        setErrorValues({
            nameError: false,
            lastNameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
        })
    }

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
                                    //inputRef={nameInputRef}
                                    value={name}
                                    onChange={ (e) => setValuesForm({ ...valuesForm, name : e.target.value })}
                                    onBlur={ () => setErrorValues({ ...errorValues, nameError: true })}
                                    error={ nameError && name === '' }
                                    helperText={ nameError && name === '' ? 'Name is required' : ''}
                                />
                            </FormControl>
                            <FormControl fullWidth >
                                <TextField 
                                    required
                                    id='lastName'
                                    label='Last Name'
                                    type='text'
                                    //inputRef={lastNameInputRef}
                                    value={lastName}
                                    onChange={ (e) => setValuesForm({ ...valuesForm, lastName : e.target.value })}
                                    onBlur={ () => setErrorValues({ ...errorValues, lastNameError: true })}
                                    error={ lastNameError && lastName === '' }
                                    helperText={lastNameError && lastName  === '' ? 'Last name is required' : ''}
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
                                    value={email}
                                    onChange={ (e) => setValuesForm({ ...valuesForm, email : e.target.value })}
                                    onBlur={ () => setErrorValues({ ...errorValues, emailError: true })}
                                    error={ emailError && email === '' ? true : isTakenEmail === 1 ? true : isInvalid }
                                    helperText={emailError && email  === '' ? 'Email is required' : isInvalid ? 'Email domain invalid' : isTakenMsg !== '' ? isTakenMsg : ''}
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
                                    value={password}
                                    onChange={ (e) => setValuesForm({ ...valuesForm, password : e.target.value })}
                                    onBlur={ () => setErrorValues({ ...errorValues, passwordError: true })}
                                    error={ passwordError && password === '' ? true : password.length < 6 && password !== '' }
                                    helperText={passwordError && password  === '' ? 'Password is required' : password.length < 6 && password !== '' ? 'Needs to be grater than 6 character' : ''}
                                />
                            </FormControl>

                            <FormControl fullWidth >
                                <TextField 
                                    required
                                    id='confirmPassword'
                                    label='Confirm Password'
                                    type='password'
                                    value={confirmPass}
                                    onChange={ (e) => setValuesForm({ ...valuesForm, confirmPass : e.target.value })}
                                    onBlur={ () => setErrorValues({ ...errorValues, confirmPasswordError: true })}
                                    error={ confirmPasswordError && confirmPass === '' ? true : password !== confirmPass && confirmPass !== '' }
                                    helperText={confirmPasswordError && confirmPass  === '' ? 'Please confirm your password' : password !== confirmPass && confirmPass !== '' ? 'Passwords must match' : ''}
                                />
                            </FormControl>
                        </PasswordContainer>

                        <ButtonContainer>
                            <Button
                                isDisabled={isDisabled}
                                type='submit'
                                disabled={isDisabled}
                            >{ isLoadingAuth ? <CustomSpinner /> : 'Create Account'}</Button>
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