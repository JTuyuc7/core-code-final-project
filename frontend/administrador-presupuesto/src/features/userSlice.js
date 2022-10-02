import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // State for users
    isAuth: false,
    token: ''
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {

    }
})


// Export the actions
export const userActions = userSlice.actions;