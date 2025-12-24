import React, { useEffect } from 'react'
import liff from '@line/liff'
import { useNavigate } from 'react-router-dom';
import useInsureAuth from '../../store/auth-store';

const LoginLine = () => {
    const actionLogin = useInsureAuth((s) => s.actionLoginLine)
    const navigate = useNavigate();

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

            console.log(profile)
            actionLogin(profile)
                .then(res => {
                    navigate('/admin')
                    toast.success('ลงชื่อเข้าใช้สำเร็จ')

                    console.log(res)
                })
                .catch(err => console.log(err))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <span className="loading loading-spinner loading-xl text-main"></span>
        </div>
    )
}

export default LoginLine