import React from 'react'

const NameTable = ({ icon, name }) => {
    return (
        <div className='flex gap-3 font-prompt font-semibold text-text-primary tracking-wide mb-5'>
            <span>{icon}</span>
            <p>{name}</p>
        </div>
    )
}

export default NameTable