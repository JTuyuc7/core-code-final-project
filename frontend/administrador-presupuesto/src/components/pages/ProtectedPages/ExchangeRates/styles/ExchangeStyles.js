import styled from "styled-components";

export const ExchangeRatesContainer = styled.div`
    height: 100%;
    width: 100%;
    h3 {
        text-align: center;
        font-family: Roboto;
        font-size: 15px;
        color: #742ff4;
        opacity: 0.7;
    }
`;

export const SelectContainer = styled.div`
    display: flex;
    align-items: center;

    p {
        font-family: Roboto;
        font-size: 16px;
        color: #742ff4;
        opacity: 0.7;
        font-weight: bold;
    }
`;

export const SelectItemContainer = styled.div`
    margin-top: 0.3rem;
    width: 30%;
    margin-left: 1rem;

    @media(max-width: 900px){
        width: 50%;
    }
     @media(max-width: 500px){
        width: 70%;
    }
`;

export const DataCurrencyContainer = styled.div``;

export const InforContainer = styled.div`
    padding: 0.3rem 0;
    p {
        font-family: Roboto;
        font-size: 13px;
        font-weight: bold;
        span {
            font-weight: normal;
            font-style: italic;
            color: #742ff4;
            opacity: 0.8;
        }
    }
`;
