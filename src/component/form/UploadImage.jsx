import { useState } from "react"
import useInsureAuth from "../../store/auth-store"
import { createAkson } from "../../service/aksorn"

const UploadImage = () => {
    const token = useInsureAuth((s) => s.token)
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleOnChange = (e) => {
        const file = e.target.files[0]

        console.log('File size:', (file.size / 1024 / 1024).toFixed(2), 'MB')
        console.log('Type:', file.type)

        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            //เก็บไว้ใน state image
            setImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!image) return

        setLoading(true) //start loading

        try {
            const res = await createAkson(token, image)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false) //stop loading
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                onChange={handleOnChange}
                type='file'
                className='file-input w-full'
                accept='image/*,application/pdf'
                multiple
            ></input>
            <button
                type="submit"
                disabled={loading || !image}
                className="btn btn-neutral">
                {loading ? (
                    <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-sm"></span>
                        กำลังประมวลผล OCR...
                    </span>
                ) : (
                    'Upload'
                )}
            </button>
        </form>

    )
}
export default UploadImage