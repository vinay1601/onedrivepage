import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { hideFeedback } from '@/store/feedbackSlice'

const FeedBackAlert = () => {
    const dispatch = useDispatch()
    const { message, type, visible } = useSelector(state => state.feedback)

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                dispatch(hideFeedback())
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [visible, dispatch])

    if (!visible) return null
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-400';
    return (
        <>
            <div className={`${bgColor} text-white px-10 py-2 rounded fixed top-10 left-1/2 transform -translate-x-1/2 z-50 shadow-lg`}>
                {message}
            </div>
        </>
    )
}

export default FeedBackAlert
