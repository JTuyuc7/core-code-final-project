import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SingleButton } from '../pages/ProtectedPages/Incomes/styles/IncomesFormStyle';
import { NoDataContainer, SubContentNodata } from './styles/NoDataStyles';

const NoData = () => {
    const navigate = useNavigate();

    const backHome = () => {
        navigate('/budget')
    }

    return (
        <>
            <NoDataContainer>
                <SubContentNodata>
                    <h4>You do not have associated accounts yet</h4>

                    <SingleButton onClick={backHome}>Back to Home</SingleButton>
                </SubContentNodata>
            </NoDataContainer>
        </>
    )
}

export default NoData;