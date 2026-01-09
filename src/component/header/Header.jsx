import React, { useEffect } from 'react'
import { TbLogout } from "react-icons/tb";
import useInsureAuth from '../../store/auth-store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AiFillSmile } from "react-icons/ai";
import { createCompare } from '../../service/compare';
import { useState } from 'react';
import ModalQuot from '../modal/ModalCompare';
import useActionStore from '../../store/action-store';

const initialState = {
    to_name: '',
    details: '',
    car_brand_id: '',
    car_model_id: '',
    car_year_id: '',
    car_usage_id: '',
}

const Header = () => {
    const token = useInsureAuth((s) => s.token)
    const user = useInsureAuth((s) => s.user)
    const navigate = useNavigate();
    const [form, setForm] = useState(initialState)
    const actionLogOut = useInsureAuth((s) => s.actionLogout)
    const { getCarModelSelect, carmodel } = useActionStore();

    const hdlLogout = () => {
        actionLogOut()
        navigate('/')
        toast.success('ออกจากระบบสำเร็จ')
    }

    const hdlOnChange = async (e) => {
        const { name, value } = e.target

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
        document.getElementById('my_modal_2').close()
    }

    const hldOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...form,
                offer: user.name
            };

            const res = await createCompare(token, payload)
            document.getElementById('my_modal_2').close()
            setForm(initialState)
            toast.success('สร้างใบเสนอราคาเรียบร้อย')

            navigate(`/admin/quotaion/${res.data.q_id}`)
        } catch (err) {
            console.log(err)
            toast.error('สร้างใบเสนอราคาไม่สำเร็จ')
        }
    }

    return (
        <header className='flex justify-between items-center py-3 font-prompt'>
            <h1 className='flex-1 font-semibold text-2xl text-text-primary'>ยินดีต้อนรับ <span className='capitalize'>{user?.name} !</span></h1>
            <div className='flex gap-5 items-center'>
                <div className='flex gap-3 items-center'>
                    <div className='flex justify-center items-center rounded-full border border-main w-10 h-10 overflow-hidden'>
                        {
                            user?.image
                                ? <img src={user.image} className='object-cover' />
                                : <AiFillSmile className='fill-main size-6' />
                        }

                    </div>
                    <div>
                        <p className='text-text-primary text-sm font-semibold capitalize'>{user?.name}</p>
                        <p className='text-xs text-border'>{user?.role}</p>
                    </div>
                </div>
                {/* สร้างเลขใบเสนอราคา */}
                <ModalQuot
                    form={form}
                    onChange={hdlOnChange}
                    carmodel={carmodel}
                    onClose={hdlOnClose}
                    onSubmit={hldOnSubmit}
                />
                <div>
                    {
                        token
                            ? (
                                <button onClick={hdlLogout} className='btn rounded-md'>
                                    <TbLogout className='size-5' />
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
        </header >
    )
}

export default Header