import React from 'react'

const TextInput = ({ width, name, title, type, placeholder, onChange, value }) => {
    return (
        <div className='flex flex-col w-full font-prompt text-text-primary'>
            <label htmlFor={name} className='mb-2 font-prompt font-semibold text-sm capitalize'>
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
        </div>
    )
}

export default TextInput