import React from 'react'

const Input = ({ width, title, name, type, placeholder, onChange, value }) => {
    return (
        <div className='flex flex-col w-full'>
            <label htmlFor={name} className='mb-2 font-medium text-sm capitalize'>
                {title}
            </label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`${width} rounded-md bg-white pl-3 py-2 outline-main`}
            />
        </div>
    )
}

export default Input