import React from 'react';
import { DataCurrencyContainer, InforContainer } from './styles/ExchangeStyles';

const ExchangeReturn = ({data, dataCurrency}) => {
    const date = data.time_last_update_utc.split(' ');
    const newDate = date.slice(0, date.length - 2).join(' ')
    return (
        <DataCurrencyContainer>
            <InforContainer>
                <p>1 USD 
                    <span> United States Dollar</span>
                </p>
            </InforContainer>
            <InforContainer>
                <p>{data.conversion_rate} {data.target_code}<span> { dataCurrency.currencyCountry}</span></p>
            </InforContainer>
            <InforContainer >
                <p>Updated at: <span>{newDate}</span></p>
            </InforContainer>
        </DataCurrencyContainer>
    )
}

export default ExchangeReturn;