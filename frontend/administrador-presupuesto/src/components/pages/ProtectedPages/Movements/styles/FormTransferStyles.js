import styled from "styled-components";

export const MainFormContainer = styled.div`
    padding: 0.6rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
        text-align: center;
        font-family: Roboto;
        font-size: 17px;
        color: rgba(116,47,246,1);
    }
`;

export const LabelsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    margin: 0.6rem 0;
`;

export const FormContainer = styled.form`
    width: 70%;
    display: flex;
    flex-direction: column;

    @media(max-width: 900px){
        width: 85%;
    }
`;

export const SingleButton = styled.button`
    width: 100%;
    border: navajowhite;
    padding: 0.5rem 0.5rem;
    /*height: 45px;*/
    height: ${({buttonH}) => buttonH};
    border-radius: 5px;
    border: 1.2px solid rgba(116,47,246,0.8);
    font-family: Roboto;
    font-weight: 700;
    transition: 1.2s ease all;
    background-color: rgba(255,255,255,0.1);
    color: rgba(116,47,246,0.8);

    &:hover{
        cursor: pointer;
        ${({isDisabled}) => isDisabled && `
            background-color: rgba(116,47,246,0);
            color: rgba(116,47,246,0.3);
            cursor: not-allowed;
        `}
    }

    @media( max-width: 900px) {
        width: 100%;
        height: 40px;
    }
`;