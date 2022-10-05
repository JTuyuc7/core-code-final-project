import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // State for users
    isLoadingAuth: false,

    // State for checking email
    isTakenEmail: null,
    isTakenMsg: ''
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        dispatchLoading(state, action){
            state.isLoadingAuth = action.payload
        },
        checkTakenEmail(state, action){
            state.isTakenEmail = action.payload.isTaken;
            state.isTakenMsg = action.payload.msg
        },
        clearTakenEmail(state, action){
            state.isTakenEmail = null;
            state.isTakenMsg = '';
        }
    }
})


// Export the actions
export const userActions = userSlice.actions;