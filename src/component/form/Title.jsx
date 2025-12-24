import React from 'react'

const Title = ({ title, subtitle }) => {
    return (
        <div className='font-prompt text-text-primary'>
            <h1 className='font-bold text-3xl'>{title}</h1>
            <p className='font-light'>{subtitle}</p>
        </div>
    )
}

export default Title