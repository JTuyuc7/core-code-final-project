import styled from "styled-components";

export const MainOverlarContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
        color: rgba(116,47,246,0.8);
        font-family: Roboto;
    }
`;

export const OveralyContainer = styled.div`
    background-color: yellow;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
`;

export const ContentContainer = styled.div`
    position: absolute;
    background-color: #f2f3f5;
    width: 35%;
    height: 70%;
    padding: 1rem;
    border-radius: 10px;
    z-index: 2;
    animation: modalFade 1s forwards;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 0.8px solid rgba(116,47,246,0.8);

    @media( max-width: 1000px) {
        width: 60%;
    }

    @media( max-width: 700px) {
        width: 70%;
    }

    @media( max-width: 500px) {
        width: 90%;
    }

    @keyframes modalFade {
        0% { opacity: 0; };
        100% { opacity: 1;};
    }
`;

export const FormContainer = styled.form`
    width: 70%;
    padding: 1rem;

    @media( max-width: 1000px) {
        width: 70%;
    }

    @media( max-width: 700px) {
        width: 80%;
    }

    @media( max-width: 500px) {
        width: 90%;
    }
`;

export const ContentFormValues = styled.div`
    margin: 1.2rem 0;
`;

export const SingleButton = styled.button`
    width: 100%;
    border: navajowhite;
    padding: 0.5rem 0.5rem;
    /*height: 45px;*/
    height: ${({buttonH}) => buttonH};
    border-radius: 5px;
    border: 1.2px solid rgba(116,47,246,0.8);
    color: rgba(116,47,246,0.8);
    font-family: Roboto;
    font-weight: 700;
    background-color: rgba(255,255,255,0.1);
    transition: 1.2s ease all;

    &:hover{
        cursor: pointer;
        background-color: rgba(116,47,246,0.2);
        ${({isDisabled}) => isDisabled && `
            cursor: not-allowed;
            background-color: rgba(116,47,246,0);
            color: rgba(116,47,246,0.3);
        `}
    }

    @media( max-width: 900px) {
        width: 100%;
        height: 40px;
    }
`;

export const CloseContainer = styled.div`
    background-color: #f2f3f5;
    position: absolute;
    top: -40px;
    left: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        font-family: Roboto;
        color: rgba(116,47,246,1);
        font-weight: bold;
    }

    &:hover{
        cursor: pointer;
    }
`;

// Styles Form data
export const ElementMenuItem = styled.div`
    p {
        font-family: Roboto;
        font-size: 13px;

        span {
            font-size: 11px;
            font-weight: bold;
            font-style: italic;
        }
    }

    span{
        font-size: 16px;
    }
`;