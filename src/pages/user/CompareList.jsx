import { useEffect, useState } from "react"
import { listComparePremium } from "../../service/insurance/PremiumInsur"
import { FaPaperclip } from "react-icons/fa";
import CardPremiumList from "../../component/card/CardPremiumList";
import { FaNoteSticky } from "react-icons/fa6";
import { createJPEG } from "../../utils/jpg";
import { createComparePDF } from "../../utils/pdf";
import toast from "react-hot-toast";
import { deleteQuotationCompare } from "../../service/compare";
import Swal from "sweetalert2";

const CompareList = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchCompareQuotaion();
    }, [])

    const fetchCompareQuotaion = async () => {
        try {
            const res = await listComparePremium()

            setData(res.data.data)
        } catch (err) {
            console.log(err)
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
            const res = await deleteQuotationCompare(id)
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
            fetchCompareQuotaion()
        }
    }
    return (
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
                            <div className="space-x-1">
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
                        <div className="flex justify-end items-center gap-2 px-2 pb-2">
                            <button className="btn btn-xs">ลบ</button>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}
export default CompareList