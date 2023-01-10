import axios from '../../axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';






export const fetchTypes = createAsyncThunk('type/fetchTypes', async () => {
    const {data} = await axios.get('/type')
    // console.log(data)
    // debugger
    return data
})
export const fetchCreateType = createAsyncThunk('type/fetchCreateType', async (formData) => {
    const {data} = await axios.post('/type', formData)
    // console.log(data)
    // debugger
    return data
})
export const fetchUpdateType = createAsyncThunk('type/fetchUpdateType', async (formData) => {
    // debugger
    const {data} = await axios.patch(`/type/${formData.id}`, formData)
    // console.log(data)
    // debugger
    return data
})
export const fetchDeleteType = createAsyncThunk('type/fetchDeleteType', async (id) => {
    const {data} = await axios.delete(`/type/${id}`)
    // console.log(data)
    // debugger
    return data
})



const initialState = {
    data: [{ name: 'Smartphone', id: 1 }, { name: 'TV', id: 2 }],
    status: 'loading'
}

const typesSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {},
    extraReducers: {
        // create
        [fetchCreateType.pending]: (state, action) => {
            state.status = 'loading'
            // state.data = null   
        }, 
        [fetchCreateType.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = [...state.data, action.payload]
            // debugger  
        }, 
        [fetchCreateType.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 
        // update
        // [fetchUpdateType.pending]: (state, action) => {
        //     state.status = 'loading'
        //     // state.data = null   
        // }, 
        [fetchUpdateType.fulfilled]: (state, action) => {
            state.status = 'loaded'
            // const neededIndex = state.data.findIndex(t => t.id === action.payload)
            // state.data = 
            // debugger  
        }, 
        [fetchUpdateType.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 
        // delete
        [fetchDeleteType.pending]: (state, action) => {
            state.status = 'loading'
            // state.data = null   
        }, 
        [fetchDeleteType.fulfilled]: (state, action) => {
            state.status = 'loaded'
            // state.data = [...state.data, action.payload]
            // debugger  
        }, 
        [fetchDeleteType.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 
        // getAll
        [fetchTypes.pending]: (state, action) => {
            state.status = 'loading'
            // state.data = null   
        }, 
        [fetchTypes.fulfilled]: (state, action) => {
            state.status = 'loaded'
            // debugger  
            state.data = action.payload 
            // debugger  
        }, 
        [fetchTypes.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 

    }
})

export const typesReducer = typesSlice.reducer