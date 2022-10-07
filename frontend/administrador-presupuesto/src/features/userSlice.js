import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // State for users
    isLoadingAuth: false,

    // State for checking email
    isTakenEmail: null,
    isTakenMsg: '',

    // Validate account token
    isValidToken: null,
    isLoadingConfirm: false,

    // Authenticate user
    isAuthUser: false,
    userToken: '',
    userInfo: {},
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
        },
        confirmEmailAccount(state, action){
            state.isValidToken = action.payload;
        },
        storeUserInfo(state, action){
            state.isAuthUser = true;
            state.userToken = action.payload.token;
            state.userInfo = action.payload.user;
        }
    }
})


// Export the actions
export const userActions = userSlice.actions;