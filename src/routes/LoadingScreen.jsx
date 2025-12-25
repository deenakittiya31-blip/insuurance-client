import React from 'react'
import { RiLoader4Fill } from 'react-icons/ri'

const LoadingScreen = () => {
    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <RiLoader4Fill className='text-main size-10 animate-spin mb-3' />
        </div>
    )
}

export default LoadingScreen