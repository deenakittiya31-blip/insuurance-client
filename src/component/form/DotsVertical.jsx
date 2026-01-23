import { useEffect, useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { Link } from 'react-router-dom'
import { LuSend } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const DotsVertical = ({ onDelete, q_id }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside  ปิดเมนูเมื่อคลิกนอกเมนู
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
    return (
        <div className='flex justify-center'>
            <div className='relative inline-block'>
                <button className="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-[#D2D5DF]/25" ref={trigger}
                    onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <IoMdMore size={20} />
                </button>
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                    className={`absolute right-12 -top-3  w-15 overflow-hidden rounded-lg shadow-sm bg-white ${dropdownOpen ? 'block' : 'hidden'}`}
                >
                    <button className='w-full flex justify-center py-2 text-blue-600 hover:bg-[#D2D5DF]/25' onClick={onDelete}>
                        <LuSend size={15} />
                    </button>
                    <hr className='h-px bg-gray-200 border-0'></hr>
                    <Link to={`/admin/compare-detail/${q_id}`}>
                        <button className='w-full flex justify-center py-2 text-warning hover:bg-[#D2D5DF]/25'>
                            <FiEdit3 size={15} />
                        </button>
                    </Link>
                    <hr className='h-px bg-gray-200 border-0'></hr>
                    <button className='w-full flex justify-center py-2 text-red-600 hover:bg-[#D2D5DF]/25' onClick={onDelete}>
                        <RiDeleteBin5Line size={15} />
                    </button>
                </div>
            </div>
        </div >
    )
}
export default DotsVertical