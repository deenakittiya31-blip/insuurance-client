import { useEffect, useState } from "react"
import TextInput from "../component/form/TextInput"
import Title from "../component/form/Title"
import { readProfile, updateProfile } from "../service/profile"
import { AiFillSmile } from "react-icons/ai"
import toast from "react-hot-toast"
import UploadFile from "../component/form/UploadFile"

const ProfileUser = () => {
    const [profile, setProfile] = useState({})

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const res = await readProfile()
            setProfile(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfile(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await updateProfile(profile)
            toast.success(res.data.message)
            setProfile(res.data.data) // sync ข้อมูลล่าสุด
        } catch (err) {
            console.log(err)
            toast.error("อัปเดตไม่สำเร็จ")
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5 font-prompt'>
            <Title
                title='ข้อมูลของฉัน'
                subtitle='จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้'
            />
            <form onSubmit={handleSubmit} className="flex text-text-primary">
                <div className="w-full grid grid-cols-[130px_1fr] items-center gap-y-3">
                    <p className='font-semibold text-sm'>ชื่อผู้ใช้</p>
                    <input
                        type='text'
                        name='name'
                        placeholder='ชื่อผู้ใช้...'
                        value={profile.name || ""}
                        onChange={handleChange}
                        className='input'
                    />
                    <p className='font-semibold text-sm'>ชื่อจริง</p>
                    <input
                        type='text'
                        name='first_name'
                        placeholder='ชื่อจริง...'
                        value={profile.last_name || ""}
                        onChange={handleChange}
                        className='input'
                    />
                    <p className='font-semibold text-sm'>นามสกุล</p>
                    <input
                        type='text'
                        name='last_name'
                        placeholder='นามสกุล...'
                        onChange={handleChange}
                        value={profile.last_name || ""}
                        className='input'
                    />
                    <p className='font-semibold text-sm'>อีเมลล์</p>
                    <input
                        type='text'
                        name='email'
                        readOnly
                        value={profile.email || ""}
                    />
                    <p className='font-semibold text-sm'>เบอร์โทรศัพท์</p>
                    <input
                        type='text'
                        name='phone'
                        placeholder='เบอร์โทรศัพท์...'
                        onChange={handleChange}
                        value={profile.phone || ""}
                        className='input'
                    />
                    <div className="col-span-2 justify-self-center">
                        <button type="submit" className="btn btn-sm btn-neutral px-10">บันทึก</button>
                    </div>
                </div>
                <div className="divider divider-horizontal divider-end" />
                <div className='w-full p-5 flex flex-col gap-5 justify-center items-center'>
                    <UploadFile
                        form={profile}
                        setForm={setProfile}
                        variant="profile"
                    />
                </div>
            </form>
        </div>
    )
}
export default ProfileUser