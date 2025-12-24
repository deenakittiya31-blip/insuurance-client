import React from 'react'
import useInsureAuth from '../../store/auth-store'
import { FaCar, FaChartLine, FaHandHoldingMedical } from "react-icons/fa6";
import { IoIosArrowDown, IoMdArrowDropdown } from 'react-icons/io';
import { TbLogout2, TbLogin2 } from "react-icons/tb";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Logo from '../../assets/logo.svg'

const SideBar = () => {
    const token = useInsureAuth((s) => s.token)
    const navigate = useNavigate();
    const actionLogOut = useInsureAuth((s) => s.actionLogout)
    const [car, setCar] = useState(false);
    const [insur, setInsur] = useState(false);

    const hdlState = (state) => {
        if (state === 'car') {
            setCar(!car)
        } else if (state === 'insur') {
            setInsur(!insur)
        }
    }

    const hdlLogout = (e) => {
        actionLogOut()
        navigate('/')
        toast.success('ออกจากระบบสำเร็จ')
    }
    return (
        <aside className='lg:w-60 py-3 pl-5 flex flex-col font-prompt'>
            <div className='flex items-center gap-5 mb-10'>
                <img src={Logo} className='w-10 rounded-md' />
                <h1 className='font-bold text-3xl text-main'>DEENA</h1>
            </div>
            <div className='overflow-y-auto h-screen flex flex-col'>
                <div className='flex-1'>
                    <div className='flex flex-col gap-3'>
                        <div className='px-5 py-2 rounded-full group hover:bg-main transition duration-300'>
                            <div className='flex justify-between items-center '>
                                <h3 className='font-bold text-2xl text-text-primary group-hover:text-white group-[.active]:text-white'>ประกันภัย</h3>
                                <IoMdArrowDropdown onClick={() => hdlState('insur')} className={`fill-text-primary group-[.active]:fill-white group-hover:fill-white transition duration-300 ${insur ? 'rotate-180' : 'rotate-0'}`} />
                            </div>
                        </div>
                        {
                            insur && (
                                <div className='flex flex-col gap-3'>
                                    <NavLink
                                        to='/admin/insurcompany'
                                        className={({ isActive }) =>
                                            `flex justify-between items-center px-10 py-2 rounded-full transition duration-300 group
                                        ${isActive ? 'bg-main active' : 'hover:bg-main'}`
                                        }>
                                        <h3 className='hidden md:block font-medium text-text-primary group-hover:text-white group-[.active]:text-white'>บริษัทประกัน</h3>
                                    </NavLink>
                                    <NavLink
                                        to='/admin/insurtypes'
                                        className={({ isActive }) =>
                                            `flex justify-between items-center px-10 py-2 rounded-full transition duration-300 group
                                        ${isActive ? 'bg-main active' : 'hover:bg-main'}`
                                        }>
                                        <h3 className='hidden md:block font-medium text-text-primary group-hover:text-white group-[.active]:text-white'>ประเภทประกัน</h3>
                                    </NavLink>
                                    <NavLink
                                        to='/admin/insurpremuim'
                                        className={({ isActive }) =>
                                            `flex justify-between items-center px-10 py-2 rounded-full transition duration-300 group
                                        ${isActive ? 'bg-main active' : 'hover:bg-main'}`
                                        }>
                                        <h3 className='hidden md:block font-medium text-text-primary group-hover:text-white group-[.active]:text-white'>เบี้ยประกัน</h3>
                                    </NavLink>
                                    <NavLink
                                        to='/admin/package'
                                        className={({ isActive }) =>
                                            `flex justify-between items-center px-10 py-2 rounded-full transition duration-300 group
                                        ${isActive ? 'bg-main active' : 'hover:bg-main'}`
                                        }>
                                        <h3 className='hidden md:block font-medium text-text-primary group-hover:text-white group-[.active]:text-white'>แพ็คเก็จ</h3>
                                    </NavLink>
                                </div>
                            )
                        }
                        <div className='px-5 py-2 rounded-full group transition duration-300 hover:bg-bg-main'>
                            <div className='flex justify-between items-center '>
                                <div className='flex items-center gap-8'>
                                    <FaCar className='text-neutral-600 group-hover:text-primary group-[.active]:text-primary' />
                                    <h3 className='hidden md:block font-medium text-text-primary group-hover:text-primary group-[.active]:text-primary'>รถยนต์</h3>
                                </div>
                                <IoIosArrowDown onClick={() => hdlState('car')} className={`fill-neutral-600 group-[.active]:fill-primary group-hover:fill-primary transition duration-300 ${car ? 'rotate-180' : 'rotate-0'}`} />
                            </div>
                        </div>
                        {
                            car && (
                                <div >
                                    <NavLink
                                        to='/admin/caryear&cartype'
                                        className={({ isActive }) =>
                                            `flex justify-between items-center px-10 py-2 rounded-full transition duration-300 ease-in-out group
                                        ${isActive ? 'bg-blue-50/70 active' : 'hover:bg-blue-50/70'}`
                                        }>
                                        <h3 className='hidden md:block font-medium text-text-primary group-hover:text-primary group-[.active]:text-primary'>ปีรถ / ประเภทรถ</h3>
                                    </NavLink>
                                    <NavLink
                                        to='/admin/usagecar'
                                        className={({ isActive }) =>
                                            `flex justify-between items-center px-10 py-2 rounded-full transition duration-300 ease-in-out group
                                        ${isActive ? 'bg-blue-50/70 active' : 'hover:bg-blue-50/70'}`
                                        }>
                                        <h3 className='hidden md:block font-medium text-text-primary group-hover:text-primary group-[.active]:text-primary'>การใช้งานรถ</h3>
                                    </NavLink>
                                    <NavLink
                                        to='/admin/groupcar'
                                        className={({ isActive }) =>
                                            `flex justify-between items-center px-10 py-2 rounded-full transition duration-300 ease-in-out group
                                        ${isActive ? 'bg-blue-50/70 active' : 'hover:bg-blue-50/70'}`
                                        }>
                                        <h3 className='hidden md:block font-medium text-text-primary group-hover:text-primary group-[.active]:text-primary'>กลุ่มรถ</h3>
                                    </NavLink>
                                    <NavLink
                                        to='/admin/compulsorycar'
                                        className={({ isActive }) =>
                                            `flex justify-between items-center px-10 py-2 rounded-full transition duration-300 ease-in-out group
                                        ${isActive ? 'bg-blue-50/70 active' : 'hover:bg-blue-50/70'}`
                                        }>
                                        <h3 className='hidden md:block font-medium text-text-primary group-hover:text-primary group-[.active]:text-primary'>พรบ.รถ</h3>
                                    </NavLink>
                                    <NavLink
                                        to='/admin/carmodel'
                                        className={({ isActive }) =>
                                            `flex justify-between items-center px-10 py-2 rounded-full transition duration-300 ease-in-out group
                                        ${isActive ? 'bg-blue-50/70 active' : 'hover:bg-blue-50/70'}`
                                        }>
                                        <h3 className='hidden md:block font-medium text-text-primary group-hover:text-primary group-[.active]:text-primary'>รุ่นรถ</h3>
                                    </NavLink>
                                    <NavLink
                                        to='/admin/carbrand'
                                        className={({ isActive }) =>
                                            `flex justify-between items-center px-10 py-2 rounded-full transition duration-300 group
                                        ${isActive ? 'bg-blue-50/70 active' : 'hover:bg-blue-50/70'}`
                                        }>
                                        <h3 className='hidden md:block font-medium text-text-primary group-hover:text-primary group-[.active]:text-primary'>ยี่ห้อรถ</h3>
                                    </NavLink>
                                </div>
                            )
                        }
                    </div>

                </div>
                {
                    token
                        ? (
                            <button className='flex gap-8 items-center px-5 py-2 group rounded-md hover:bg-blue-50/70' onClick={() => hdlLogout()}>
                                <TbLogout2 size={25} className='text-neutral-600 group-hover:text-primary' />
                                <h3 className='hidden lg:block font-medium text-black group-hover:text-primary'>ออกจากระบบ</h3>
                            </button>
                        )

                        : (
                            <Link to='/' className='flex gap-8 items-center group px-5 py-2 rounded-md group hover:bg-blue-50/70'>
                                <TbLogin2 size={25} className='text-neutral-600 group-hover:text-primary' />
                                <h3 className='hidden lg:block font-medium text-black group-hover:text-primary'>เข้าสู่ระบบ</h3>
                            </Link>
                        )
                }
            </div>
        </aside >
    )
}

export default SideBar