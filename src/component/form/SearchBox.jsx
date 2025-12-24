import React from 'react'
import { IoSearch } from "react-icons/io5";


const SearchBox = ({ className, placeholder, onChange }) => {
    return (
        <div>
            <div className="flex items-center rounded-full bg-#f7f7f7 pl-3 outline-1 -outline-offset-1 outline-neutral-200 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-primary">
                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"><IoSearch className='text-[#d1d5dc]' /></div>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder={placeholder}
                    className={`block ${className}  grow py-1.5 pr-3 pl-2 text-base text-gray-900 placeholder:text-[#d1d5dc] focus:outline-none sm:text-sm/6`} />
            </div>
        </div>
    )
}

export default SearchBox