import React, { useState } from 'react'
import Resize from 'react-image-file-resizer'
import { FaRegImage, FaXmark } from "react-icons/fa6";
import { RiLoader4Fill } from "react-icons/ri";
import { removeImage, uploadImages } from '../../service/Image';
import useInsureAuth from '../../store/auth-store';
import toast from 'react-hot-toast';

const UploadImage = ({ form, setForm }) => {
    const [isLoading, setLoading] = useState(false)
    const token = useInsureAuth((s) => s.token)

    const handleOnchange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        setLoading(true)

        Resize.imageFileResizer(
            file,
            720,
            720,
            'JPEG',
            70,
            0,
            async (data) => {
                const sizeInMB = data.length / 1024 / 1024
                if (sizeInMB > 1.5) {
                    toast.error('รูปภาพยังใหญ่เกินไป กรุณาเลือกรูปใหม่')
                    return
                }
                try {
                    // ถ้ามีรูปเก่า → ลบทิ้งก่อน
                    if (form.logo_public_id) {
                        await removeImage(token, form.logo_public_id)
                    }

                    const res = await uploadImages(token, data)

                    setForm({
                        ...form,
                        logo_url: res.data.url,
                        logo_public_id: res.data.public_id
                    })
                } catch (err) {
                    console.log(err)
                }
            },
            'base64'
        )
    }

    const handleDelete = async () => {
        if (!form.logo_public_id) return

        try {
            await removeImage(token, form.logo_public_id)
            setForm({
                ...form,
                logo_url: '',
                logo_public_id: ''
            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='flex flex-col text-text-primary'>
            <div className='flex gap-5'>
                {
                    form.logo_url && (
                        <div className='relative'>
                            <img
                                className='w-15 h-15 rounded-lg hover:scale-105'
                                src={form.logo_url} />
                            <span
                                onClick={handleDelete}
                                className='absolute top-0.5 right-0.5 bg-black opacity-60 rounded-full p-1'>
                                <FaXmark className='size-3 text-white' />

                            </span>
                        </div>
                    )
                }
            </div>
            {/* icon upload */}
            <div className='flex items-center gap-1'>
                <label
                    htmlFor="upload-image"
                    className="rounded-full w-8 h-8 flex justify-center items-center
                   text-accent hover:bg-accent/20 cursor-pointer"
                >
                    <FaRegImage className="size-4" />
                </label>
                <span className='font-medium text-xs text-accent'>แนบไฟล์</span>
            </div>
            {/* hidden input */}
            <input
                id="upload-image"
                type="file"
                accept="image/*"
                hidden
                onChange={handleOnchange}
            />
        </div>
    )
}

export default UploadImage