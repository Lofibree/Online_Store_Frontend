import axios from '../../axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';






export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
    const {data} = await axios.get('/brand')
    // console.log(data)
    // debugger
    return data
})
export const fetchCreateBrand = createAsyncThunk('brands/fetchCreateBrand', async (formData) => {
    const {data} = await axios.post('/brand', formData)
    // console.log(data)
    // debugger
    return data
})
export const fetchUpdateBrand = createAsyncThunk('brands/fetchUpdateBrand', async (formData) => {
    const {data} = await axios.patch(`/brand/${formData.id}`, formData)
    // console.log(data)
    // debugger
    return data
})
export const fetchDeleteBrand = createAsyncThunk('brands/fetchDeleteBrand', async (id) => {
    const {data} = await axios.delete(`/brand/${id}`)
    // console.log(data)
    // debugger
    return data
})



const initialState = {
    data: [{ name: 'Nokia', id: 1 }, { name: 'iPhone', id: 2 }],
    status: 'loading'
}

const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: {
        // create
        [fetchCreateBrand.pending]: (state, action) => {
            state.status = 'loading'
            // state.data = [{ name: 'Nokia', id: 1 }, { name: 'iPhone', id: 2 }]   
        }, 
        [fetchCreateBrand.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = [...state.data, action.payload]
            // debugger  
        }, 
        [fetchCreateBrand.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 
        // delete
        [fetchDeleteBrand.pending]: (state, action) => {
            state.status = 'loading'
            // state.data = [{ name: 'Nokia', id: 1 }, { name: 'iPhone', id: 2 }]   
        }, 
        [fetchDeleteBrand.fulfilled]: (state, action) => {
            state.status = 'loaded'
            // state.data = [...state.data, action.payload]
            // debugger  
        }, 
        [fetchDeleteBrand.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 
        // getAll
        [fetchBrands.pending]: (state, action) => {
            state.status = 'loading'
            // state.data = null   
        }, 
        [fetchBrands.fulfilled]: (state, action) => {
            state.status = 'loaded'
            // debugger  
            state.data = action.payload 
            // debugger  
        }, 
        [fetchBrands.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 

    }
})

export const brandsReducer = brandsSlice.reducer