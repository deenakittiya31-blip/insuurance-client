import React, { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../component/form/Button'
import liff from '@line/liff'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import TextInputAuth from '../../component/form/TextInputAuth'
import ReCAPTCHA from 'react-google-recaptcha'

const Login = () => {
    const actionLogin = useInsureAuth((s) => s.actionLogin)
    const actionLoginGoogle = useInsureAuth((s) => s.actionLoginGoogle)
    const user = useInsureAuth((s) => s.user)
    const actionCurrentUser = useInsureAuth((s) => s.actionCurrentUser)
    const navigate = useNavigate()
    const keyReCAPTCHA = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    const [capVal, setCapVal] = useState(null)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        liff.init({ liffId: '2008686120-kHUafHAb' })
    }, [])

    //Redirect หลังรู้ role เท่านั้น
    useEffect(() => {
        if (!user) return

        if (user.role === 'admin') {
            navigate('/admin', { replace: true })
        } else {
            navigate('/forbidden', { replace: true })
        }
    }, [user])

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
            await actionCurrentUser()
            toast.success('ล็อกอินสำเร็จ')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed')
        }
    }

    const onSuccess = async (res) => {
        try {
            await actionLoginGoogle(res.credential)
            await actionCurrentUser()
            toast.success('เข้าสู่ระบบด้วย Google สำเร็จ')
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
                    <button type='submit' disabled={!capVal} className="btn btn-neutral w-full">เข้าสู่ระบบ</button>
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
                <button onClick={hdlLoginLine} className="btn bg-green-500 text-white w-full">เข้าสู่ระบบผ่าน Line</button>
                <Link to='/register' className='text-sm hover:underline underline-offset-4'>Create Account</Link>
            </div>
        </div>
    )
}

export default Login