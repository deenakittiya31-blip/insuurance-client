import Input from "../../component/form/Input"
import { useEffect } from "react"
import liff from "@line/liff"
import toast from "react-hot-toast"
import { useState } from "react"
import { registerMember } from "../../service/member"
import { useNavigate } from "react-router-dom"

// Modal แสดงนโยบาย
const ConsentModal = ({ onAccept, onDecline }) => (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-5">
        <div className="bg-white rounded-xl p-6 max-w-sm w-full flex flex-col gap-4 font-prompt">
            <h2 className="font-kanit font-semibold text-text-primary text-lg text-center">นโยบายความเป็นส่วนตัว</h2>
            <div className="text-sm font-kanit text-gray-600 max-h-48 overflow-y-auto border rounded p-3">
                <p>เราจะเก็บข้อมูลส่วนบุคคลของท่าน ได้แก่ ชื่อ-นามสกุล เบอร์โทรศัพท์ และข้อมูลจาก LINE เพื่อวัตถุประสงค์ดังนี้</p>
                <ul className="list-disc pl-4 mt-2 flex flex-col gap-1">
                    <li>การให้บริการสมาชิก</li>
                    <li>การส่งข้อมูลข่าวสารและโปรโมชั่น</li>
                    <li>การปรับปรุงบริการของเรา</li>
                </ul>
                <p className="mt-2">
                    ท่านสามารถศึกษานโยบายฉบับเต็มได้ที่{' '}
                    <a
                        href="/policy/privacy"
                        target="_blank"          // เปิด tab ใหม่ ไม่ปิด modal
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        นโยบายความเป็นส่วนตัว
                    </a>
                    {' '}
                    <a
                        href="/policy/terms"
                        target="_blank"          // เปิด tab ใหม่ ไม่ปิด modal
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        ข้อกําหนดในการให้บริการ
                    </a>
                    {' '}
                    <a
                        href="/policy/cookie"
                        target="_blank"          // เปิด tab ใหม่ ไม่ปิด modal
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        นโยบายการใช้คุกกี้
                    </a>
                </p>
            </div>
            <p className="text-sm font-kanit text-text-primary">
                หากท่านไม่ยินยอม จะไม่สามารถใช้งานระบบสมาชิกได้
            </p>
            <div className="flex gap-3">
                <button
                    onClick={onDecline}
                    className="flex-1 btn btn-outline rounded-full text-sm"
                >
                    ไม่ยินยอม
                </button>
                <button
                    onClick={onAccept}
                    className="flex-1 btn rounded-full bg-main text-white text-sm"
                >
                    ยินยอม
                </button>
            </div>
        </div>
    </div >
)

const MemberRegister = () => {
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()
    const [showConsent, setShowConsent] = useState(true)   // เปิด modal ทันที
    const [consentAccepted, setConsentAccepted] = useState(false)
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

    const hdlAcceptConsent = () => {
        setConsentAccepted(true)
        setShowConsent(false)
    }

    const hdlDeclineConsent = () => {
        toast.error('ไม่สามารถใช้งานได้หากไม่ยินยอมนโยบาย')
        // ปิด LIFF หรือ redirect ออก
        liff.closeWindow()
        // หรือ navigate('/') ถ้าไม่ได้อยู่ใน LIFF
    }


    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const hdlRegiterLine = async (e) => {
        e.preventDefault()
        if (!consentAccepted) {
            return toast.error('กรุณายินยอมนโยบายความเป็นส่วนตัวก่อน')
        }

        if (!form.first_name || !form.last_name || !form.phone) {
            return toast.error('กรุณาใส่ข้อมูลให้ครบ')
        }

        try {
            await registerMember({
                user_id: profile.userId,
                display_name: profile.displayName,
                picture_url: profile.pictureUrl,
                consent_accepted: true,
                ...form
            })

            toast.success('ลงทะเบียนสำเร็จ 🎉')
            navigate('/store')
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div className='bg-[url(/bg-member-4.jpg)] bg-cover bg-center bg-no-repeat w-full h-screen flex flex-col justify-center items-center px-7'>
            {/* Consent Modal */}
            {showConsent && (
                <ConsentModal
                    onAccept={hdlAcceptConsent}
                    onDecline={hdlDeclineConsent}
                />
            )}

            {/* ฟอร์มลงทะเบียน (แสดงอยู่ด้านหลัง modal) */}
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