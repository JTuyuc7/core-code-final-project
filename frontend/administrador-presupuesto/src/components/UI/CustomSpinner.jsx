import React from 'react';
import { MainContainer } from './styles/CustomSpinnerStyle';
import { PulseLoader } from 'react-spinners';

const CustomSpinner = ({ color = '#FFFFFF', size = 12, speedMultiplier = 1, margin = 3}) => {

    return(
        <MainContainer>
            <PulseLoader color={color} size={size} speedMultiplier={speedMultiplier} margin={margin} />
        </MainContainer>
    )
}

export  default CustomSpinner;