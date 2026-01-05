import { useState } from "react"
import useInsureAuth from "../../store/auth-store"
import { createAkson } from "../../service/aksorn"

const UploadImage = () => {
    const token = useInsureAuth((s) => s.token)
    const [image, setImage] = useState('')

    const handleOnChange = (e) => {
        const file = e.target.files[0]

        console.log('File size:', (file.size / 1024 / 1024).toFixed(2), 'MB')
        console.log('Type:', file.type)

        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            //ได้ base64 แบบมี prefix
            const base64WithPrefix = reader.result
            console.log('data', base64WithPrefix)

            //เก็บไว้ใน state image
            setImage(base64WithPrefix)
        }

        reader.readAsDataURL(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await createAkson(token, image)
            console.log(res.data)
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
                accept='image/*,application/pdf'
            ></input>
            <button type="submit" className="btn btn-neutral">upload</button>
        </form>

    )
}
export default UploadImage