import { redirect } from 'next/dist/server/api-utils'
import React from 'react'

const Auth = (context) => {

    const { req } = context
    const token = req.headers.cookie?.split('; ').find(c => c.startsWith('token='))?.split('=')[1]
    if (token !== 'addcookiesforadmin') {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
    return { props: {} }
}

export default Auth
