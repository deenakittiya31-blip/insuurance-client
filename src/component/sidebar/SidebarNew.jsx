import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { BsLayoutTextSidebar } from "react-icons/bs";
import { RiSettings4Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { LuBrain } from "react-icons/lu";
import { adminCar, adminInsur, adminSetting } from '../../link/link';
import toast from 'react-hot-toast';
import useInsureAuth from '../../store/auth-store';
import { TbLogout } from "react-icons/tb";

const SidebarNew = () => {
    const { token, actionLogout } = useInsureAuth();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false)
    const [insure, setInsur] = useState(false)
    const [car, setCar] = useState(false)

    const hdlLogout = () => {
        actionLogout()
        navigate('/')
        toast.success('ออกจากระบบสำเร็จ')
    }

    return (
        <aside
            className={`
                relative
                transition-all duration-500 ease-in-out
                ${collapsed ? 'w-10' : 'w-56'}
                flex flex-col font-prompt
            `}
        >
            <div className='flex justify-end px-5 mb-3'>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="transition-transform duration-300"
                >
                    <BsLayoutTextSidebar className={`size-5 text-text-primary ${collapsed ? 'rotate-180' : ''}`} />
                </button>
            </div>

            <div className={`
                flex flex-col flex-1 gap-y-5 overflow-auto
                transition-all duration-500 ease-in-out
                ${collapsed ? 'opacity-0 -translate-x-50 pointer-events-none' : 'opacity-100 translate-x-0'}
            `}>
                <div className='flex flex-col flex-1 gap-y-5 text-text-primary'>
                    {/* หัวข้อหลัก 1 */}
                    <div>
                        <h1 className='font-semibold mb-5 pl-7 lg:text-lg'>ตั้งค่า</h1>
                        <div className='flex flex-col gap-4'>
                            {
                                adminSetting.map((i, idx) => (
                                    <NavLink
                                        to={i.link}
                                        key={idx}
                                        end
                                        className={({ isActive }) =>
                                            `flex gap-5 items-center text-sm transition duration-300 ease-in-out group
                                        ${isActive ? 'text-main active' : 'hover:text-main'}`
                                        }
                                    >
                                        <button className='group-[.active]:w-2 h-2 group-[.active]:bg-main rounded-full pr-2'></button>
                                        <div className='w-full flex items-center gap-3'>
                                            {i.icon}
                                            <p className='group-[.active]:text-current'>{i.title}</p>
                                        </div>

                                    </NavLink>
                                ))
                            }
                        </div>
                    </div>
                    {/* หัวข้อหลัก 2 */}
                    <div>
                        <div className='flex justify-between items-center pl-7 pr-3 mb-5'>
                            <h1 className='font-semibold lg:text-lg'>ประกันภัย</h1>
                            <IoIosArrowDown onClick={() => setInsur(!insure)} />
                        </div>
                        {
                            insure && (
                                <div className='flex flex-col gap-4'>
                                    {
                                        adminInsur.map((i, idx) => (
                                            <NavLink
                                                to={i.link}
                                                key={idx}
                                                end
                                                className={({ isActive }) =>
                                                    `flex gap-5 items-center text-sm transition duration-300 ease-in-out group
                                        ${isActive ? 'text-main active' : 'hover:text-main'}`
                                                }
                                            >
                                                <button className='group-[.active]:w-2 h-2 group-[.active]:bg-main rounded-full pr-2'></button>
                                                <div className='w-full flex items-center gap-3'>
                                                    {i.icon}
                                                    <p className='group-[.active]:text-current'>{i.title}</p>
                                                </div>

                                            </NavLink>
                                        ))
                                    }
                                </div>
                            )
                        }

                    </div>
                    {/* หัวข้อหลัก 3 */}
                    <div>
                        <div className='flex justify-between items-center pl-7 pr-3 mb-5'>
                            <h1 className='font-semibold lg:text-lg'>รถยนต์</h1>
                            <IoIosArrowDown onClick={() => setCar(!car)} />
                        </div>
                        {
                            car && (
                                <div className='flex flex-col gap-4'>
                                    {
                                        adminCar.map((i, idx) => (
                                            <NavLink
                                                to={i.link}
                                                key={idx}
                                                className={({ isActive }) =>
                                                    `flex gap-5 items-center text-sm transition duration-300 ease-in-out group
                                        ${isActive ? 'text-main active' : 'hover:text-main'}`
                                                }
                                            >
                                                <button className='group-[.active]:w-2 h-2 group-[.active]:bg-main rounded-full pr-2'></button>
                                                <div className='w-full flex items-center gap-3'>
                                                    {i.icon}
                                                    <p className='group-[.active]:text-current'>{i.title}</p>
                                                </div>

                                            </NavLink>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='flex pr-5'>
                    {
                        token
                            ? (
                                <button onClick={hdlLogout} className='btn bg-main w-full rounded-md text-white hover:bg-second'>
                                    <TbLogout className='size-5' /> ออกจากระบบ
                                </button>
                            )
                            : (
                                <Link to='/' className='flex gap-5 items-center px-5 py-2 group rounded-full text-text-primary transition duration-300 ease-in-out hover:bg-main'>
                                    <TbLogin2 size={25} className='group-hover:text-white' />
                                    <h3 className='font-semibold lg:text-lg! group-hover:text-white'>เข้าสู่ระบบ</h3>
                                </Link>
                            )
                    }
                </div>
            </div>
        </aside >
    )
}

export default SidebarNew