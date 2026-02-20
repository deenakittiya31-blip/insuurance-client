import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { previewCompareMember } from '../service/insurance/PremiumInsur'
import toast from "react-hot-toast"
import CardHeadCheckInsure from "../component/card/CardHeadCheckInsure"
import { RiInformation2Fill } from "react-icons/ri";
import { FaCarAlt } from "react-icons/fa";
import { FaUserShield, FaPeopleGroup } from "react-icons/fa6";

const rows = [
    { label: "ทุนประกัน", key: "total_premium" },
    { label: "ประเภทการซ่อม", key: "repair" },
    { label: "ค่าเสียหายส่วนแรก", key: "deductible" },

    { label: "รถเสียหาย", key: "car_own_damage" },
    { label: "รถสูญหาย/ไฟไหม้", key: "car_lost_fire" },

    { label: "อุบัติเหตุส่วนบุคคล", key: "driver_cover" },
    { label: "ค่ารักษาพยาบาล", key: "medical" },
    { label: "ประกันตัว", key: "bail_bond" },

    { label: "บาดเจ็บ + เสียชีวิต", key: "third_accident" },
    { label: "ร่างกาย", key: "third_person" },
    { label: "ทรัพย์สิน", key: "third_prop" },
]

const title = [
    {
        icon: <RiInformation2Fill />,
        label: 'รายละเอียดแผนประกัน'
    },
    {
        icon: <FaCarAlt />,
        label: 'คุ้มครองรถยนต์ที่เอาประกัน'
    },
    {
        icon: <FaUserShield />,
        label: ' คุ้มครองบุคคลภายในรถ'
    },
    {
        icon: <FaPeopleGroup />,
        label: 'คุ้มครองภายนอก (บุคคลที่ 3)'
    }
]

const sections = [
    {
        title: title[0],
        rows: [
            { label: "ทุนประกัน", key: "total_premium" },
            { label: "ประเภทการซ่อม", key: "repair" },
            { label: "ค่าเสียหายส่วนแรก", key: "deductible" },
        ],
    },
    {
        title: title[1],
        rows: [
            { label: "รถเสียหาย", key: "car_own_damage" },
            { label: "รถสูญหาย/ไฟไหม้", key: "car_lost_fire" },
        ],
    },
    {
        title: title[2],
        rows: [
            { label: "อุบัติเหตุส่วนบุคคล", key: "driver_cover" },
            { label: "ค่ารักษาพยาบาล", key: "medical" },
            { label: "ประกันตัว", key: "bail_bond" },
        ],
    },
    {
        title: title[3],
        rows: [
            { label: "บาดเจ็บ + เสียชีวิต", key: "third_accident" },
            { label: "ร่างกาย", key: "third_person" },
            { label: "ทรัพย์สิน", key: "third_prop" },
        ],
    },
]

const CompareInsure = () => {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [compare, setCompare] = useState(null)

    useEffect(() => {
        fetchPreview();
    }, [])

    const fetchPreview = async () => {
        try {
            const res = await previewCompareMember(id)
            setData(res.data.plans)
            setCompare(res.data.compare_id)
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || 'ดึงข้อมูลไม่สำเร็จ')
        }
    }
    return (
        <div className="py-5 space-y-3">
            <div className=" w-full">
                <div className="w-full p-3 bg-white border border-border/50 rounded-xl grid grid-cols-4 justify-items-center gap-1">
                    <div className="flex justify-center items-center text-center">
                        <p className="font-bold text-xs md:text-sm font-prompt">เปรียบเทียบแผนประกัน</p>
                    </div>

                    {
                        data.map((i, idx) => (
                            <CardHeadCheckInsure
                                key={idx}
                                data={i.premium}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="w-full h-full bg-white p-3 border border-border/50 rounded-xl font-prompt">
                {sections.map((section, sIndex) => (
                    <div key={sIndex} className="border-b border-border/40">

                        {/* Title */}
                        <div className="flex items-center gap-2 text-main font-semibold py-3">
                            {section.title.icon}
                            {section.title.label}
                        </div>

                        {/* Rows */}
                        {section.rows.map((row) => (
                            <div
                                key={row.key}
                                className="grid grid-cols-[105px_repeat(3,1fr)] md:grid-cols-[230px_repeat(3,1fr)] border-t border-border/30"
                            >
                                {/* Label */}
                                <div className="py-3 text-xs font-medium ">
                                    {row.label}
                                </div>

                                {/* Values */}
                                {data.map((plan, index) => (
                                    <div key={index} className="p-3 text-xs text-center">
                                        {plan.coverage[row.key]
                                            ? isNaN(plan.coverage[row.key])
                                                ? plan.coverage[row.key]
                                                : Number(plan.coverage[row.key]).toLocaleString()
                                            : "-"}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default CompareInsure