import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContainer, TextContent, ContentContainer, CircleContainer, CircleContainer1, Title, ContentContainerInfo, TextContainer, ButtonContainer, Button, SpanContent } from './styles/ConfirmAccountStyles';
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmailAccount } from '../../../services/userServices';
import { userActions } from '../../../features/userSlice';
import CustomSpinner from '../../UI/CustomSpinner';

const ConfirmAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { isValidToken, isLoadingAuth } = useSelector( (state) => state.user );

    const { token } = params;

    const onConfirmAccount = (valid) => {
        // Validation and redirect
        if(valid === 1 || valid === 0) {
            navigate('/');
            // Clear state
            dispatch(userActions.confirmEmailAccount(null))
        }else {
            dispatch(confirmEmailAccount(token));
        }
    }

    return(
        <>
            <MainContainer>
                <CircleContainer />
                <CircleContainer1 />
                <ContentContainer>
                    <Title>Verify your email address</Title>

                    <ContentContainerInfo >
                        <TextContainer >
                            <TextContent>Just one step more to start using your <SpanContent>Budget</SpanContent> account, click the button bellow to confirm your email address</TextContent>
                        </TextContainer>
                            <ButtonContainer 
                                onClick={ () => onConfirmAccount(isValidToken) }
                            >
                                <Button >{ isLoadingAuth ? <CustomSpinner /> : isValidToken === 1 || isValidToken === 0 ? 'Back to login' : 'Confirm Account' }</Button>
                            </ButtonContainer>
                    </ContentContainerInfo>
                </ContentContainer>
            </MainContainer>
        </>
    )
}

export default ConfirmAccount