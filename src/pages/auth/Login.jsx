import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import TextInputAuth from '../../component/form/TextInputAuth'
import ReCAPTCHA from 'react-google-recaptcha'
import { loginSchema } from '../../utils/schema'

const Login = () => {
    const { actionLogin, actionCurrentUser, actionLogout } = useInsureAuth();
    const navigate = useNavigate()
    const keyReCAPTCHA = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    const [capVal, setCapVal] = useState(null)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: '',
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

        if (!capVal) {
            toast.error('กรุณายืนยัน reCAPTCHA')
            return
        }

        const result = loginSchema.safeParse(form)
        if (!result.success) {
            const fieldErrors = {}
            result.error.issues.forEach(err => {  //.issues แทน .errors
                fieldErrors[err.path[0]] = err.message
            })
            setErrors(fieldErrors)
            return
        }

        setErrors({})  //clear errors ถ้าผ่าน
        try {
            await actionLogin({
                ...form,
                captcha: capVal
            })
            const currentUser = await actionCurrentUser()
            toast.success('ล็อกอินสำเร็จ')

            if (currentUser.role === 'admin') {
                navigate('/app', { replace: true })
            }
            else if (currentUser.role === 'staff') {
                navigate('/app', { replace: true })
            } else {
                navigate('/forbidden', { replace: true })
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed')
        }
    }

    const handleLogin = async () => {
        navigate("/liff");
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
                        error={errors.email}
                    />
                    <TextInputAuth
                        name='password'
                        type='password'
                        placeholder='Enter password'
                        onChange={hdlOnChange}
                        width='w-70 md:w-sm'
                        error={errors.password}
                    />
                    <ReCAPTCHA
                        sitekey={keyReCAPTCHA}
                        onChange={(val) => setCapVal(val)}
                    />
                    <button type='submit' className="btn btn-neutral w-full">เข้าสู่ระบบ</button>
                    <button onClick={handleLogin} type='button' className="btn btn-info w-full">ไปที่หน้าร้านค้า</button>
                </form>
            </div>
        </div>
    )
}

export default Login