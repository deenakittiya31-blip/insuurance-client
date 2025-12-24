import React from 'react'

const Button = ({ name, style }) => {
    return (
        <button className={`${style} border rounded-md py-1 px-3 font-medium text-lg`}>{name}</button>
    )
}

export default Button