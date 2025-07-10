import { createSlice } from '@reduxjs/toolkit'

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        message: '',
        type: '',
        visible: false
    },
    reducers: {
        showFeedback: (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
            state.visible = true
        },
        hideFeedback: (state) => {
            state.visible = false
            state.message = ''
            state.type = ''
        },
    },
});

export const { showFeedback, hideFeedback } = feedbackSlice.actions
export default feedbackSlice.reducer
