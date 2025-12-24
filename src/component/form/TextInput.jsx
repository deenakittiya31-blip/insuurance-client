import React from 'react'

const TextInput = ({ width, name, title, type, placeholder, onChange, value, error }) => {
    return (
        <div className='flex flex-col w-full'>
            <label htmlFor={name} className='mb-2 font-epilogue font-semibold text-black text-sm capitalize'>
                {title}
            </label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`${width} input font-prompt pr-5`}
            />
            {error && <span className={`w-sm font-epilogue text-red-600 text-xs mt-1`}>{error}</span>}
        </div>
    )
}

export default TextInput