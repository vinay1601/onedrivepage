import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import feedbackReducer from "./feedbackSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer,
    },
});
