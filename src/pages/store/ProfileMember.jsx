import { useState } from "react"
import TabBackward from "../../component/mobile/TabBackward"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { readMember, updateMember } from "../../service/member"
import { PiMedalBold } from "react-icons/pi"
import TextInput from "../../component/form/TextInput"
import toast from "react-hot-toast"

const ProfileMember = () => {
    const [profile, setProfile] = useState({})
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        phone: '',
    })

    const { id } = useParams()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await readMember(id)
                const data = res.data.data
                setProfile(data)

                // ใส่ค่าเริ่มต้นใน form
                setForm({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    phone: data.phone || '',
                })
            } catch (err) {
                console.log(err)
            }
        }

        fetchProfile()
    }, [id])


    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    console.log(profile)

    const handleUpdate = async (e) => {
        e.preventDefault()

        const previousForm = form

        // Optimistic update profile ที่แสดงด้านบน
        setProfile(prev => ({ ...prev, ...form }))

        try {
            const res = await updateMember(id, form)
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            setForm(previousForm)
            setProfile(prev => ({ ...prev, ...previousForm }))
            toast.error(err.response?.data?.message || 'เกิดข้อผิดพลาด')
        }
    }

    return (
        <div>
            <TabBackward
                linkTo='/store'
                title='ข้อมูลโปรไฟล์'
            />
            <div className="p-5 font-prompt grid gap-3 justify-items-center text-text-primary">
                <div className="w-25 h-25 rounded-full overflow-clip">
                    <img
                        src={profile.picture_url}
                        alt={profile.first_name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="grid justify-items-center">
                    <div className="flex gap-1 items-center">
                        <PiMedalBold className="size-3" />
                        <span>{profile.group_name}</span>
                    </div>
                    <p className="text-sm font-normal">รหัส {profile.member_code}</p>
                </div>
                <form onSubmit={handleUpdate} className="w-full space-y-3">
                    <TextInput
                        width='w-auto'
                        title='ชื่อจริง'
                        name='first_name'
                        type='text'
                        onChange={handleChange}
                        value={form.first_name}
                        disabled={true}
                    />
                    <TextInput
                        width='w-auto'
                        title='นามสกุล'
                        name='last_name'
                        type='text'
                        onChange={handleChange}
                        value={form.last_name}
                        disabled={true}
                    />
                    <TextInput
                        width='w-auto'
                        title='เบอร์โทรศัพท์'
                        name='phone'
                        type='text'
                        onChange={handleChange}
                        value={form.phone}
                    />
                    <div className="flex justify-end">
                        <button type="submit" className="btn bg-main text-white">
                            บันทึก
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ProfileMember