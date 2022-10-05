import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // State for users
    isLoadingAuth: false,
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        dispatchLoading(state, action){
            state.isLoadingAuth = action.payload
        }
    }
})


// Export the actions
export const userActions = userSlice.actions;