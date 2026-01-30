import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { BsLayoutTextSidebar, BsPinAngle } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { adminCar, adminInsur, adminSetting } from '../../utils/link';
import toast from 'react-hot-toast';
import useInsureAuth from '../../store/auth-store';
import { TbLogout } from "react-icons/tb";
import { IoDocumentAttachOutline } from "react-icons/io5";
import ModalCompare from '../modal/ModalCompare';
import ModalKeyInCompare from '../modal/modalKeyInCompare';
import useActionStore from '../../store/action-store';
import { createCompare } from '../../service/compare';
import { GoPeople } from "react-icons/go";

const initialState = {
    to_name: '',
    details: '',
    car_brand_id: '',
    car_model_id: '',
    car_year_id: '',
    car_usage_id: '',
    sub_car_model: ''
}

const SidebarNew = () => {
    const { token, actionLogout } = useInsureAuth();
    const user = useInsureAuth((s) => s.user)
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false)
    const [insure, setInsur] = useState(false)
    const [car, setCar] = useState(false)
    const [form, setForm] = useState(initialState)
    const { getCarModelSelect } = useActionStore();

    const hdlLogout = () => {
        actionLogout()
        navigate('/')
        toast.success('ออกจากระบบสำเร็จ')
    }

    const hdlOnChange = async (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const hdlSelectChange = async (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'car_brand_id' && { car_model_id: '' })
        }))

        if (name === 'car_brand_id') {
            await getCarModelSelect(value)
        }
    }


    const hdlOnClose = () => {
        setForm(initialState)
        document.getElementById('modalcompare').close()
    }

    const hdlOnCloseKeyIn = () => {
        setForm(initialState)
        document.getElementById('modalcomparekeyin').close()
    }

    const hldOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...form,
                offer: user.name,
                import_by: 'ai'
            };

            const res = await createCompare(token, payload)
            document.getElementById('modalcompare').close()
            setForm(initialState)
            toast.success('สร้างใบเสนอราคาเรียบร้อย')

            navigate(`/admin/quotation/${res.data.q_id}`)
        } catch (err) {
            console.log(err)
            toast.error('สร้างใบเสนอราคาไม่สำเร็จ')
        }
    }

    const hldOnSubmitKeyIn = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...form,
                offer: user.name,
                import_by: 'key-in'
            };

            const res = await createCompare(token, payload)
            document.getElementById('modalcomparekeyin').close()
            setForm(initialState)
            toast.success('สร้างใบเสนอราคาเรียบร้อย')

            navigate(`/admin/compare/${res.data.q_id}`)
        } catch (err) {
            console.log(err)
            toast.error('สร้างใบเสนอราคาไม่สำเร็จ')
        }
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
                    <div>
                        <h1 className='font-semibold mb-5 pl-7 lg:text-lg'>ลูกค้า</h1>
                        <div className='flex flex-col gap-4'>
                            <NavLink
                                to='/admin'
                                end
                                className={({ isActive }) =>
                                    `flex gap-5 items-center text-sm transition duration-300 ease-in-out group
                                        ${isActive ? 'text-main active' : 'hover:text-main'}`
                                }
                            >
                                <button className='group-[.active]:w-2 h-2 group-[.active]:bg-main rounded-full pr-2'></button>
                                <div className='w-full flex items-center gap-3'>
                                    <GoPeople className='size-4' />
                                    <p className='group-[.active]:text-current'>รายชื่อลูกค้า</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-semibold mb-5 pl-7 lg:text-lg'>ใบเสนอราคา</h1>
                        <div className='flex flex-col gap-4'>
                            <NavLink
                                to='/admin/pin-compare'
                                end
                                className={({ isActive }) =>
                                    `flex gap-5 items-center text-sm transition duration-300 ease-in-out group
                                        ${isActive ? 'text-main active' : 'hover:text-main'}`
                                }
                            >
                                <button className='group-[.active]:w-2 h-2 group-[.active]:bg-main rounded-full pr-2'></button>
                                <div className='w-full flex items-center gap-3'>
                                    <BsPinAngle className='size-4' />
                                    <p className='group-[.active]:text-current'>เบี้ยประกันที่ใช่บ่อย</p>
                                </div>

                            </NavLink>
                            <NavLink
                                to='/admin/quotationlist'
                                end
                                className={({ isActive }) =>
                                    `flex gap-5 items-center text-sm transition duration-300 ease-in-out group
                                        ${isActive ? 'text-main active' : 'hover:text-main'}`
                                }
                            >
                                <button className='group-[.active]:w-2 h-2 group-[.active]:bg-main rounded-full pr-2'></button>
                                <div className='w-full flex items-center gap-3'>
                                    <IoDocumentAttachOutline className='size-4' />
                                    <p className='group-[.active]:text-current'>รายการใบเสนอราคา</p>
                                </div>

                            </NavLink>
                            <div className='flex gap-5 items-center text-sm transition duration-300 ease-in-out pl-7'>
                                <ModalCompare
                                    form={form}
                                    onChange={hdlOnChange}
                                    onChangeSelect={hdlSelectChange}
                                    onClose={hdlOnClose}
                                    onSubmit={hldOnSubmit}
                                    setForm={setForm}
                                />
                            </div>
                            <div className='flex gap-5 items-center text-sm transition duration-300 ease-in-out pl-7'>
                                <ModalKeyInCompare
                                    form={form}
                                    onChange={hdlOnChange}
                                    onChangeSelect={hdlSelectChange}
                                    onClose={hdlOnCloseKeyIn}
                                    onSubmit={hldOnSubmitKeyIn}
                                    setForm={setForm}
                                />
                            </div>
                        </div>
                    </div>
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