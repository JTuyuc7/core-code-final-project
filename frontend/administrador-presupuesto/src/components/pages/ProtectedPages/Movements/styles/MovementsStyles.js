import styled from 'styled-components';

export const MovementsMainContainer = styled.div`
    height: 100%;
    position: relative;
    border: 1.5px solid #e1e1e1;
    border-radius: 10px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const SubContainerContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const FilterContainer = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const ItemFilterContainer = styled.div`
    width: 100%;
    margin: 0 0.6rem;
    @media(max-width: 700px){
        margin: 0.3rem 0;
    }
`;

export const MovementsContainer = styled.div`
    padding: 1rem;
    border-top: 1.5px solid #e1e1e1;
    display: flex;
    flex-direction: row;
    flex: 1;
`;

export const SubMenuComponent = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media(max-width: 700px){
        width: 100%;
    }
`;

export const ListTransactionsContainer = styled.div`
    width: 80%;
    height: 400px;
    max-height: 100%;
    overflow-y: scroll;

    p {
        padding: 1rem 0;
        font-family: Roboto;
        font-weight: 400;
        color: #742ff4;

        span {
            font-weight: bold;
            font-style: italic;
        }
    }
    &::-webkit-scrollbar {
        display: none;
    }
    @media(max-width: 700px){
        width: 70%;
        height: 300px;
    }

    @media(max-width: 500px){
        width: 80%;
        height: 500px;
    }
    @media(max-width: 468px){
        width: 95%;
        height: 330px;
    }
`;

export const FormNewTransaction = styled.div`
    width: 55%;
    border-left: 1.5px solid #e1e1e1;
    @media(max-width: 700px){
        display: none;
    }
`;

export const OptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 70%;
    justify-content: space-between;
    @media(max-width: 700px){
        flex-direction: column;
        width: 100%;
    }
`;

export const NewTransferContainer = styled.div`
    width: 100%;
    display: none;
    @media(max-width: 700px){
        display: none;
        display: block;
    }
`;

// Listado de elemetos
export const ListItemContainer = styled.ul`
    list-style: none;
    width: 100%;
    background-color: rgba(116,47,246,0.2);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`;

export const ItemContiner = styled.div`
    margin: 0.9rem 0;
    display: flex;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

export const HeaderItem = styled.div`
    background-color: ${({ movType }) => movType};
    width: 100%;
    padding: 0.5rem 0.5rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    @media(max-width: 700px){
        padding: 0.3rem 0.5rem;
    }
`;

export const SubContentHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        font-family: Roboto;
        font-weight: 600;
        color: #f2f3f5;
        text-transform: uppercase;
    }
`;

export const ContentContainerList = styled.div`
    padding: 0.5rem;
    padding-bottom: 0.7rem;
    /*height: 130px;*/
    max-height: 100%;
    overflow-y: scroll;

    /*@media(max-width: 700px){
        height: 100px;
    }*/
    &::-webkit-scrollbar {
        display: none;
    }
    p {
        font-family: Roboto;
        font-style: italic;
        font-weight: 500;
        padding: 0.1rem 0;

        span {
            font-style: normal;
            /*color: rgba(34,37,41,1);*/
            color: rgba(116,47,246,1);
        }
    }

    span {
        font-style: normal;
        font-family: Roboto;
        font-weight: 500;
        /*color: rgba(34,37,41,1);*/
        color: rgba(116,47,246,1);
    }
`;