import React from 'react'

const TextInputAuth = ({ width, name, type, placeholder, onChange, value, error }) => {
    return (
        <div className='flex flex-col w-full'>
            <label htmlFor={name} className='mb-2 font-epilogue font-semibold text-text-primary text-sm capitalize'>
                {name}
            </label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`${width} rounded-md bg-white pl-3 py-2 focus:outline-none`}
            />
            {error && <span className={`w-sm text-red-600 text-xs mt-1`}>{error}</span>}
        </div>
    )
}

export default TextInputAuth