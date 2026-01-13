import React from 'react'

const TextInput = ({ width, name, title, type, placeholder, onChange, value, readOnly = false, font }) => {
    return (
        <div className={`flex flex-col w-full ${font || 'font-prompt'} text-text-primary`}>
            <label htmlFor={name} className='mb-2 font-semibold text-sm capitalize'>
                {title}
            </label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`${width} input pr-5`}
                readOnly={readOnly}
            />
        </div>
    )
}

export default TextInput