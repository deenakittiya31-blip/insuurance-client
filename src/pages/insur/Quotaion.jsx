import { useState } from "react"
import UploadImage from "../../component/form/UploadImage"
import useInsureAuth from "../../store/auth-store"
import { createAkson } from "../../service/aksorn"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import TableQuotation from "../../component/table/TableQuotation"
import { createFieldsQuotation, deleteQuotation } from "../../service/quotation"
import { createPDF, getDetailCompare } from "../../service/compare"
import { useEffect } from "react"
import Swal from "sweetalert2"

const initialState = {
    company_id: '',
    image: ''
}

const Quotaion = () => {
    const token = useInsureAuth((s) => s.token)
    const { q_id } = useParams();
    const [activeTab, setActiveTab] = useState(1)
    const [form, setForm] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState({})
    const [dataSuccess, setDataSuccess] = useState({
        1: '',
        2: '',
        3: ''
    })
    const [ocrByTab, setOcrByTab] = useState({
        1: {},
        2: {},
        3: {}
    })
    const [quotationIdByTab, setQuotationIdByTab] = useState({
        1: null,
        2: null,
        3: null
    })

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


    const getDetail = async () => {
        try {
            const res = await getDetailCompare(token, q_id)
            setDetail(res.data.data)
        } catch (err) {
            console.log(err)
        }
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
                doc_id: activeTab
            };
            const res = await createAkson(token, payload)

            setOcrByTab(prev => ({
                ...prev,
                [activeTab]: res.data.ocrData
            }))

            setQuotationIdByTab(prev => ({
                ...prev,
                [activeTab]: res.data.id
            }))

            setDataSuccess(prev => ({
                ...prev,
                [activeTab]: `เอกสารฉบับที่ ${activeTab} ประมวลผลสำเร็จแล้ว`
            }))
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const removeQuotation = async () => {
        const quotationId = quotationIdByTab[activeTab]

        const result = await Swal.fire({
            title: "คุณแน่ใจ ?",
            text: "ต้องการจะเปลี่ยนจริง ๆ ใช่ไหม?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#E5E4E2",
            confirmButtonColor: "#d33",
            confirmButtonText: "ลบ",
            cancelButtonText: 'ยกเลิก'
        })

        if (!result.isConfirmed) return

        try {
            await deleteQuotation(token, quotationId)

            //ล้าง quotation ใน state
            setQuotationIdByTab(prev => ({
                ...prev,
                [activeTab]: null
            }))

            //ล้างข้อมูลที่เก็บไว้
            setOcrByTab(prev => ({
                ...prev,
                [activeTab]: {}
            }))

            //ล้างไฟล์ที่เลือก
            setForm(prev => ({
                ...prev,
                image: ''
            }))
        } catch (err) {
            console.log(err)
        }

    }

    const handleSaveQuotation = async (e) => {
        e.preventDefault()

        const quotationId = quotationIdByTab[activeTab]

        if (!quotationId) {
            toast.error('ยังไม่มี quotation_id')
            return
        }

        try {
            const res = await createFieldsQuotation(token, quotationId, ocrByTab[activeTab])

            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error('บันทึกไม่สำเร็จ')
        }
    }

    const createComparePDF = async () => {
        try {
            const res = await createPDF(token, q_id)

            // ตรวจสอบว่ามีข้อมูลหรือไม่
            if (!res.data) {
                throw new Error('ไม่พบข้อมูล PDF')
            }

            // สร้าง blob URL
            const blob = new Blob([res.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)

            // เปิดในแท็บใหม่
            const newWindow = window.open(url, '_blank')

            // ตรวจสอบว่าเปิดแท็บได้หรือไม่ (กรณี popup blocker)
            if (!newWindow) {
                toast.error('กรุณาอนุญาตให้เปิด popup ในเบราว์เซอร์')

                // สำรอง: ดาวน์โหลดแทน
                const link = document.createElement('a')
                link.href = url
                link.download = `เปรียบเทียบใบเสนอราคา_${q_id}.pdf`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                toast.success('ดาวน์โหลด PDF สำเร็จ')
            } else {
                toast.success('เปิด PDF สำเร็จ')
            }

            // ลบ URL หลังจาก 1 นาที (ป้องกัน memory leak)
            setTimeout(() => {
                window.URL.revokeObjectURL(url)
            }, 60000)

        } catch (err) {
            console.error('PDF Error:', err)

            // แสดง error message ที่ชัดเจน
            if (err.response) {
                toast.error(err.response.data?.msg || 'สร้าง PDF ไม่สำเร็จ')
            } else if (err.request) {
                toast.error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์')
            } else {
                toast.error('เกิดข้อผิดพลาด: ' + err.message)
            }
        }
    }

    return (
        <div className='flex flex-col p-5 gap-5 font-prompt'>
            <div className="flex justify-between bg-main p-5 rounded-xl">
                <div className="gap-5 font-medium text-text-primary">
                    <div className="flex gap-2">
                        <p className="font-semibold">หมายเลขใบเสนอราคา : <span className="font-medium text-sm">{detail.q_id}</span></p>
                        |
                        <p className="font-semibold"> ประเภท : <span className="font-medium text-sm">{detail.usage}</span></p>
                    </div>
                    <ul>
                        <li>
                            <p className="font-semibold"> ชื่อยี่ห้อรถยนต์ : <span className="font-medium text-sm">{detail.car_brand}</span></p>
                        </li>
                        <li>
                            <p className="font-semibold"> ชื่อรุ่นรถยนต์ : <span className="font-medium text-sm">{detail.car_model}</span></p>
                        </li>
                        <li>
                            <p className="font-semibold"> ปีของรถยนต์ : <span className="font-medium text-sm">{detail.year_be
                            }/{detail.year_ad}</span></p>
                        </li>
                    </ul>
                </div>
                <button onClick={createComparePDF} className='btn bg-text-primary rounded-md px-7 text-white hover:bg-[#202b3b]'>พิมพ์ PDF</button>
            </div>
            <div>
                <div className="flex justify-center my-5 gap-5">
                    {Object.values(dataSuccess)
                        .filter(msg => msg)
                        .map((msg, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="text-green-600">✔</span>
                                <span>{msg}</span>
                            </div>
                        ))}
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
                <div className="flex flex-col gap-7 bg-white p-5 rounded-xl">
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
                    <hr className="border-dashed border border-border" />
                    <TableQuotation
                        quotationID={quotationIdByTab[activeTab]}
                        onChangData={removeQuotation}
                        data={ocrByTab[activeTab]}
                        onSubmit={handleSaveQuotation}
                    />
                </div>

            </div>

        </div>
    )
}
export default Quotaion