import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex: 1;
    height: 100vh;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    @media( max-width: 768px) {
        flex-direction: column;
    }
`;

export const FormContentContainer = styled.form`
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    @media( max-width: 768px) {
        height: 90%;
    }
`;

export const ContentContainer = styled.div`
    width: 60%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    box-shadow: 5px 5px 5px 3px rgba(116,47,246,0.2);
    border: 0.5px solid #742ff6;
    padding-bottom: 50px;
    padding-top: 25px;
    padding-left: 20px;
    padding-right: 20px;
    @media( max-width: 468px) {
        width: 80%;
        height: 75%;
    }
`;

export const Title = styled.h2`
    font-size: 25px;
    font-weight: bold;
    color: #742ff4;
    font-family: Roboto;
    text-transform: uppercase;
    margin-bottom: 20px;
    margin-top: 10px;
`;

export const ImageContentContainer = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media( max-width: 768px) {
        height: 20%;
        width: 100%;
    }
`;

export const ImageContent = styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
    margin: 10px;
`;

// Inforamtion of form
export const NameLastNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
    width: 100%;
    @media( max-width: 468px) {
        flex-direction: column;
        gap: 15px;
    }
`;

export const EmailContainer = styled.div`
    width: 100%;
    margin-top: 10px;
`;

export const PasswordContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
    width: 100%;
    margin-top: 10px;
    @media( max-width: 468px) {
        background-color: yellow;
        flex-direction: column;
        gap: 15px;
    }
`;

export const ButtonContainer = styled.div`
    justify-content: center;
    display: flex;
    width: 100%;
    margin-top: 20px;
`;

export const Button = styled.button`
    display: block;
    background-color: rgba(116,47,246,0.7);
    width: 100%;
    height: 60px;
    border-radius: 10px;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-family: Roboto;
    font-size: 18px;
    border: 1px solid rgba(116,47,246,0.8);

    &:hover{
        cursor: pointer;
        background-color: rgba(116,47,246,0.9);
    }
`;

export const AccountContainer = styled.div`
    justify-content: flex-start;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 60px;
    @media( max-width: 768px) {
        margin-top: 30px;
    }
`;

export const AccountImg = styled.img`
    width: 90%;

    @media(max-width: 768px){
        width: 25%;
    }
`;