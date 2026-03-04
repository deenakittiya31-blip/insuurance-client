import { FaCarCrash, FaMoneyBillWave } from "react-icons/fa"
import { numberFormat } from "../../utils/numerral"

const CardDetails = ({ id, car_protect, third_protect, additional_protect, logo_url, namecompany, nametype, repair_type, payments, number_of_seats, selling_price, onCreateOrder }) => {
    return (
        <div>
            <button className="w-full h-full border border-gray-200 rounded-md font-medium bg-white hover:bg-gray-100 text-sm transition duration-400 ease-in-out hover:scale-105 hover:shadow-sm" onClick={() => document.getElementById(`modalDetail-${id}`).showModal()}>ความคุ้มครอง</button>
            <dialog id={`modalDetail-${id}`} className="modal">
                <div className="modal-box">
                    <form method="dialog" className="mb-5">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 border border-gray-300 rounded-md overflow-clip">
                                        <img src={logo_url} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{namecompany}</p>
                                        <button className="bg-[#c2bfbe] rounded-full text-[10px] text-white font-normal px-3">ประกัน{nametype}</button>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <p className="text-[10px] font-nomal"><span className="font-semibold text-base text-main">647</span> บาท/เดือน</p>
                                    <p className="text-[10px] font-nomal">(ผ่อนสูงสุด นาน 10 เดือน)</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="badge bg-[#f6f5f3] text-text-primary text-xs"><FaCarCrash className="text-main size-4" /> {repair_type}</button>

                                {
                                    (payments.includes(3) || payments.includes(4)) && (
                                        <button className="flex justify-center items-center gap-2 text-xs font-nomal rounded-md bg-[#f6f5f3] px-3 py-1"><FaMoneyBillWave className="text-main size-4" />
                                            ผ่อนได้
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                        <div className="w-full h-px bg-[#e3e3e2] my-3"></div>
                        {/* ตารางการคุ้มครอง */}
                        <div className="flex flex-col gap-3 h-72 overflow-y-auto text-text-primary px-2">
                            {/* คุ้มครองรถยนต์ */}
                            <div>
                                <h1 className="font-bold text-xs mb-2">คุ้มครองรถยนต์</h1>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-xs font-normal">ค่าเสียหายส่วนแรก</span>
                                        <span className="text-xs font-medium">{car_protect.car_own_damage_deductible === null ? 'ไม่มี' : `${numberFormat(car_protect.car_own_damage_deductible)} บาท`}</span>
                                    </div>
                                    <div className="w-full h-px bg-[#e3e3e2]"></div>
                                    <div className="flex justify-between">
                                        <span className="text-xs font-normal">รถยนต์เสียหาย</span>
                                        <span className="text-xs font-medium">{car_protect.car_own_damage === null ? 'ไม่มี' : `${numberFormat(car_protect.car_own_damage)} บาท`}</span>
                                    </div>
                                    <div className="w-full h-px bg-[#e3e3e2]"></div>
                                    <div className="flex justify-between">
                                        <span className="text-xs font-normal">รถยนต์สูญหาย / ไฟไหม้</span>
                                        <span className="text-xs font-medium">{car_protect.car_lost_fire === null ? 'ไม่มี' : `${numberFormat(car_protect.car_lost_fire)} บาท`}</span>
                                    </div>
                                    <div className="w-full h-px bg-[#e3e3e2]"></div>
                                </div>
                            </div>
                            {/* คุ้มครองภายนอก (บุคคลที่ 3) */}
                            <div>
                                <h1 className="font-bold text-xs mb-2">คุ้มครองภายนอก (บุคคลที่ 3)</h1>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-xs font-normal">ทรัพย์สิน</span>
                                        <span className="text-xs font-medium">{third_protect.thirdparty_property === null ? 'ไม่มี' : `${numberFormat(third_protect.thirdparty_property)} / ครั้ง`}</span>
                                    </div>
                                    <div className="w-full h-px bg-[#e3e3e2]"></div>
                                    <div className="flex justify-between">
                                        <span className="text-xs font-normal">ร่างกาย</span>
                                        <span className="text-xs font-medium">{third_protect.thirdparty_injury_death_per_person === null ? 'ไม่มี' : `${numberFormat(third_protect.thirdparty_injury_death_per_person)} / คน`}</span>
                                    </div>
                                    <div className="w-full h-px bg-[#e3e3e2]"></div>
                                    <div className="flex justify-between">
                                        <span className="text-xs font-normal">บาดเจ็บ + เสียชีวิต</span>
                                        <span className="text-xs font-medium">{third_protect.thirdparty_injury_death_per_accident === null ? 'ไม่มี' : `${numberFormat(third_protect.thirdparty_injury_death_per_accident)} / ครั้ง`}</span>
                                    </div>
                                    <div className="w-full h-px bg-[#e3e3e2]"></div>
                                </div>
                            </div>
                            {/* คุ้มครองบุคคลภายในรถ */}
                            <div>
                                <h1 className="font-bold text-xs mb-2">คุ้มครองบุคคลภายในรถ</h1>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-xs font-normal">อุบัติเหตุส่วนบุคคล ({number_of_seats}) คน</span>
                                        <span className="text-xs font-medium">{additional_protect.additional_personal_permanent_driver_cover === null ? 'ไม่มี' : `${numberFormat(additional_protect.additional_personal_permanent_driver_cover)} / คน`}</span>
                                    </div>
                                    <div className="w-full h-px bg-[#e3e3e2]"></div>
                                    <div className="flex justify-between">
                                        <span className="text-xs font-normal">ค่ารักษาพยาบาล ({number_of_seats}) คน</span>
                                        <span className="text-xs font-medium">{additional_protect.additional_medical_expense_cover === null ? 'ไม่มี' : `${numberFormat(additional_protect.additional_medical_expense_cover)} / คน`}</span>
                                    </div>
                                    <div className="w-full h-px bg-[#e3e3e2]"></div>
                                    <div className="flex justify-between">
                                        <span className="text-xs font-normal">การประกันตัวผู้ขับขี่</span>
                                        <span className="text-xs font-medium">{additional_protect.additional_bail_bond === null ? 'ไม่มี' : `${numberFormat(additional_protect.additional_bail_bond)} / ครั้ง`}</span>
                                    </div>
                                    <div className="w-full h-px bg-[#e3e3e2]"></div>
                                </div>
                            </div>
                        </div>
                        {/* ปุ่มซื้อ */}
                        <div className="flex justify-center mt-3">
                            <div onClick={onCreateOrder} className="flex justify-center items-center gap-5 py-2 px-5 rounded-md w-fit bg-main hover:bg-[#f17e1f] text-white transition duration-400 ease-in-out hover:scale-105 hover:shadow-sm">
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-normal">เบี้ยประกันต่อ/ปี</span>
                                    <div className="flex justify-end items-baseline gap-1">
                                        <span className="font-bold text-sm tracking-wide">฿{numberFormat(selling_price)}</span>
                                        <del className="font-medium text-[#ede9e7] text-[10px]">฿2,000</del>
                                    </div>

                                </div>
                                <span className="font-semibold text-lg">ซื้อเลย</span>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
export default CardDetails