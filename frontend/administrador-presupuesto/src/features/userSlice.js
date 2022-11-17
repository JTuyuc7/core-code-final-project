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

    // Loading spinner
    isLoadingReload: false,
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
        },
        tokenReloadPage(state, action){
            state.userToken = action.payload;
            state.isAuthUser = true;
        },
        updateCredentialsReload(state, action){
            state.isAuthUser = action.payload.isValid;
            state.userToken = action.payload.token;
            state.userInfo = action.payload.user;
        },
        dispatchLoadingReload(state, action){
            state.isLoadingReload = action.payload
        },
        dispatchLogoutUser(state, action) {
            state.isLoadingAuth = false;

            // State for checking email
            state.isTakenEmail = null;
            state.isTakenMsg = '';

            // Validate account token
            state.isValidToken = null;
            state.isLoadingConfirm = false;

            // Authenticate user
            state.isAuthUser = false;
            state.userToken = '';
            state.userInfo = {};

            // Loading spinner
            state.isLoadingReload = false;
        }
    }
})


// Export the actions
export const userActions = userSlice.actions;