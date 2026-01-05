import { useState } from "react"
import useInsureAuth from "../../store/auth-store"
import { createAkson } from "../../service/aksorn"

const UploadImage = () => {
    const token = useInsureAuth((s) => s.token)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const handleOnChange = async (e) => {
        const files = Array.from(e.target.files)

        if (!files) return

        const base64Images = await Promise.all(
            files.map(file => new Promise(resolve => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(file)
            }))
        )

        setData(base64Images)

        console.log(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!image) return

        setLoading(true) //start loading

        try {
            const res = await createAkson(token, data)
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
                disabled={loading || !data}
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