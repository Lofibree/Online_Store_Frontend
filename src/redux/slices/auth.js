import axios from '../../axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const fetchRegistrate = createAsyncThunk('auth/fetchRegistrate', async (formData) => {
    const {data} = await axios.post('/user/registration', formData)
    // debugger
    return data
})
export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (formData) => {
    const {data} = await axios.post('/user/login', formData)
    // debugger
    return data
})
export const fetchLogout = createAsyncThunk('auth/fetchLogout', async (formData) => {
    await axios.get('/user/logout')
    // debugger
})
export const authMe = createAsyncThunk('auth/authMe', async () => {
    const {data} = await axios.get('/user/auth')
    return data
})



const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        // registration
        [fetchRegistrate.pending]: (state, action) => {
            state.status = 'loading'
            state.data = null   
        }, 
        [fetchRegistrate.fulfilled]: (state, action) => {
            state.status = 'loaded'
            // debugger
            state.data = action.payload
            // debugger  
        }, 
        [fetchRegistrate.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        },
        // login
        [fetchLogin.pending]: (state, action) => {
            state.status = 'loading'
            state.data = null   
        }, 
        [fetchLogin.fulfilled]: (state, action) => {
            state.status = 'loaded'
            // debugger
            state.data = action.payload.token 
            // debugger  
        }, 
        [fetchLogin.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        },
        // logout
        [fetchLogout.pending]: (state, action) => {
            state.status = 'loading'
            state.data = null   
        }, 
        [fetchLogout.fulfilled]: (state, action) => {
            state.status = 'loaded'
            // debugger
            state.data = null 
            // debugger  
        }, 
        // [fetchLogout.rejected]: (state, action) => {
        //     state.status = 'error'
        //     state.data = null   
        // },
        // authMe 
        [authMe.pending]: (state, action) => {
            state.status = 'loading'
            state.data = null   
        }, 
        [authMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            // debugger
            state.data = action.payload 
            // debugger  
        }, 
        [authMe.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 

    }
})


export const selectIsAuth = state => Boolean(state.auth.data)
export const selectIsAdmin = state => Boolean((state.auth.data) && (state.auth.data.role === 'ADMIN'))
export const authReducer = authSlice.reducer