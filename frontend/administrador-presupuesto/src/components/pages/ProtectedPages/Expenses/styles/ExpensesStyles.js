import styled from "styled-components";

export const MainContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    border: 1.5px solid #e1e1e1;
    border-radius: 10px;
    @media(max-width: 700px){
        flex-direction: column-reverse;
    }
`;

export const ListExpensesContainer = styled.div`
    width: 70%;
    padding: 1rem;
    @media(max-width: 700px){
        height: 80%;
        width: 100%;
    }
`;

export const ContentListContainer = styled.div`
    background-color: green;
    height: 450px;
    max-height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    @media(max-width: 700px){
        height: 350px;
    }
`;

export const SubMenuExpenses = styled.div`
    width: 30%;
    padding: 1rem;
    border-left: 1.5px solid #e1e1e1;
    @media(max-width: 700px){
        border-bottom: 1.5px solid #e1e1e1;
        border-left: none;
        height: 20%;
        width: 100%;
    }
`;

export const FilterContainer = styled.div`
    background-color: yellow;
    width: 100%;
    padding: 1rem 0;
`;