import { useState } from "react"
import UploadImage from "../../component/form/UploadImage"
import useInsureAuth from "../../store/auth-store"
import { createAkson } from "../../service/aksorn"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import TableQuotation from "../../component/table/TableQuotation"

const initialState = {
    company_id: '',
    image: ''
}

const Quotaion = () => {
    const token = useInsureAuth((s) => s.token)
    const [activeTab, setActiveTab] = useState(1)
    const [form, setForm] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [dataOcr, setDataOcr] = useState({})
    const { q_id } = useParams();

    const hdlOnChange = async (e) => {
        const { name, value, files } = e.target

        // กรณีเลือกไฟล์
        if (files) {
            const file = files[0]
            if (!file) return

            const base64 = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result) // มี prefix
                reader.readAsDataURL(file)
            })

            setForm(prev => ({
                ...prev,
                image: base64
            }))

            return
        }

        // กรณี select / input
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.company_id || !form.image) {
            toast.error('ข้อมูลไม่ครบ')
        }

        setLoading(true)

        try {
            const payload = {
                ...form,
                compare_id: q_id,
            };
            const res = await createAkson(token, payload)
            setDataOcr(res.data.ocrData)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    console.log(dataOcr)

    return (
        <div className='flex flex-col p-5 font-prompt'>
            <div className="flex justify-end">
                <button className='btn bg-main rounded-md px-7 text-white hover:bg-second'>พิมพ์ PDF</button>
            </div>
            <div role="tablist" className="tabs tabs-lift flex justify-center">
                <a
                    role="tab"
                    className={`tab font-medium ${activeTab === 1 ? "tab-active" : ""}`}
                    onClick={() => setActiveTab(1)}
                >
                    เอกสารฉบับที่ 1
                </a>
                <a
                    role="tab"
                    className={`tab font-medium ${activeTab === 2 ? "tab-active" : ""}`}
                    onClick={() => setActiveTab(2)}
                >เอกสารฉบับที่ 2
                </a>
                <a
                    role="tab"
                    className={`tab font-medium ${activeTab === 3 ? "tab-active" : ""}`}
                    onClick={() => setActiveTab(3)}
                >
                    เอกสารฉบับที่ 3
                </a>
            </div>
            <div className="flex flex-col gap-5 bg-white p-5 rounded-xl">
                {activeTab === 1 &&
                    <UploadImage
                        onChange={hdlOnChange}
                        isLoading={loading}
                        onSubmit={handleSubmit}
                        form={form}
                    />
                }
                {activeTab === 2 &&
                    <UploadImage
                        onChange={hdlOnChange}
                        isLoading={loading}
                        onSubmit={handleSubmit}
                        form={form}
                    />
                }
                {activeTab === 3 &&
                    <UploadImage
                        onChange={hdlOnChange}
                        isLoading={loading}
                        onSubmit={handleSubmit}
                        form={form}
                    />
                }
                <TableQuotation />
            </div>

        </div>
    )
}
export default Quotaion