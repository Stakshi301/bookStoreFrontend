import {configureStore} from '@reduxjs/toolkit';
import bookSlice from './Slice';

export const Store=configureStore({
    reducer:{
        books:bookSlice
    }
})