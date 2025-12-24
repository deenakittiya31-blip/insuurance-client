import React, { useState } from 'react'
import Resize from 'react-image-file-resizer'
import { FaXmark } from "react-icons/fa6";
import { RiLoader4Fill } from "react-icons/ri";
import { removeImage, uploadImages } from '../../service/Image';
import useInsureAuth from '../../store/auth-store';
import toast from 'react-hot-toast';

const UploadFile = ({ form, setForm }) => {
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
                    setLoading(false)
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
                } finally {
                    setLoading(false)
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
        <div className='flex flex-col'>
            <h3 className='block text-md font-medium'>Logo</h3>
            <div className='flex gap-5 my-2'>
                {
                    isLoading && <RiLoader4Fill color='#FFBB20' size={20} className='animate-spin mb-3' />
                }

                {
                    form.logo_url && (
                        <div className='relative'>
                            <img
                                className='w-24 h-24 rounded-md hover:scale-105'
                                src={form.logo_url} />
                            <span
                                onClick={handleDelete}
                                className='absolute -top-3 -right-3 bg-gray-300 opacity-25 rounded-full p-1'>
                                <FaXmark className='w-5 h-5 text-black' />

                            </span>
                        </div>
                    )
                }
            </div>
            <input
                onChange={handleOnchange}
                type='file'
                className='file-input w-full'
                accept='image/*'
            ></input>
        </div>
    )
}

export default UploadFile