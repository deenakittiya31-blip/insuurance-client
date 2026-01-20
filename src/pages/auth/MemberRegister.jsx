import { Link, useNavigate } from "react-router-dom"
import logo from '../../assets/logo.svg'
import Input from "../../component/form/Input"
import { useEffect } from "react"
import liff from "@line/liff"
import toast from "react-hot-toast"
import { useState } from "react"
import { registerMember } from "../../service/member"

const MemberRegister = () => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        phone: '',
    })

    useEffect(() => {
        const initLiff = async () => {
            await liff.init({ liffId: '2008929214-oMQadweJ' })

            if (!liff.isLoggedIn()) {
                liff.login()
                return
            }

            const profile = await liff.getProfile()
            setProfile(profile)
        }

        initLiff()
    }, [])

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const hdlLoginLine = async (e) => {
        e.preventDefault()
        if (!form.first_name || !form.last_name || !form.phone) {
            return toast.error('กรุณาใส่ข้อมูลให้ครบ')
        }

        try {
            await registerMember({
                user_id: profile.userId,
                display_name: profile.displayName,
                picture_url: profile.pictureUrl,
                ...form
            })

            toast.success('ลงทะเบียนสำเร็จ 🎉')
            liff.closeWindow()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-[url(/bg-member-4.jpg)] bg-cover bg-center bg-no-repeat w-full h-screen flex flex-col justify-center items-center px-7'>
            <div className='flex flex-col gap-3 justify-center items-center p-5 bg-white/50 backdrop-blur-lg border border-white/50 rounded-xl'>
                <div className='w-full flex flex-col items-center gap-3'>
                    <h1 className='font-kanit font-bold text-2xl text-text-primary'>ลงทะเบียนเป็นสมาชิก</h1>
                    <h1 className='font-kanit text-md text-text-primary text-center'>ยินดีต้อนรับ! ขอบคุณที่สมัครเป็นสมาชิกเพื่อรับข้อมูลข่าวสาร</h1>
                </div>
                <form onSubmit={hdlLoginLine} className='flex flex-col gap-5 font-kanit'>
                    <Input
                        title='ชื่อ'
                        name='first_name'
                        type='text'
                        placeholder='กรอกชื่อจริง...'
                        onChange={hdlOnChange}
                        width='w-70 md:w-sm'
                    />
                    <Input
                        title='นามสกุล'
                        name='last_name'
                        type='text'
                        placeholder='กรอกนามสกุล...'
                        onChange={hdlOnChange}
                        width='w-70 md:w-sm'
                    />
                    <Input
                        title='เบอร์โทรศัพท์'
                        name='phone'
                        type='text'
                        placeholder='กรอกเบอร์โทรศัพท์...'
                        onChange={hdlOnChange}
                        width='w-70 md:w-sm'
                    />
                    <button className="btn bg-main hover:bg-second text-white text-lg">ลงทะเบียน</button>
                </form>
            </div>
        </div>
    )
}
export default MemberRegister