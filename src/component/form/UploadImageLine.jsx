import React, { useState } from 'react'
import { RiLoader4Fill } from "react-icons/ri";
import { removeImage, uploadDocument } from '../../service/Image';
import useInsureAuth from '../../store/auth-store';
import toast from 'react-hot-toast';

const UploadImageLine = ({ form, setForm }) => {
    const [isLoading, setLoading] = useState(false)
    const token = useInsureAuth((s) => s.token)

    const handleOnchange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const sizeInMB = file.length / 1024 / 1024
        if (sizeInMB > 1.5) {
            toast.error('รูปภาพยังใหญ่เกินไป กรุณาเลือกรูปใหม่')
            setLoading(false)
            return
        }

        setLoading(true)

        const reader = new FileReader()

        reader.onloadend = async () => {
            try {
                const base64 = reader.result

                // ถ้ามีรูปเก่า → ลบทิ้งก่อน
                if (form.file_public_id) {
                    await removeImage(token, form.file_public_id)
                }

                const res = await uploadDocument({
                    file: base64,
                    file_type: file.type,
                    file_name: file.name
                })

                setForm({
                    file_url: res.data.url,
                    file_public_id: res.data.public_id,
                    file_type: res.data.file_type,
                })
            } catch (err) {
                console.log(err)
                toast.error('อัปโหลดรูปไม่สำเร็จ')
            } finally {
                setLoading(false)
            }
        }

        reader.onerror = () => {
            toast.error('อ่านไฟล์ไม่สำเร็จ')
            setLoading(false)
        }

        reader.readAsDataURL(file)
    }

    return (
        <div className='flex flex-col text-text-primary'>
            <p className='font-semibold text-sm font-prompt'>ไฟล์</p>
            <div className='flex gap-5 mb-2'>
                {
                    isLoading && <RiLoader4Fill color='#FFBB20' size={20} className='animate-spin mb-3' />
                }
            </div>
            <input
                onChange={handleOnchange}
                type='file'
                className='file-input w-full'
                accept='image/*,application/pdf'
            ></input>
        </div>
    )
}
export default UploadImageLine