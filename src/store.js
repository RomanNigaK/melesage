import { configureStore } from "@reduxjs/toolkit";
import appReduser from './redux/appSlice'

export const store = configureStore({
    reducer:{
        app: appReduser,
    },
})