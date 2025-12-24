import React from 'react'

const FloatingLabel = ({ text, placeholder }) => {
    return (
        <label className="floating-label">
            <span>{text}</span>
            <input type="text" placeholder={placeholder} className="font-prompt input input-md" />
        </label>
    )
}

export default FloatingLabel