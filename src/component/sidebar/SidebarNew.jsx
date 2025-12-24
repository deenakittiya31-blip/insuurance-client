import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg'
import { adminCar, adminInsur } from '../../link/link';

const SidebarNew = () => {

    return (
        <aside className='w-auto py-3 pl-5 flex flex-col font-prompt'>
            <div className='flex items-center gap-5 mb-10'>
                <img src={Logo} className='w-10 rounded-md' />
                <h1 className='font-bold text-3xl text-main'>DEENA</h1>
            </div>
            <div className='overflow-y-auto h-screen flex flex-col'>
                <div className='flex flex-1 flex-col gap-y-10 text-text-primary'>
                    {/* หัวข้อหลัก 1 */}
                    <div>
                        <h1 className='font-semibold mb-5 pl-7 lg:text-lg'>ประกันภัย</h1>
                        <div className='flex flex-col gap-5'>
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
                    </div>
                    {/* หัวข้อหลัก 2 */}
                    <div>
                        <h1 className='font-semibold mb-5 pl-7 lg:text-lg'>รถยนต์</h1>
                        <div className='flex flex-col gap-5'>
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
                    </div>
                </div>

            </div>
        </aside>
    )
}

export default SidebarNew