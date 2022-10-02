import styled from 'styled-components';
import bgImage from '../../../assets/imgs/bgImage1.jpg';

const primary = '#742ff6'; 
const secondary = '#CFBDEC';
const darkBlack = '#252525';
const mainWhite = '#FFF';

export const MainContainer = styled.div`
    height: 100vh;
    margin: 0 0;
    padding: 0 0;
    display: flex;
    flex-direction: row;
    @media( max-width: 768px) {
        flex-direction: column-reverse;
    }
`;
//    background: url(${bgImage});
export const ImageContainer = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Roboto sans-serif;
    font-weight: bold;

    @media( max-width: 768px) {
        height: 20%;
        padding: 10px;
        margin: 0 auto;
    }

    @media( max-width: 828px) {
        width: 40%;
    }

    @media( max-width: 480px) {
        width: 50%;
        margin: 0 auto;
    }
`;

export const Img = styled.img`
    width: 95%;
    object-fit:cover;
    @media( max-width: 768px) {
        width: 90%;
    }
    @media( max-width: 828px) {
        width: 65%;
    }
`;

export const FormMainContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FormContainer = styled.div`
    width: 70%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 3px 5px 5px 3px rgba(116,47,246,0.2);
    border: 2px solid(#742ff6);
`;

export const ValuesContainer = styled.div`
    height: 70%;
    width: 100%;
    margin: 10px;
    display: flex;
    margin: 0 10px;
    flex-direction: column;
    gap: 20px;
    padding-top: 60px;
    @media( max-width: 768px) {
        padding-top: 20px;
    }
`;

export const ContentContainer = styled.div`
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media( max-width: 768px) {
        height: 80%;
    }
`;

export const ButtonContainer = styled.div`
    justify-content: center;
    display: flex;
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

export const Title = styled.h2`
    font-size: 25px;
    font-weight: bold;
    color: #742ff4;
    font-family: Roboto;
    text-transform: uppercase;
    margin-bottom: 10px;
`;

export const AccountContainer = styled.div`
    justify-content: flex-end;
    display: flex;
    flex-direction: row;
    width: 100%;

    @media( max-width: 768px) {
        margin-top: 30px;
    }
`;