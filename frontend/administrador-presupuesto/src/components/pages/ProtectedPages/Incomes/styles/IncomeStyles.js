import styled from "styled-components";

export const MainContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    border: 1.5px solid #e1e1e1;
    border-radius: 10px;
    position: relative;
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
    height: 400px;
    max-height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
    @media(max-width: 700px){
        height: 320px;
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
    width: 100%;
`;

// Content LI container
export const ContentContainer = styled.div`
    border-radius: 10px;
    width: 50%;
    background-color: rgba(116,47,246,0.1);

    @media(max-width: 900px){
        width: 80%;
    }
    @media(max-width: 700px){
        width: 100%;
    }
`;

export const HeaderContainer = styled.div`
    background-color: rgba(83,165,81,1);
    padding: 0.5rem 1rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin: 1rem 0;
    p {
        color: rgba(255,255,255,1);
        font-weight: 600;
        font-family: Roboto;
        span {
            font-weight: 600;
            text-align: center;
            margin-left: 0.3rem;
        }
    }
`;

export const InfoContainer = styled.div`
    padding: 0.3rem 0.5rem;
    p {
        font-family: Roboto;
        color: rgba(116,47,246,1);
        font-weight: 600;

        span {
            font-weight: 500;
            font-style: italic;
            color: rgba(116,47,246,0.9);
        }
    }

    &:first-child {
        padding-top: 0.1rem;
    }
    &:last-child{
        padding-bottom: 0.8rem;
    }
`;

export const NoExpenses = styled.p`
    text-align: center;
    color: rgba(116,47,246,1);
    font-family: Roboto;
    font-size: 19px;
    padding: 1rem 0;
`;
// 121 40 44