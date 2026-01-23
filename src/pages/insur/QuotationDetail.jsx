import { useState } from "react"
import useInsureAuth from "../../store/auth-store"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import TableQuotation from "../../component/table/TableQuotation"
import { createFieldsQuotation, deleteQuotation } from "../../service/quotation"
import { createJPG, createPDF, getDetailCompare, getDetailCompareEdit } from "../../service/compare"
import { useEffect } from "react"
import UploadDataOne from '../../component/form/UploadDataOne'
import UploadDataTwo from '../../component/form/UploadDataTwo'
import UploadDataThree from '../../component/form/UploadDataThree'
import SelectCompul from "../../component/form/SelectCompul"
import { listOption } from "../../service/car/Compulsory"
import State from "../../component/quotation_about/State"
import Badge from "../../component/quotation_about/Badge"
import { BiSolidFileJpg, BiSolidFilePdf } from "react-icons/bi"
import Swal from "sweetalert2"

const initialData = {
    quotation_number: '',
    quotation_date: '',
    insurance_company: '',
    repair_type: '',
    car_brand: '',
    car_model: '',
    car_year: '',
    engine_size: '',
    insurance_type: '',
    coverage_amount: '',
    premium_total: '',
    thirdparty_injury_death_per_person: '',
    thirdparty_injury_death_per_accident: '',
    thirdparty_property: '',
    car_own_damage: '',
    car_own_damage_deductible: '',
    car_fire_theft: '',
    additional_personal_permanent_driver_cover: '',
    additional_medical_expense_cover: '',
    additional_bail_bond: '',
    additional_personal_permanent_driver_number: '',
}

const QuotationDetail = () => {
    const token = useInsureAuth((s) => s.token)
    const [activeTab, setActiveTab] = useState(1)
    const [usageID, setUsageID] = useState(null)
    const [compulsory, setCompulsory] = useState([])
    //PDF (ไม่เกี่ยวกับ create quotation)
    const [pdfPreviewByTab, setPdfPreviewByTab] = useState({
        1: null,
        2: null,
        3: null
    })
    //เก็บข้อมูลบริษัท
    const [quotationByTab, setQuotationByTab] = useState({
        1: { company_id: '' },
        2: { company_id: '' },
        3: { company_id: '' }
    })
    //เก็บข้อมูลฟอร์มที่กรอก
    const [formByTab, setFormByTab] = useState({
        1: { ...initialData },
        2: { ...initialData },
        3: { ...initialData }
    })

    const [compulsoryByTab, setCompulsoryByTab] = useState({
        1: null,
        2: null,
        3: null
    })

    const [dataSuccess, setDataSuccess] = useState({
        1: '',
        2: '',
        3: ''
    })

    const [quotationIdByTab, setQuotationIdByTab] = useState({
        1: null,
        2: null,
        3: null
    })

    const [detail, setDetail] = useState({})
    const { q_id } = useParams();

    useEffect(() => {
        if (!q_id) return
        getDetailHeader();
        getDetailBodygetDetailBody();
    }, [q_id])

    useEffect(() => {
        if (!usageID) return;
        getCompulsoryOption(usageID);
    }, [usageID])

    //onChange สำหรับสร้าง quotation (บริษัท)
    const hdlQuotationChange = (e) => {
        const { name, value } = e.target

        setQuotationByTab(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [name]: value
            }
        }))
    }

    //onChange สำหรับกรอกข้อมูลรายละเอียด
    const hdlFormChange = (e) => {
        const { name, value } = e.target

        setFormByTab(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [name]: value
            }
        }))
    }

    //onChange สำหรับ PDF
    const hdlPdfChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.type !== 'application/pdf') {
            toast.error('กรุณาเลือกไฟล์ PDF เท่านั้น')
            return
        }

        setPdfPreviewByTab(prev => ({
            ...prev,
            [activeTab]: URL.createObjectURL(file)
        }))
    }

    const getDetailHeader = async () => {
        if (!q_id) return

        try {
            const res = await getDetailCompare(token, q_id)
            const data = res.data.data

            setDetail(data)
            setUsageID(data.usageid)
        } catch (err) {
            console.log(err)
        }
    }

    const getDetailBody = async () => {
        if (!q_id) return

        try {
            const res = await getDetailCompareEdit(q_id)
            const data = res.data.data

            setFormByTab(prev => ({
                ...prev,
                [activeTab]: {
                    ...prev[activeTab],
                    ...data.fields   // หรือ data.detail แล้วแต่ชื่อจาก backend
                }
            }))
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

    const handleSaveQuotation = async (e) => {
        e.preventDefault()
        const currentQuotation = quotationByTab[activeTab]

        if (!currentQuotation.company_id) {
            toast.error('กรุณาเลือกบริษัท')
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
            ...formByTab[activeTab],
            compulsory_amount: amount
        }

        try {
            const res = await createFieldsQuotation(token, {
                compare_id: q_id,
                company_id: currentQuotation.company_id,
                doc_id: activeTab,
                fields: payload   // ข้อมูลจาก form ที่ผู้ใช้กรอก
            })

            toast.success(res.data.msg)

            setQuotationIdByTab(prev => ({
                ...prev,
                [activeTab]: res.data.quotationId
            }))
            setDataSuccess(prev => ({
                ...prev,
                [activeTab]: `เอกสารฉบับที่ ${activeTab} บันทึกสำเร็จแล้ว`
            }))
        } catch (err) {
            console.log(err)
            toast.error('บันทึกไม่สำเร็จ')
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
                [activeTab]: { ...initialData }
            }))
            setCompulsoryByTab(prev => ({
                ...prev,
                [activeTab]: null
            }))
        } catch (err) {
            console.log(err)
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

    const createJPEG = async () => {
        try {
            const res = await createJPG(token, q_id)

            const blob = new Blob([res.data], { type: 'image/jpeg' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `quotation_${q_id}.jpg`; // ชื่อไฟล์
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.log(err)
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
                    <button onClick={createComparePDF} className='btn bg-text-primary rounded-md h-full text-white hover:bg-[#202b3b]'><BiSolidFilePdf size={20} /> PDF</button>
                    <button onClick={createJPEG} className='btn bg-text-primary rounded-md h-full text-white hover:bg-[#202b3b]'><BiSolidFileJpg size={20} /> JPEG</button>
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
                        <UploadDataOne
                            onChangeCompany={hdlQuotationChange}
                            onChangePDF={hdlPdfChange}
                            onSubmit={handleSaveQuotation}
                            form={quotationByTab[activeTab]}
                        />

                    )}
                    {activeTab === 2 && (
                        <UploadDataTwo
                            onChangeCompany={hdlQuotationChange}
                            onChangePDF={hdlPdfChange}
                            onSubmit={handleSaveQuotation}
                            form={quotationByTab[activeTab]}
                        />

                    )}
                    {activeTab === 3 && (
                        <UploadDataThree
                            onChangeCompany={hdlQuotationChange}
                            onChangePDF={hdlPdfChange}
                            onSubmit={handleSaveQuotation}
                            form={quotationByTab[activeTab]}
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
                                data={formByTab[activeTab]}
                                onChange={hdlFormChange}
                                onSubmit={handleSaveQuotation}
                                onDelete={removeQuotation}
                                quotation_id={quotationIdByTab[activeTab]}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default QuotationDetail