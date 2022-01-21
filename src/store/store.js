import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./slices/foodSlice"
import counterReducer from './slices/counterSlice'
import cookReducer from './slices/cookSlice'


export default configureStore({
    reducer:{
        food : foodReducer,
        counter : counterReducer,
        cook: cookReducer
    },
    devTools :true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,})
})