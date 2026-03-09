import React from 'react'

const Input = ({ width, title, name, type, placeholder, onChange, value, error }) => {
    return (
        <div className='flex flex-col w-full'>
            <label htmlFor={name} className='mb-1 font-medium text-sm capitalize'>
                {title}
            </label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`${width} rounded-full bg-white pl-3 py-2 text-sm focus:outline-none`}
            />
            {error && <span className={`w-full text-red-600 text-xs mt-1`}>{error}</span>}
        </div>
    )
}

export default Input