import Input from "../../component/form/Input"
import { useEffect } from "react"
import liff from "@line/liff"
import toast from "react-hot-toast"
import { useState } from "react"
import { registerMember } from "../../service/member"
import { useNavigate } from "react-router-dom"

const MemberRegister = () => {
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()
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

    const hdlRegiterLine = async (e) => {
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
            navigate('/user')
            // liff.closeWindow()
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div className='bg-[url(/bg-member-4.jpg)] bg-cover bg-center bg-no-repeat w-full h-screen flex flex-col justify-center items-center px-7'>
            <div className='flex flex-col gap-5 justify-center items-center p-5 bg-white/60 border border-white/50 rounded-xl'>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <div className="rounded-full border border-border w-15 h-15 overflow-clip">
                        <img src={profile.pictureUrl} className="w-full h-full object-cover" />
                    </div>
                    <p className="font-prompt font-semibold text-sm text-text-primary">{profile.displayName}</p>
                </div>
                <div className='w-full flex flex-col items-center'>
                    <h1 className='font-kanit font-semibold text-xl text-text-primary'>ลงทะเบียนเป็นสมาชิก</h1>
                    <h1 className='font-kanit font-light text-sm text-text-primary text-center'>ขอบคุณที่สมัครเป็นสมาชิกเพื่อรับข้อมูลข่าวสาร</h1>
                </div>

                <form onSubmit={hdlRegiterLine} className='flex flex-col gap-5 font-kanit'>
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
                    <button className="btn rounded-full bg-main hover:bg-second text-white text-base">ลงทะเบียน</button>
                </form>
            </div>
        </div>
    )
}
export default MemberRegister