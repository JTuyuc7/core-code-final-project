import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
`;

export const Title = styled.h2`
    text-align: center;
    font-family: Roboto;
    font-size: 22px;
    color: #742ff4;
`;

export const DisplayContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media( max-width: 900px) {
        flex-direction: column;
    }
`;

export const AccountsContainer = styled.div`
    height: 300px;
    max-height: 100%;
    overflow-y: scroll;
    width: 50%;
    @media( max-width: 900px) {
        height: 200px;
        max-height: 100%;
        overflow-y: scroll;
        width: 100%;
    }

    @media( max-width: 700px) {
        height: 180px;
        max-height: 100%;
        overflow-y: scroll;
        width: 100%;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;

// Account styles

export const MainAccountContainer = styled.ul`
    list-style: none;
    li {
        padding: 0.7rem 0;
        border-bottom: 1.5px solid #e1e1e1;
        
        &:last-child{
            border-bottom: 0px solid #000;
        }
    }
`;

export const ContentMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border-radius: 8px;
    background-color: rgba(116,47,246,0.2);
    border: 1px solid rgba(116,47,246,0.4);
`;

export const ContentContainer = styled.div`
    margin-bottom: 0.2rem;
    p {
        font-family: Roboto;
        color: rgba(116,47,246,1);
        /* color: #000; */
        font-weight: 600;
    }

    span{
        font-family: Roboto;
        font-style: italic;
        color: rgba(0,0,0,0.7);
        /*color: rgba(255,255,255,0.7)*/
    }
`;

export const ActionsContainer = styled.div`
    padding: 0 1rem;
    border-left: 1.5px solid #e1e1e1;
    width: 30%;
    @media( max-width: 900px) {
        padding: 0.5rem 0;
        height: 150px;
        width: 100%;
        border-left: none;
        border-top: 1.5px solid #e1e1e1;
    }
`;

export const TitleOptions = styled.h3`
    text-align: center;
    font-family: Roboto;
    color: #742ff4;
    font-size: 17px;
`;

export const ButtonsContainer = styled.div`
    padding: 0.5rem;
    width: 100%;
    margin-top: 1rem;
    @media( max-width: 900px) {
        margin-top: 0;
    }
`;

export const ButtonsActions = styled.div`
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media( max-width: 900px) {
        display: grid;
        gap: 0.5rem;
        grid-template-columns: 50% 50%;
    }
`;

export const SingleButton = styled.button`
    width: 55%;
    border: navajowhite;
    padding: 0.5rem 0.5rem;
    height: 45px;
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
        `}
    }

    @media( max-width: 900px) {
        width: 100%;
        height: 40px;
    }
`;

export const NoAccountsYet = styled.p`
    color: rgba(116,47,246,0.8);
    font-family: Roboto;
    font-size: 17px;
    padding-top: 2rem;
    text-align: center;
`;