import { FaBriefcaseMedical } from "react-icons/fa";
import { FaWrench, FaXmark } from "react-icons/fa6"
import { LuWrench } from "react-icons/lu";
import { TbRosetteDiscountFilled } from "react-icons/tb";
import { numberFormat } from "../../utils/numerral";

const CardPremium = ({ data, onDelete }) => {
    return (
        <div className="relative w-auto h-auto">
            <span
                onClick={() => onDelete(data.index_premium)}
                className='absolute -top-2 -right-2 bg-error rounded-full p-1 z-50'>
                <FaXmark className='size-6 text-white' />

            </span>
            <div className="shadow border border-border/25 w-full h-full rounded-2xl p-3 space-y-3">
                {/* หัวการ์ด */}
                <div className="flex items-center gap-3" >
                    <div className="w-10 h-10 rounded-lg border border-text-primary overflow-clip">
                        <img src={data.logo_url} alt={data.namecompany} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="font-bold text-base">{data.namecompany}</p>
                        <span className="font-medium text-xs">{data.package_id}</span>
                    </div>
                </div>
                {/* ข้อมูลการ์ด */}
                <div className="space-y-3">
                    <p className="font-bold text-sm">{data.package_name} <span className="font-normal text-gray-400">({data.nametype})</span></p>
                    <div className="grid grid-cols-2">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <FaWrench size={15} />
                                <p className="font-medium text-sm">{numberFormat(data.repair_fund_max)} บาท</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaBriefcaseMedical size={15} />
                                <p className="font-medium text-sm">{numberFormat(data.medical_expense
                                )} บาท</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <TbRosetteDiscountFilled size={20} />
                                <p className="font-medium text-sm">{data.premium_discount} %</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-3">
                                <p className="font-bold text-sm">ราคารวม</p>
                                <span className="font-medium text-sm">{numberFormat(data.total_premium)} บาท</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="font-bold text-sm">ราคาสุทธิ</p>
                                <span className="font-medium text-sm">{numberFormat(data.net_income)} บาท</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-px bg-border/25" />
                {/* ท้ายการ์ด */}
                <button className="w-full rounded-lg btn bg-main text-white">ราคาขาย {numberFormat(data.selling_price)} บาท</button>
            </div>

        </div>
    )
}
export default CardPremium