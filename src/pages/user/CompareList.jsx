import { useEffect, useState } from "react"
import { listComparePremium } from "../../service/insurance/PremiumInsur"
import CardPremiumList from "../../component/card/CardPremiumList";
import { FaNoteSticky } from "react-icons/fa6";
import { createJPEG } from "../../utils/jpg";
import { createComparePDF } from "../../utils/pdf";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import TabBackward from "../../component/mobile/TabBackward";
import { deleteCompareMember } from "../../service/compare";
import { useNavigate } from "react-router-dom";

const CompareList = () => {
    const [data, setData] = useState([])
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

    // console.log(data)

    const hdlDelete = async (id) => {
        const result = await Swal.fire({
            title: "คุณแน่ใจ ?",
            text: "ต้องการจะลบจริง ๆ ใช่ไหม?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#E5E4E2",
            confirmButtonColor: "#d33",
            confirmButtonText: "ลบ",
            cancelButtonText: 'ยกเลิก'
        })

        if (!result.isConfirmed) return

        setData(prev => prev.filter(q => q.compare_id !== id))

        try {
            const res = await deleteCompareMember(id)
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
            if (err.response?.status === 401) {
                setIsUnauth(true)
                return
            }
            fetchCompareQuotaion()
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
                                    <button onClick={() => hdlDelete(i.compare_id)} className="btn btn-xs">ลบ</button>
                                </div>
                            </div>
                            <div className="p-2 space-y-2">
                                {
                                    i.premiums.map((j, idx) => (
                                        <CardPremiumList
                                            key={idx}
                                            premiums={j}
                                        />
                                    ))
                                }
                            </div>
                            <div className="flex justify-end gap-1 px-2 pb-2">
                                <button
                                    onClick={() => createComparePDF(i.compare_id)}
                                    type="button"
                                    className="btn btn-xs text-text-primary">PDF</button>
                                <button
                                    onClick={() => createJPEG(i.compare_id)}
                                    type="button"
                                    className="btn btn-xs text-text-primary">JPEG</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default CompareList