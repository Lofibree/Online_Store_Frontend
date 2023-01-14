import axios from '../../axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';




export const fetchDevices = createAsyncThunk('devices/fetchDevices', async () => {
    const {data} = await axios.get('/device')
    // console.log(data)
    // debugger
    return data
})
export const fetchOneDevice = createAsyncThunk('devices/fetchOneDevice', async (id) => {
    const {data} = await axios.get(`/device/${id}`)
    // console.log(data)
    // debugger
    return data
})
export const fetchCreateDevice = createAsyncThunk('devices/fetchCreateDevice', async (formData) => {
    const {data} = await axios.post('/device', formData)
    // console.log(data)
    // debugger
    return data
})
export const fetchUpdateDevice = createAsyncThunk('devices/fetchUpdateDevice', async (form) => {
    // debugger
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('price', form.price)
    formData.append('typeId', form.typeId)
    formData.append('brandId', form.brandId)
    formData.append('info', JSON.stringify(form.info))
    formData.append('img', form.img)
    const { data } = await axios.patch(`/device/${form.id}`, formData)
    // console.log(data)
    // debugger
    return data
})
export const fetchDeleteDevice = createAsyncThunk('devices/fetchDeleteDevice', async (id) => {
    const {data} = await axios.delete(`/device/${id}`)
    // console.log(data)
    // debugger
    return data
})
export const fetchDeleteDeviceInfo = createAsyncThunk('devices/fetchDeleteDeviceInfo', async (id) => {
    const {data} = await axios.delete(`/device/info/${id}`)
    // console.log(data)
    // debugger
    return data
})




const initialState = {
    data: null,
    status: 'loading'
}

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {},
    extraReducers: {
        // getAll
        [fetchDevices.pending]: (state, action) => {
            state.status = 'loading'
        }, 
        [fetchDevices.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload.rows 
            // debugger  
        }, 
        [fetchDevices.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 
        // getOne
        [fetchOneDevice.pending]: (state, action) => {
            state.status = 'loading'
        }, 
        [fetchOneDevice.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = [action.payload]  
        }, 
        [fetchOneDevice.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 
        // create
        [fetchCreateDevice.pending]: (state, action) => {
            state.status = 'loading'
            state.data = null   
        }, 
        [fetchCreateDevice.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload 
            // debugger  
        }, 
        [fetchCreateDevice.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 
        // delete
        [fetchDeleteDevice.pending]: (state, action) => {
            state.status = 'loading'
            state.data = null   
        }, 
        [fetchDeleteDevice.fulfilled]: (state, action) => {
            state.status = 'loaded'
        }, 
        [fetchDeleteDevice.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null   
        }, 

    }
})

export const devicesReducer = devicesSlice.reducer