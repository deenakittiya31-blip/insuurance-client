import React from 'react'

const Input = ({ width, name, type, placeholder, onChange, value }) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className={`${width} input font-prompt pr-5 focus:outline-none`}
        />
    )
}

export default Input