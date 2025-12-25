import React, { useEffect } from 'react'
import liff from '@line/liff'
import { useNavigate } from 'react-router-dom';
import useInsureAuth from '../../store/auth-store';
import toast from 'react-hot-toast';

const LoginLine = () => {
    const actionLoginLine = useInsureAuth((s) => s.actionLoginLine)
    const actionCurrentUser = useInsureAuth((s) => s.actionCurrentUser)
    const user = useInsureAuth((s) => s.user)

    const navigate = useNavigate()

    //set up & เก็บข้อมูลที่ได้
    useEffect(() => {
        liff.init({ liffId: '2008686120-kHUafHAb' })
            .then(() => {
                hdlLogin()
            })
    }, [])

    useEffect(() => {
        if (!user) return

        if (user.role === 'admin') {
            navigate('/admin', { replace: true })
        } else {
            navigate('/user', { replace: true })
        }
    }, [user])

    const hdlLogin = async () => {
        try {
            const profile = await liff.getProfile()

            await actionLoginLine(profile) // ได้ token
            await actionCurrentUser()      // ได้ user + role

            toast.success('ลงชื่อเข้าใช้สำเร็จ')
        } catch (err) {
            console.error(err)
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