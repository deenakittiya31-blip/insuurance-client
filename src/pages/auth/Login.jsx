import React, { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../component/form/Button'
import liff from '@line/liff'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import TextInputAuth from '../../component/form/TextInputAuth'

const Login = () => {
    const actionLogin = useInsureAuth((s) => s.actionLogin)
    const actionLoginGoogle = useInsureAuth((s) => s.actionLoginGoogle)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        liff.init({ liffId: '2008686120-kHUafHAb' })
    }, [])

    const hdlLoginLine = () => {
        try {
            liff.login()
        } catch (err) {
            console.log(err.message)
        }
    }

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        actionLogin(form)
            .then(() => {
                navigate('/admin')
                toast.success('ล็อกอินสำเร็จ')
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
            })
    }

    const onSuccess = async (res) => {
        try {
            await actionLoginGoogle(res.credential)
            toast.success('เข้าสู่ระบบด้วย Google สำเร็จ')
            navigate('/admin')
        } catch (err) {
            console.log(err)
            toast.error('Google login ล้มเหลว')
        }
    }

    return (
        <div className='bg-[url(/bg.jpg)] bg-cover bg-center bg-no-repeat w-full h-screen flex flex-col justify-center items-center'>
            <div className='flex flex-col gap-3 justify-center items-center p-10 bg-white/30 backdrop-blur-lg border border-white/50 rounded-xl font-prompt'>
                <div className='w-full flex flex-col items-center gap-3'>
                    <h1 className='font-dm font-bold text-4xl text-text-primary'>เข้าสู่ระบบ</h1>
                    <h1 className='font-sb text-md text-text-primary'>กรุณาเข้าสู่ระบบก่อนเข้าใช้งาน</h1>
                </div>
                <form onSubmit={hdlSubmit} className='flex flex-col gap-5 items-center'>
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
                        placeholder='Enter password'
                        onChange={hdlOnChange}
                        width='w-70 md:w-sm'
                    />
                    <Button
                        name='เข้าสู่ระบบ'
                        style=' w-full bg-black text-white'
                    />
                </form>
                <div className='flex items-center gap-5 w-full text-neutral-400'>
                    <hr className='w-full' />
                    <span>or</span>
                    <hr className='w-full' />
                </div>
                <div className='w-full'>
                    <GoogleLogin
                        onSuccess={onSuccess}
                        onError={() => {
                            toast.error('Google login failed')
                        }}
                    />
                </div>
                <button onClick={hdlLoginLine} className='w-full bg-green-500 rounded-sm py-1 px-3 text-white text-base'>เข้าสู่ระบบผ่าน Line</button>
                <Link to='/register' className='text-sm hover:underline underline-offset-4'>Create Account</Link>
            </div>
        </div>
    )
}

export default Login