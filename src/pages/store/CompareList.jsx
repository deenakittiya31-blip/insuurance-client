import { useEffect, useState } from "react"
import { listComparePremium } from "../../service/insurance/PremiumInsur"
import CardPremiumList from "../../component/card/CardPremiumList";
import { FaNoteSticky } from "react-icons/fa6";
import { createComparePDF } from "../../utils/pdf";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import TabBackward from "../../component/mobile/TabBackward";
import { deleteCompareMember } from "../../service/compare";
import { Link, useNavigate } from "react-router-dom";
import useInsureAuth from "../../store/auth-store";
import { sendDocumentToMember } from "../../service/member";
import { createOrder } from "../../service/order/order";

const CompareList = () => {
    const [data, setData] = useState([])
    const member = useInsureAuth((m) => m.member)
    const navigate = useNavigate()
    const [isUnauth, setIsUnauth] = useState(false)
    useEffect(() => {
        fetchCompareQuotaion();
    }, [])

    const fetchCompareQuotaion = async () => {
        try {
            const res = await listComparePremium()

            setData(res.data.data)
        } catch (err) {
            console.log(err)
            if (err.response?.status === 401) {
                setIsUnauth(true) // แสดง UI แทน navigate
            }
        }
    }

    const sendMessage = async (compareId) => {
        const memberId = [member?.user_id]

        try {
            const res = await sendDocumentToMember(memberId, compareId, 'member')
            toast.success(res.data.msg)
        } catch (error) {
            console.log(error)
            toast.error('ส่งไม่สำเร็จ')
        }
    }

    console.log(data)

    const handleCreteOrder = async (compareId, item) => {

        try {
            const res = await createOrder({
                compare_id: compareId,
                package_id: item.index_package,
                premium_id: item.index_premium,
                member_id: member.id
            })
            navigate(`/store/order/checkout/${res.data.order_id}`)
        } catch (err) {
            toast.error('เกิดข้อผิดพลาด')
        }
    }

    if (isUnauth) return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-3 font-prompt">
            <p className="text-text-primary font-medium">กรุณาเข้าสู่ระบบก่อนดูใบเสนอราคา</p>
            <button
                onClick={() => navigate('/member-login')}
                className="btn btn-sm btn-neutral"
            >
                เข้าสู่ระบบ
            </button>
        </div>
    )
    return (
        <div>
            <TabBackward
                linkTo='/store'
                title='ใบเสนอราคา'
            />
            <div className="p-5 font-prompt space-y-3">
                {/* card quotation */}
                {
                    data.map((i) => (
                        <div key={i.compare_id} className="bg-white shadow-sx rounded-md w-full">
                            <div className="flex justify-between items-center p-2">
                                <div className="flex items-center gap-1">
                                    <FaNoteSticky className="size-3 text-text-primary" />
                                    <p className="font-medium text-sm text-text-primary">{i.compare_id}</p>
                                </div>
                                <div className="flex justify-end items-center gap-2">
                                    <button
                                        onClick={() => sendMessage(i.compare_id)}
                                        type="button"
                                        className="btn btn-xs text-text-primary">ส่งข้อมูลเข้าไลน์</button>
                                    <Link to={`/store/compare-insurance/${i.compare_id}`}>
                                        <button type="button" className="btn btn-xs text-text-primary">เปรียบเทียบ</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-2 space-y-2">
                                {
                                    i.premiums.map((j, idx) => (
                                        <CardPremiumList
                                            key={idx}
                                            premiums={j}
                                            onCreateOrder={() => handleCreteOrder(i.compare_id, j)}
                                            have={true}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default CompareList