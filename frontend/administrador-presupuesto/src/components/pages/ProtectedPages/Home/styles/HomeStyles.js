import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 100%;
    border-radius: 10px;
`;

export const SubContainer = styled.div`
    max-height: 60%;
    flex: 1;
    display: flex;
    margin: 0.7rem 0;
    border: 1.5px solid #e1e1e1;
    border-radius: 10px;
    padding: 0 0.8rem;

`;

export const ExchangeContainer = styled.div`
    flex: 1;
    border: 1.5px solid #e1e1e1;
    border-radius: 10px;
    padding: 0.8rem;
    max-height: 40%;
`;