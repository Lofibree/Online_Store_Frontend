import {configureStore} from '@reduxjs/toolkit'
import { devicesReducer } from './slices/devices'
import { authReducer } from './slices/auth'
import { typesReducer } from './slices/types'
import { brandsReducer } from './slices/brands'

const store = configureStore({
    reducer: {
        auth: authReducer,
        devices: devicesReducer,
        types: typesReducer,
        brands: brandsReducer
    }
})

export default store