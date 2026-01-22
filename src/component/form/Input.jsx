import React from 'react'

const Input = ({ width, title, name, type, placeholder, onChange, value }) => {
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
        </div>
    )
}

export default Input