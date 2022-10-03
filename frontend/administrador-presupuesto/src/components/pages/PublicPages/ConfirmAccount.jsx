import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContainer, TextContent, ContentContainer, CircleContainer, CircleContainer1, Title, ContentContainerInfo, TextContainer, ButtonContainer, Button, SpanContent } from './styles/ConfirmAccountStyles';

const ConfirmAccount = () => {
    const navigate = useNavigate();
    const [ isValid, setIsValid ] = useState(true);

    const backToLogin = () => {
        navigate('/');
    }

    const onConfirmAccount = () => {
        // Validation and redirect
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
                            {
                                isValid ? (
                                    <TextContent>Just one step more to start using your <SpanContent>Budget</SpanContent> account, click the button bellow to confirm your email address</TextContent>
                                ) : ( <TextContent >It looks like the token has expired or is no longer valid </TextContent>)
                            }
                        </TextContainer>

                        {
                            isValid ? (
                                <ButtonContainer 
                                    onClick={onConfirmAccount}
                                >
                                    <Button >Confirm Account</Button>
                                </ButtonContainer>
                            ) : (
                                <ButtonContainer 
                                    onClick={backToLogin}
                                >
                                    <Button >Go to login</Button>
                                </ButtonContainer>
                            )
                        }
                    </ContentContainerInfo>
                </ContentContainer>
            </MainContainer>
        </>
    )
}

export default ConfirmAccount