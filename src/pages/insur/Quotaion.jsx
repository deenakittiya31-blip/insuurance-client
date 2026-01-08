import { useState } from "react"
import UploadImage from "../../component/form/UploadImage"
import useInsureAuth from "../../store/auth-store"
import { createAkson } from "../../service/aksorn"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import TableQuotation from "../../component/table/TableQuotation"
import { createFieldsQuotation } from "../../service/quotation"
import { getDetailCompare } from "../../service/compare"
import { useEffect } from "react"

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
    const [detail, setDetail] = useState({})
    // const [ocrByTab, setOcrByTab] = useState({
    //     1: {},
    //     2: {},
    //     3: {}
    // })
    const [quotation_id, setQuotation_id] = useState()
    const { q_id } = useParams();

    useEffect(() => {
        if (!q_id) return;
        getDetail();
    }, [q_id])

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

    const handleOcrChange = (e) => {
        const { name, value } = e.target

        setDataOcr(prev => ({
            ...prev,
            [name]: value
        }))
    }

    console.log('q_id from params:', q_id);

    const getDetail = async () => {
        try {
            const res = await getDetailCompare(token, q_id)
            setDetail(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(detail)

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
            setQuotation_id(res.data.id)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    console.log(dataOcr)

    const handleSaveQuotation = async (e) => {
        e.preventDefault()
        if (!quotation_id) {
            toast.error('ยังไม่มี quotation_id')
            return
        }

        try {
            const res = await createFieldsQuotation(token, quotation_id, dataOcr)

            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error('บันทึกไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col p-5 font-prompt'>
            <div className="flex justify-between">
                <div className="font-medium text-text-primary">
                    <h1>เลขใบเสนอราคา : {detail.q_id}</h1>
                    <h1>ชื่อยี่ห้อรถยนต์ : {detail.car_brand}</h1>
                    <h1>ชื่อรุ่นรถยนต์ : {detail.car_model}</h1>
                    <h1>ประเภทการใช้งาน : {detail.usage}</h1>
                    <h1>ปีของรถยนต์ : {detail.year}</h1>
                </div>
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
                <TableQuotation
                    data={dataOcr}
                    onChange={handleOcrChange}
                    onSubmit={handleSaveQuotation}
                />
            </div>

        </div>
    )
}
export default Quotaion