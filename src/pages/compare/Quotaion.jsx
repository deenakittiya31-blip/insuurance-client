import { useState } from "react"
import useInsureAuth from "../../store/auth-store"
import { createAkson } from "../../service/aksorn"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import TableQuotation from "../../component/table/TableQuotation"
import { createQuotationFields, deleteQuotation } from "../../service/quotation"
import { getDetailCompare } from "../../service/compare"
import { useEffect } from "react"
import Swal from "sweetalert2"
import UploadFormOne from "../../component/form/UploadFormOne"
import UploadFormSecond from "../../component/form/UploadFormSecond"
import UploadFormThree from "../../component/form/UploadFormThree"
import { listOption } from "../../service/car/Compulsory"
import SelectCompul from "../../component/form/SelectCompul"
import State from "../../component/quotation_about/State"
import { BiSolidFilePdf, BiSolidFileJpg } from "react-icons/bi";
import Badge from "../../component/quotation_about/Badge"
import { createJPEG } from "../../utils/jpg"
import { createComparePDF } from "../../utils/pdf"

const initialForm = {
    company_id: '',
    image: ''
}

const Quotaion = () => {
    const token = useInsureAuth((s) => s.token)
    const navigate = useNavigate()
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

    const [success, setSucces] = useState({
        1: '',
        2: '',
        3: ''
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

    useEffect(() => {
        const allSaved = success[1] !== '' &&
            success[2] !== '' &&
            success[3] !== ''

        if (allSaved) {
            Swal.fire({
                title: '🎉 บันทึกข้อมูลครบทั้ง 3 แท็บแล้ว',
                text: 'คุณต้องการไปหน้าอื่นหรืออยู่ต่อในหน้านี้?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'ไปหน้ารายการ',
                cancelButtonText: 'อยู่ต่อในหน้านี้',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#6c757d',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/admin/quotationlist')
                }
            })
        }
    }, [quotationIdByTab, navigate])

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
            const res = await getDetailCompare(q_id)
            const data = res.data.data

            setDetail(data)
            setUsageID(data.car_usage_id)
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
            if (err.response?.status === 502) {
                toast.error('ระบบ OCR ขัดข้องชั่วคราว กรุณาลองใหม่ภายหลัง')
                return
            }

            toast.error(
                err.response?.data?.message ||
                err.response?.data?.msg ||
                'เกิดข้อผิดพลาด'
            )

            //แก้ error

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

            setPdfPreviewByTab(prev => ({
                ...prev,
                [activeTab]: null
            }))

            setFormByTab(prev => ({
                ...prev,
                [activeTab]: { ...initialForm }
            }))
        } catch (err) {
            console.log(err)
        }
    }

    //บันทึกข้อมูลที่ได้มาจาก ocr
    const handleSaveQuotationFields = async (e) => {
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

        if (selectedId === null) {
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

            setSucces(prev => ({
                ...prev,
                [activeTab]: `บันทึกแล้ว`
            }))
        } catch (err) {
            console.log(err)
            toast.error('บันทึกไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col p-3 gap-5 font-prompt'>
            <div className="flex gap-3">
                {/*ส่วนแสดงข้อมูลเกี่ยวกับใบเสนอราคาและปุ่มดาวน์โหลด pdf and jpeg*/}
                <div className="flex-1">
                    <State data={detail} />
                </div>
                <div className="grid grid-rows-2 gap-3">
                    <button onClick={() => createComparePDF(q_id)} className='btn bg-text-primary rounded-md h-full text-white hover:bg-[#202b3b]'><BiSolidFilePdf size={20} /> PDF</button>
                    <button onClick={() => createJPEG(q_id)} className='btn bg-text-primary rounded-md h-full text-white hover:bg-[#202b3b]'><BiSolidFileJpg size={20} /> JPEG</button>
                </div>
            </div>
            <div className="w-full">
                {/*แสดงเอกสารอัปโหลดสำเร็จ*/}
                <div className="flex justify-center my-5 gap-5">
                    {Object.values(dataSuccess)
                        .filter(msg => msg)
                        .map((msg, index) => (
                            <Badge key={index} msg={msg} />
                        ))}
                </div>
                <div role="tablist" className="tabs tabs-lift flex justify-center text-text-primary">
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
                        < UploadFormOne
                            onChange={hdlOnChange}
                            isLoading={loadingByTab[activeTab]}
                            onSubmit={handleSubmit}
                            form={formByTab[activeTab]}
                        />
                    )}
                    {activeTab === 2 && (
                        <UploadFormSecond
                            onChange={hdlOnChange}
                            isLoading={loadingByTab[activeTab]}
                            onSubmit={handleSubmit}
                            form={formByTab[activeTab]}
                        />
                    )}
                    {activeTab === 3 && (
                        <UploadFormThree
                            onChange={hdlOnChange}
                            isLoading={loadingByTab[activeTab]}
                            onSubmit={handleSubmit}
                            form={formByTab[activeTab]}
                        />
                    )}
                    <div className="flex gap-5 h-192.5 overflow-y-clip">
                        <div className="flex-3 overflow-auto bg-zinc-800 p-4">
                            {pdfPreviewByTab[activeTab] ? (
                                <iframe
                                    src={`${pdfPreviewByTab[activeTab]}#zoom=85`}
                                    className="w-full h-full bg-white rounded"
                                    title="PDF Preview"
                                />
                            ) : (
                                <div className="flex justify-center items-center h-full text-zinc-400">
                                    กรุณาเลือกไฟล์ PDF เพื่อดูตัวอย่าง
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-5 flex-1/5 overflow-y-auto">
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
                            <TableQuotation
                                data={ocrByTab[activeTab]}
                                onChange={hdlFormChange}
                                onSubmit={handleSaveQuotationFields}
                                quotation_id={quotationIdByTab[activeTab]}
                                onDelete={removeQuotation}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Quotaion