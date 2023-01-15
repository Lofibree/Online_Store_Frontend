import axios from '../../axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';




// export const fetchCreateBasketDevice = createAsyncThunk('basket/fetchCreateBasketDevice', async (id) => {
//     const {data} = await axios.post(`/basket/device/${id}`)
//     // console.log(data)
//     debugger
//     return data
// })
// export const fetchBasketDevices = createAsyncThunk('basket/fetchBasketDevices', async () => {
//     const {data} = await axios.get(`/basket`)
//     // console.log(data)
//     debugger
//     return data
// })





const initialState = {
    data: null,
    status: 'loading'
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: {
        
    }
})

export const basketReducer = basketSlice.reducer