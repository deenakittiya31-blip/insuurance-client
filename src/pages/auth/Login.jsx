import React, { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import liff from '@line/liff'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import TextInputAuth from '../../component/form/TextInputAuth'
import ReCAPTCHA from 'react-google-recaptcha'
import { getLoginWith } from '../../service/auth'

const Login = () => {
    const { actionLogin, actionLoginGoogle, actionCurrentUser } = useInsureAuth();
    const navigate = useNavigate()
    const [loginWith, setLoginWith] = useState([])
    const keyReCAPTCHA = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    const [capVal, setCapVal] = useState(null)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        getStatusLogin()
        liff.init({ liffId: '2008686120-kHUafHAb' })
    }, [])

    const getStatusLogin = async () => {
        try {
            const res = await getLoginWith()
            setLoginWith(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const googleLogin = loginWith.find(i => i.login_with === 'Google')
    const lineLogin = loginWith.find(i => i.login_with === 'Line')

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

        if (!capVal) {
            return toast.error('กรุณายืนยัน reCAPTCHA')
        }
        try {
            await actionLogin({
                ...form,
                captcha: capVal
            })
            const currentUser = await actionCurrentUser()
            toast.success('ล็อกอินสำเร็จ')

            if (currentUser.role === 'admin') {
                navigate('/admin', { replace: true })
            } else {
                navigate('/forbidden', { replace: true })
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed')
        }
    }

    const onSuccess = async (res) => {
        try {
            await actionLoginGoogle(res.credential)

            const currentUser = await actionCurrentUser()

            if (!currentUser) {
                toast.error('ไม่สามารถดึงข้อมูลผู้ใช้ได้')
                return
            }

            toast.success('เข้าสู่ระบบด้วย Google สำเร็จ')
            console.log('User role:', currentUser.role)

            if (currentUser.role === 'admin') {
                navigate('/admin', { replace: true })
            } else {
                navigate('/forbidden', { replace: true })
            }
        } catch (err) {
            console.log(err)
            toast.error('Google login ล้มเหลว')
        }
    }

    return (
        <div className='bg-[url(/bg.jpg)] bg-cover bg-center bg-no-repeat w-full h-screen flex flex-col justify-center items-center'>
            <div className='flex flex-col gap-3 justify-center items-center p-7 bg-white/30 backdrop-blur-lg border border-white/50 rounded-xl font-prompt'>
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
                    <ReCAPTCHA
                        sitekey={keyReCAPTCHA}
                        onChange={(val) => setCapVal(val)}
                    />
                    <button type='submit' className="btn btn-neutral w-full">เข้าสู่ระบบ</button>
                </form>
                <div className='flex items-center gap-5 w-full text-neutral-400'>
                    <hr className='w-full' />
                    <span>or</span>
                    <hr className='w-full' />
                </div>
                {
                    googleLogin?.status && (
                        <div className='w-full'>
                            <GoogleLogin
                                onSuccess={onSuccess}
                                onError={() => {
                                    toast.error('Google login failed')
                                }}
                                width="100%"
                            />
                        </div>
                    )
                }
                {
                    lineLogin?.status && (
                        <button onClick={hdlLoginLine} className="btn bg-green-500 text-white w-full">เข้าสู่ระบบผ่าน Line</button>
                    )
                }
                <Link to='/register' className='text-sm hover:underline underline-offset-4'>Create Account</Link>
            </div>
        </div>
    )
}

export default Login