import { useState } from "react"
import useInsureAuth from "../../store/auth-store"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import TableQuotation from "../../component/table/TableQuotation"
import { createFieldsQuotation } from "../../service/quotation"
import { getDetailCompare } from "../../service/compare"
import { useEffect } from "react"
import UploadDataOne from '../../component/form/UploadDataOne'
import UploadDataTwo from '../../component/form/UploadDataTwo'
import UploadDataThree from '../../component/form/UploadDataThree'

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

const Compare = () => {
    const token = useInsureAuth((s) => s.token)
    const [activeTab, setActiveTab] = useState(1)
    const navigate = useNavigate();
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

    const [detail, setDetail] = useState({})
    const { q_id } = useParams();

    useEffect(() => {
        if (!q_id) return
        getDetail();
    }, [q_id])

    console.log(q_id)

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

    console.log('useParams q_id =', q_id)

    const getDetail = async () => {
        if (!q_id) return

        try {
            const res = await getDetailCompare(token, q_id)
            setDetail(res.data.data)
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

        try {
            const res = await createFieldsQuotation(token, {
                compare_id: q_id,
                company_id: currentQuotation.company_id,
                doc_id: activeTab,
                fields: formByTab[activeTab]   // ข้อมูลจาก form ที่ผู้ใช้กรอก
            })

            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error('บันทึกไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col p-5 font-prompt'>
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
                <button className='btn bg-text-primary rounded-md px-7 text-white hover:bg-[#202b3b]'>พิมพ์ PDF</button>
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

                    <UploadDataOne
                        onChangeCompany={hdlQuotationChange}
                        onChangePDF={hdlPdfChange}
                        onSubmit={handleSaveQuotation}
                        form={quotationByTab[activeTab]}
                    />
                }
                {activeTab === 2 &&
                    <UploadDataTwo
                        onChangeCompany={hdlQuotationChange}
                        onChangePDF={hdlPdfChange}
                        onSubmit={handleSaveQuotation}
                        form={quotationByTab[activeTab]}
                    />
                }
                {activeTab === 3 &&
                    <UploadDataThree
                        onChangeCompany={hdlQuotationChange}
                        onChangePDF={hdlPdfChange}
                        onSubmit={handleSaveQuotation}
                        form={quotationByTab[activeTab]}
                    />
                }
                <div className="flex gap-2 h-192.5 overflow-y-clip">
                    <div className="flex-1 overflow-auto bg-zinc-800 p-4">
                        {pdfPreviewByTab ? (
                            <iframe
                                src={`${pdfPreviewByTab[activeTab]}#zoom=120`}
                                className="w-full h-full bg-white rounded"
                                title="PDF Preview"
                            />
                        ) : (
                            <div className="flex justify-center items-center h-full text-zinc-400">
                                กรุณาเลือกไฟล์ PDF เพื่อดูตัวอย่าง
                            </div>
                        )}
                    </div>
                    <div className="overflow-y-auto">
                        <TableQuotation
                            data={formByTab[activeTab]}
                            onChange={hdlFormChange}
                            onSubmit={handleSaveQuotation}
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Compare