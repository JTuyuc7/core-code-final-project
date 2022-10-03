import styled from 'styled-components';

export const MainContainer = styled.div`
    background-color: rgba(247,247,247,0.8);
    display: flex;
    height: 100vh;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const ContentContainer = styled.div`
    background-color: #fff;
    box-shadow: 5px 5px 5px 3px rgba(116,47,246,0.2);
    border: 0.5px solid #742ff6;
    width: 60%;
    height: 60%;
    border-radius: 10px;
    position: absolute;
    z-index: 1;
    @media(max-width: 768px){
        width: 90%;
    }
    @media( max-width: 468px){
        width: 80%;
    }
    
`;

export const CircleContainer = styled.div`
    background-color: rgba(116,47,246,0.2);
    position: absolute;
    height: 400px;
    width: 400px;
    top: 0;
    right: 0;
    border-bottom-left-radius: 100%;
    @media(max-width: 468px){
        height: 250px;
        width: 250px;
    }
`;

export const CircleContainer1 = styled.div`
    background-color: rgba(116,47,246,0.4);
    position: absolute;
    height: 300px;
    width: 300px;
    top: 55%;
    right: 70%;
    border-radius: 50%;
    @media(max-width: 468px){
        height: 250px;
        width: 250px;
        right: 40%;
        top: 60%;
    }

    @media(max-width: 768px){
        height: 250px;
        width: 250px;
        right: 60%;
        top: 60%;
    }
`;

export const Title = styled.h1`
    font-family: 'Roboto', sans-serif;
    text-align: center;
    color: rgb(116,47,246);
    margin: 20px auto;
`;

export const ContentContainerInfo = styled.div`
    width: 80%;
    margin: 0 auto;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const TextContainer = styled.div`
    justify-content: center;
    display: flex;
`;

export const ButtonContainer = styled.div`
    justify-content: center;
    display: flex;
    margin-bottom: 20px;
`;

export const Button = styled.button`
    display: block;
    background-color: rgba(116,47,246,0.8);
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

export const TextContent = styled.p`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: rgba(116,47,246,0.7);
    font-size: 18px;
    text-align: center;
    line-height: 30px;
    margin-top: 20px;
`;

export const SpanContent = styled.span`
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    color: rgba(116,47,246,1);
`;