import { FaCar, FaMoneyBillWave } from "react-icons/fa6"
import { IoIosArrowForward } from "react-icons/io"
import { numberFormat } from "../../utils/numerral"
import { FaCarCrash } from "react-icons/fa"
import CardDetails from "./CardDetails"
import CardPayment from "./CardPayment"
import { TbDiscount } from "react-icons/tb"

const Promotion = ({ id, promotion_img, promotion_name }) => {
    return (
        <div>
            <button className="badge badge-xs badge-ghost text-text-primary cursor-pointer" onClick={() => document.getElementById(`modalPromotion-${id}`).showModal()}><TbDiscount /> <span className="hover:underline">โปรโมชั่น</span></button>
            <dialog id={`modalPromotion-${id}`} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-3">🎉 {promotion_name}</h3>
                    <div className="w-full rounded-md overflow-clip">
                        <img src={promotion_img} className="w-full h-full object-cover" />
                    </div>

                </div>
            </dialog>
        </div>
    )
}

const CardProduct = ({ data, onChange, checked }) => {
    return (
        <div className="flex flex-col gap-3 bg-white shadow-lg rounded-2xl w-full p-5 text-text-primary">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 border border-gray-300 rounded-md overflow-clip">
                            <img src={data.logo_url} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">{data.namecompany}</p>
                            <button className="bg-[#c2bfbe] rounded-full text-[10px] text-white font-normal px-3">ประกัน{data.nametype}</button>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input
                            type="checkbox"
                            className="checkbox"
                            value={data.index_premium}
                            checked={checked}
                            onChange={onChange}
                        />
                        <p className="text-[10px] font-nomal">เปรียบเทียบ</p>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <button className="badge bg-[#f6f5f3] text-text-primary text-xs"><FaCarCrash className="text-main size-4" /> {data.repair_type}</button>

                    {
                        (data.payments.includes(3) || data.payments.includes(4)) && (
                            <button className="flex justify-center items-center gap-2 text-xs font-nomal rounded-md bg-[#f6f5f3] px-3 py-1"><FaMoneyBillWave className="text-main size-4" />
                                ผ่อนได้
                            </button>
                        )
                    }
                    <div className="flex gap-1">
                        {
                            data.premium_name && (
                                <Promotion
                                    id={data.index_premium}
                                    promotion_img={data.promotion_img}
                                    promotion_name={data.promotion_name}
                                />
                            )
                        }

                        <CardPayment
                            id={data.index_premium}
                            payments={data.payments}
                            groups={data.groups}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-[#e3e3e2] my-1"></div>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-sm">{data.premium_name}</h1>
                    <div>
                        <p className="text-end text-[10px] font-nomal">ทุนประกัน</p>
                        <p className="font-semibold text-xs">{numberFormat(data.
                            repair_fund_int
                        )} บาท</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div >
                        <p className="text-[10px] font-nomal">ค่าเสียหายส่วนแรก</p>
                        <p className="font-semibold text-xs">{numberFormat(data.car_own_damage_deductible)
                        } บาท</p>
                    </div>
                    <div className="text-end">
                        <p className="text-[10px] font-nomal">ทรัพย์สินบุคคลภายนอก</p>
                        <p className="font-semibold text-xs">{numberFormat(data.thirdparty_property)
                        } บาท</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="flex justify-evenly items-center gap-3 p-2 rounded-md bg-main hover:bg-[#f17e1f] text-white transition duration-400 ease-in-out hover:scale-105 hover:shadow-sm">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-normal">เบี้ยประกันต่อ/ปี</span>
                        <div className="flex justify-end items-baseline gap-1">
                            <span className="font-bold text-sm tracking-wide">฿{numberFormat(data.
                                selling_price_final)}</span>
                            <del className="font-medium text-[#ede9e7] text-[10px]">฿{numberFormat(data.total_premium)}</del>
                        </div>

                    </div>
                    <IoIosArrowForward className="2xl:size-7" />
                </div>
                <CardDetails
                    id={data.index_premium}
                    car_protect={data.car_protect}
                    third_protect={data.third_protect}
                    additional_protect={data.additional_protect}
                    logo_url={data.logo_url}
                    namecompany={data.namecompany}
                    nametype={data.nametype}
                    repair_type={data.repair_type}
                    payments={data.payments}
                    number_of_seats={data.additional_personal_permanent_driver_number}
                    selling_price={data.selling_price}
                />
            </div >
        </div >
    )
}
export default CardProduct