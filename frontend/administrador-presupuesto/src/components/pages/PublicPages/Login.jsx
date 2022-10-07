import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import bgImg from '../../assets/imgs/bgImage.jpg';
import { FormMainContainer, ImageContainer, MainContainer, FormContainer, Title, Img, ValuesContainer, ContentContainer, ButtonContainer, Button, AccountContainer } from './styles/LoginStyle';
import { TextField, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserService } from '../../../services/userServices';
import CustomSpinner from '../../UI/CustomSpinner';

const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { isLoadingAuth, isAuthUser } = useSelector( (state) => state.user );
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    
    // State for login 
    const [ valuesForm, setValuesForm ] = useState({
        email: '',
        password: ''
    })

    // Extract values
    const { email, password } = valuesForm;

    // Error state
    const [ errorValues, setErrorsValues ] = useState({
        emailError: false,
        passwordError: false
    })

    // Extract values erroe
    const { emailError, passwordError } = errorValues;

    // State valid email
    const [ isValidEmail, setIsValidEmail ] = useState(false);
    const isEnabled = !email || !password;

    // Redirect to the home page
    useEffect(() => {
        if(isAuthUser){
            navigation('/budget')
        }
    },[isAuthUser])

    // Vlidate email
    useEffect(() => {
        const timer = setTimeout(() => {
            if(email !== ''){
                // Validate the the user has only one email
                if(!emailRegex.test(email)) {
                    setIsValidEmail(true)
                }else {
                    setIsValidEmail(false)
                }
            }
        }, 1000)
        return () => {
            clearTimeout(timer);
        }
    }, [email])

    const handleSubmit = (e) => {
        e.preventDefault();
        let loginUser = {};
        loginUser.userEmail =  email.toLowerCase();
        loginUser.userPassword = password;
        dispatch(loginUserService(loginUser))

        // Reset all values
        setValuesForm({
            email: '',
            password: ''
        })

        setErrorsValues({
            emailError: false,
            passwordError: false
        })
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
                                        color={'success'}
                                        value={email}
                                        onChange={ (e) => setValuesForm({...valuesForm, email: e.target.value })}
                                        onBlur={() => setErrorsValues({...errorValues, emailError: true})}
                                        error={ emailError && email === '' ? true : isValidEmail }
                                        helperText={emailError && email === '' ? 'Email is required' : isValidEmail ? 'Please enter a valid email' : ''}
                                    />
                                </FormControl>

                                <FormControl fullWidth >
                                    <TextField 
                                        required
                                        id='password'
                                        label='Password'
                                        type='password'
                                        style={{ marginTop: '30px'}}
                                        value={password}
                                        onChange={ (e) => setValuesForm({...valuesForm, password: e.target.value })}
                                        onBlur={ () => setErrorsValues({...errorValues, passwordError: true })}
                                        error={ passwordError && password === ''}
                                        helperText={ passwordError && password === '' ? 'Password is required' : ''}
                                    />
                                </FormControl>
                            </ContentContainer>

                            <ButtonContainer>
                                <Button 
                                    type='submit'
                                    disabled={isEnabled}
                                    isEnabled={isEnabled}
                                >{isLoadingAuth ? <CustomSpinner /> : 'Log in' }</Button>
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