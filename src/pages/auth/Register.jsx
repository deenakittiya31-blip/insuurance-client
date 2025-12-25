import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../component/form/Button'
import toast from 'react-hot-toast'
import useInsureAuth from '../../store/auth-store'
import TextInputAuth from '../../component/form/TextInputAuth'


const Register = () => {
    const actionRehister = useInsureAuth((s) => s.actionRegister)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    })

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        actionRehister(form)
            .then((res) => {
                navigate('/')
                toast.success(res.data.msg)
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
            })
    }
    return (
        <div className='bg-[url(/bg.jpg)] bg-cover bg-center bg-no-repeat w-full h-screen flex flex-col justify-center items-center'>
            <div className='flex flex-col gap-3 justify-center items-center p-10 bg-white/30 backdrop-blur-lg border border-white/50 rounded-xl font-prompt'>
                <div className='w-full flex flex-col items-center gap-3'>
                    <h1 className='font-dm font-bold text-2xl text-text-primary'>ลงทะเบียนสมาชิก</h1>
                    <h1 className='font-sb text-md text-text-primary'>กรุณากรอกข้อมูลให้ครบ</h1>
                </div>
                <form onSubmit={hdlSubmit} className='flex flex-col gap-5 items-center'>
                    <TextInputAuth
                        name='name'
                        type='text'
                        placeholder='Enter your name'
                        onChange={hdlOnChange}
                        width='w-70 md:w-sm'
                    />
                    <TextInputAuth
                        name='phone'
                        type='text'
                        placeholder='Enter your phone'
                        onChange={hdlOnChange}
                        wwidth='w-70 md:w-sm'
                    />
                    <TextInputAuth
                        name='email'
                        type='text'
                        placeholder='Enter your email'
                        onChange={hdlOnChange}
                        width='w-70 md:w-sm'
                    />
                    <TextInputAuth
                        name='password'
                        type='password'
                        placeholder='Enter your password'
                        onChange={hdlOnChange}
                        width='w-70 md:w-sm'
                    />
                    <Button
                        name='ลงทะเบียน'
                        style=' w-full bg-black text-white'
                    />
                </form>
                <Link to='/' className='font-epilogue text-sm hover:underline underline-offset-4 mt-5'>Login Account</Link>
            </div>
        </div>
    )
}

export default Register