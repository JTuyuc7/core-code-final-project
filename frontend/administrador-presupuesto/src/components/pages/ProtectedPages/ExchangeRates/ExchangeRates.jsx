import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ExchangeRatesContainer, SelectContainer, SelectItemContainer } from './styles/ExchangeStyles';
import axios from 'axios';
import ExchangeReturn from './ExchangeRender';

const ExchangeRates = () => {

    const [currencies, setCurrencies] = useState([
        { currencyCode: 'CAD', currencyCountry: 'Canadian Dollar' },
        { currencyCode: 'MXN', currencyCountry: 'Mexican Peso' },
        { currencyCode: 'GTQ', currencyCountry: 'Guatemalan Quetzal' },
        { currencyCode: 'GBP', currencyCountry: 'Pound Sterling' },
        { currencyCode: 'CLP', currencyCountry: 'Chinese Renminbi' },
        { currencyCode: 'EUR', currencyCountry: 'Euro' },
        { currencyCode: 'AED', currencyCountry: 'UAE Dirham' },
        { currencyCode: 'BRL', currencyCountry: 'Brazilian Real' },
    ]);
    const [currency, setCurrency] = useState('');
    const [dataCurrency, setDataCurrency] = useState();
    const [currencyInfo, setCurrencyInfo] = useState();
    const handleChangeDat = (e) => {
        setCurrency(e.target.value);
        const infoC = currencies.find((ele) => ele.currencyCode === e.target.value);
        setCurrencyInfo(infoC);
    }
    const getCurrencyInfo = async (code) => {
        const result = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_CURRENCY}/pair/USD/${code}`);
        setDataCurrency(result.data);
    }
    useEffect(() => {
        if (currency !== '') {
            getCurrencyInfo(currency);
        }
    }, [currency]);


    return (
        <>
            <ExchangeRatesContainer>
                <h3>Select a currency to convert</h3>
                <SelectContainer>
                    <p>Dollar to -</p>

                    <SelectItemContainer>
                        <FormControl fullWidth>
                            <InputLabel id='currency'>Choose a currency</InputLabel>

                            <Select
                                id='currency'
                                labelId='currency'
                                label='Select a currency'
                                size='small'
                                style={{ borderWidth: '1px', borderColor: '#742ff4' }}
                                onChange={handleChangeDat}
                                value={currency}
                            >
                                {
                                    currencies.map((ele) => {
                                        return (
                                            <MenuItem key={ele.currencyCode} value={ele.currencyCode}>{ele.currencyCountry}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </SelectItemContainer>
                </SelectContainer>

                {
                    dataCurrency && <ExchangeReturn data={dataCurrency} dataCurrency={currencyInfo} />
                }
            </ExchangeRatesContainer>
        </>
    )
}

export default ExchangeRates;