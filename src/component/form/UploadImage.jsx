import { useState } from "react"
import useInsureAuth from "../../store/auth-store"
import { createInvoice } from "../../service/aigen"

const UploadImage = () => {
    const [isLoading, setLoading] = useState(false)
    const token = useInsureAuth((s) => s.token)
    const [image, setImage] = useState('')

    const handleOnChange = (e) => {
        const file = e.target.files[0]
        console.log('File size:', (file.size / 1024 / 1024).toFixed(2), 'MB')

        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            //ได้ base64 แบบมี prefix
            const base64WithPrefix = reader.result

            // ตัด prefix ออก
            const base64 = base64WithPrefix.split(',').pop();
            const base64SizeInBytes = (base64.length * 3) / 4
            const base64SizeInMB = base64SizeInBytes / 1024 / 1024
            console.log('Base64 size:', base64SizeInMB.toFixed(2), 'MB')


            //เก็บไว้ใน state image
            setImage(base64)
        }

        reader.readAsDataURL(file)


    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const res = await createInvoice(token, image)

            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                onChange={handleOnChange}
                type='file'
                className='file-input w-full'
                accept='image/*'
            ></input>
            <button type="submit" className="btn btn-neutral">upload</button>
        </form>

    )
}
export default UploadImage