import React, { useEffect } from 'react'
import liff from '@line/liff'
import { useNavigate } from 'react-router-dom';
import useInsureAuth from '../../store/auth-store';
import toast from 'react-hot-toast';

const LoginLine = () => {
    const { actionLoginLine, actionCurrentUser } = useInsureAuth();
    const navigate = useNavigate()

    //set up & เก็บข้อมูลที่ได้
    useEffect(() => {
        liff.init({ liffId: '2008686120-kHUafHAb' })
            .then(() => {
                hdlLogin()
            })
    }, [])

    const hdlLogin = async () => {
        try {
            const profile = await liff.getProfile()

            await actionLoginLine(profile) // ได้ token
            const currentUser = await actionCurrentUser()
            console.log('CURRENT USER:', currentUser)


            if (!currentUser) {
                throw new Error('ไม่พบข้อมูลผู้ใช้')
            }

            toast.success('ล็อกอินสำเร็จ')

            if (currentUser.role === 'admin') {
                navigate('/admin', { replace: true })
            } else {
                navigate('/forbidden', { replace: true })
            }
        } catch (err) {
            console.log(err.response?.data?.message || 'Login failed')
            toast.error('LINE login ล้มเหลว')
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <span className="loading loading-spinner loading-xl text-main"></span>
        </div>
    )
}

export default LoginLine