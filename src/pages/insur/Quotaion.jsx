import { useState } from "react"
import useInsureAuth from "../../store/auth-store"
import { createAkson } from "../../service/aksorn"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import TableQuotation from "../../component/table/TableQuotation"
import { createQuotationFields, deleteQuotation } from "../../service/quotation"
import { createPDF, getDetailCompare } from "../../service/compare"
import { useEffect } from "react"
import Swal from "sweetalert2"
import UploadFormOne from "../../component/form/UploadFormOne"
import UploadFormSecond from "../../component/form/UploadFormSecond"
import UploadFormThree from "../../component/form/UploadFormThree"
import { listOption } from "../../service/car/Compulsory"
import SelectCompul from "../../component/form/SelectCompul"

const initialForm = {
    company_id: '',
    image: ''
}

const Quotaion = () => {
    const token = useInsureAuth((s) => s.token)
    const { q_id } = useParams();
    const [activeTab, setActiveTab] = useState(1)
    const [detail, setDetail] = useState({})
    const [usageID, setUsageID] = useState(null)
    const [compulsory, setCompulsory] = useState([])
    //เก็บข้อมูล PDF ของแต่ละแท็บ
    const [pdfPreviewByTab, setPdfPreviewByTab] = useState({
        1: null,
        2: null,
        3: null
    })

    //เก็บค่าพรบ.
    const [compulsoryByTab, setCompulsoryByTab] = useState({
        1: null,
        2: null,
        3: null
    })

    const [loadingByTab, setLoadingByTab] = useState({
        1: false,
        2: false,
        3: false
    })

    //เก็บค่าของ form แต่ละแท็บ
    const [formByTab, setFormByTab] = useState({
        1: { ...initialForm },
        2: { ...initialForm },
        3: { ...initialForm }
    })

    //เก็บข้อมูลการอัปโหลดเอกสารสำเร็จ
    const [dataSuccess, setDataSuccess] = useState({
        1: '',
        2: '',
        3: ''
    })

    //เก็บข้อมูลที่ได้จาก ocr แต่ละแท็บ
    const [ocrByTab, setOcrByTab] = useState({
        1: {},
        2: {},
        3: {}
    })

    //เก็บค่า quotation_id ที่ได้มาจากการอัปโหลดของแต่ละแท็บ
    const [quotationIdByTab, setQuotationIdByTab] = useState({
        1: null,
        2: null,
        3: null
    })

    const isSaveDisabled =
        compulsoryByTab[activeTab] === null ||
        compulsoryByTab[activeTab] === undefined

    useEffect(() => {
        if (!q_id) return;
        getDetail();
    }, [q_id])

    useEffect(() => {
        if (!usageID) return;
        getCompulsoryOption(usageID);
    }, [usageID])

    //onChange ของข้อมูลที่ส่งไปสร้าง quotation และยิง api ocr akson
    const hdlOnChange = async (e) => {
        const { name, value, files } = e.target

        // กรณีเลือกไฟล์
        if (files) {
            const file = files[0]

            setPdfPreviewByTab(prev => ({
                ...prev,
                [activeTab]: URL.createObjectURL(file)
            }))

            if (!file) return

            const base64 = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result) // มี prefix
                reader.readAsDataURL(file)
            })

            setFormByTab(prev => ({
                ...prev,
                [activeTab]: {
                    ...prev[activeTab],
                    image: base64
                }
            }))

            return
        }

        // กรณี select / input
        setFormByTab(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [name]: value
            }
        }))
    }

    //onChange ของการแก้ไขข้อมูล
    const hdlFormChange = (e) => {
        const { name, value } = e.target

        setOcrByTab(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [name]: value
            }
        }))
    }

    //ดึงข้อมูลใบเสนอราคา
    const getDetail = async () => {
        try {
            const res = await getDetailCompare(token, q_id)
            const data = res.data.data

            setDetail(data)
            setUsageID(data.usageid)
        } catch (err) {
            console.log(err)
        }
    }

    const getCompulsoryOption = async (id) => {
        try {
            const res = await listOption(id)
            setCompulsory(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    //บันทึก quotation และใช้ ocr akson
    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = formByTab[activeTab]

        if (!form.company_id || !form.image) {
            toast.error('ข้อมูลไม่ครบ')
        }

        setLoadingByTab(prev => ({
            ...prev,
            [activeTab]: true
        }))

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
            setLoadingByTab(prev => ({
                ...prev,
                [activeTab]: false
            }))
        }
    }

    //ลบ quotation
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

            setDataSuccess(prev => ({
                ...prev,
                [activeTab]: ''
            }))

            //ล้างไฟล์ที่เลือก
            setFormByTab(prev => ({
                ...prev,
                [activeTab]: {
                    ...prev[activeTab],
                    image: ''
                }
            }))
        } catch (err) {
            console.log(err)
        }

    }

    const testCompulsory = (e) => {
        e.preventDefault()
        const selectedId = compulsoryByTab[activeTab]

        if (selectedId === null || selectedId === 0) {
            console.log('log compul test : 0')
            return
        }

        const list = Object.values(compulsory)

        const found = list.find(
            c => Number(c.id) === Number(selectedId)
        )

        const amount = Number(found?.total ?? 0)

        console.log('log compul test :', amount)
    }

    const handleSaveQuotation = async (e) => {
        e.preventDefault()

        const quotationId = quotationIdByTab[activeTab]
        if (!quotationId) {
            toast.error('ยังไม่มี quotation_id')
            return
        }
        if (isSaveDisabled) {
            toast.error('กรุณาเลือกพรบ.')
            return
        }

        const selectedId = compulsoryByTab[activeTab]

        if (selectedId === null || selectedId === 0) {
            console.log('log compul test : 0')
            return
        }

        const list = Object.values(compulsory)

        const found = list.find(
            c => Number(c.id) === Number(selectedId)
        )

        const amount = Number(found?.total ?? 0)

        const payload = {
            ...ocrByTab[activeTab],
            compulsory_amount: amount
        }

        try {
            const res = await createQuotationFields(token, quotationId, payload)

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
        <div className='flex flex-col p-3 gap-5 font-prompt'>
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
                    {activeTab === 1 && (
                        <div className="flex justify-between">
                            < UploadFormOne
                                onChange={hdlOnChange}
                                isLoading={loadingByTab[activeTab]}
                                onSubmit={handleSubmit}
                                form={formByTab[activeTab]}
                            />
                            <SelectCompul
                                options={compulsory}
                                value={compulsoryByTab[activeTab]}
                                onChange={(value) =>
                                    setCompulsoryByTab(prev => ({
                                        ...prev,
                                        [activeTab]: value
                                    }))
                                }
                            />
                        </div>
                    )}
                    {activeTab === 2 && (
                        <>
                            <UploadFormSecond
                                onChange={hdlOnChange}
                                isLoading={loadingByTab[activeTab]}
                                onSubmit={handleSubmit}
                                form={formByTab[activeTab]}
                            />
                            <SelectCompul
                                options={compulsory}
                                value={compulsoryByTab[activeTab]}
                                onChange={(value) =>
                                    setCompulsoryByTab(prev => ({
                                        ...prev,
                                        [activeTab]: value
                                    }))
                                }
                            />
                        </>
                    )}
                    {activeTab === 3 && (
                        <>
                            <UploadFormThree
                                onChange={hdlOnChange}
                                isLoading={loadingByTab[activeTab]}
                                onSubmit={handleSubmit}
                                form={formByTab[activeTab]}
                            />
                            <SelectCompul
                                options={compulsory}
                                value={compulsoryByTab[activeTab]}
                                onChange={(value) =>
                                    setCompulsoryByTab(prev => ({
                                        ...prev,
                                        [activeTab]: value
                                    }))
                                }
                            />
                        </>
                    )}
                    <hr className="border-dashed border border-border" />
                    <div className="flex gap-5 h-192.5 overflow-y-clip">
                        <div className="flex-3 overflow-auto bg-zinc-800 p-4">
                            {pdfPreviewByTab[activeTab] ? (
                                <iframe
                                    src={`${pdfPreviewByTab[activeTab]}#zoom=80`}
                                    className="w-full h-full bg-white rounded"
                                    title="PDF Preview"
                                />
                            ) : (
                                <div className="flex justify-center items-center h-full text-zinc-400">
                                    กรุณาเลือกไฟล์ PDF เพื่อดูตัวอย่าง
                                </div>
                            )}
                        </div>
                        <div className="flex-1/5 overflow-y-auto">
                            <TableQuotation
                                data={ocrByTab[activeTab]}
                                onChange={hdlFormChange}
                                onSubmit={handleSaveQuotation}
                                quotation_id={quotationIdByTab[activeTab]}
                                onDelete={removeQuotation}
                            // disabledSave={isSaveDisabled}
                            />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Quotaion