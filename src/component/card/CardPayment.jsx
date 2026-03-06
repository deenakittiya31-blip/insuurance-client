import { useState } from "react"
import { TbZoomMoney } from "react-icons/tb"
import { BiSolidDiscount } from "react-icons/bi";

const CardPayment = ({ id, payments, groups }) => {
    const [activeTab, setActiveTab] = useState(1)
    return (
        <div>
            <button className="badge badge-xs badge-ghost text-text-primary cursor-pointer" onClick={() => document.getElementById(`modalPayment-${id}`).showModal()}><TbZoomMoney /> <span className="hover:underline">ดูวิธีชำระเงิน</span></button>
            <dialog id={`modalPayment-${id}`} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <h3 className="font-bold text-lg">ข้อมูลส่วนลด</h3>
                        <div role="tablist" className="tabs">
                            <a
                                role="tab"
                                className={`tab font-medium ${activeTab === 1 ? "tab-active" : ""}`}
                                onClick={() => setActiveTab(1)}
                            >
                                ส่วนลดวิธีการชำระเงิน
                            </a>
                            <a
                                role="tab"
                                className={`tab font-medium ${activeTab === 2 ? "tab-active" : ""}`}
                                onClick={() => setActiveTab(2)}
                            >
                                ส่วนลดตามเลเวล
                            </a>
                        </div>
                        <div>
                            {activeTab === 1 && (
                                <div className="grid gap-3">
                                    {
                                        payments.length > 0 ? (
                                            payments.map((p, idx) => (
                                                <div key={idx} className="flex gap-3 rounded-sm overflow-clip shadow">
                                                    <div className="bg-accent w-20 h-15 flex flex-col justify-center items-center p-2">
                                                        <BiSolidDiscount />
                                                        <p className="text-[10px] font-medium text-center">{p.payment_name}</p>
                                                    </div>
                                                    <div className="flex-1 h-full">
                                                        {
                                                            p.payment_method_id === 1 && (
                                                                <div className="grid grid-cols-2 h-full gap-3">
                                                                    <div className="h-full grid items-center justify-items-center">
                                                                        <span className="font-normal text-gray-300 text-[8px]">ส่วนลดเปอร์เซนต์</span>
                                                                        <span className="font-semibold">{p.discount_percent} %</span>
                                                                    </div>
                                                                    <div className="h-full grid items-center justify-items-center">
                                                                        <span className="font-normal text-gray-300 text-[8px]">ส่วนลดเงินบาท</span>
                                                                        <span className="font-semibold">{p.discount_amount} บาท</span>
                                                                    </div>

                                                                    {/* <p>ส่วนลดจำนวนเงิน : <span className="font-semibold">{p.discount_amount} เดือน</span></p> */}
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            p.payment_method_id === 2 && (
                                                                <div className="grid grid-cols-2 h-full gap-3">
                                                                    <div className="h-full grid items-center justify-items-center">
                                                                        <span className="font-normal text-gray-300 text-[8px]">ส่วนลดเปอร์เซนต์</span>
                                                                        <span className="font-semibold">{p.discount_percent} %</span>
                                                                    </div>
                                                                    <div className="h-full grid items-center justify-items-center">
                                                                        <span className="font-normal text-gray-300 text-[8px]">ส่วนลดเงินบาท</span>
                                                                        <span className="font-semibold">{p.discount_amount} บาท</span>
                                                                    </div>

                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            p.payment_method_id === 3 && (
                                                                <div className="grid content-center h-full">
                                                                    <p className="font-semibold text-[10px]">ส่วนลด {p.discount_percent} % ส่วนลดเงินบาท {p.discount_amount} บาท</p>
                                                                    <p className="text-[10px]">ค่าธรรมเนียม {p.charge} บาท ผ่อนได้ {p.installment_min}-{p.installment_max} เดือน</p>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            p.payment_method_id === 4 && (
                                                                <div className="grid grid-cols-3 h-full gap-3 pr-1">
                                                                    <div className="h-full grid items-center justify-items-center">
                                                                        <span className="font-normal text-gray-300 text-[8px]">ส่วนลดเปอร์เซนต์</span>
                                                                        <span className="font-semibold">{p.discount_percent} <span className="text-[8px]">%</span></span>
                                                                    </div>
                                                                    <div className="h-full grid items-center justify-items-center">
                                                                        <span className="font-normal text-gray-300 text-[8px]">ส่วนลดเงินบาท</span>
                                                                        <span className="font-semibold">{p.discount_amount} <span className="text-[8px]">บาท</span></span>
                                                                    </div>
                                                                    <div className="h-full grid items-center justify-items-center">
                                                                        <span className="font-normal text-gray-300 text-[8px]">ผ่อนสูงสุด</span>
                                                                        <span className="font-semibold">{p.installment_min} <span className="text-[8px]">เดือน</span></span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>


                                                    {/* <p>{p.discount_percent}</p>
                                                    <p>{p.discount_amount}</p>
                                                    <p>{p.first_payment_amount}</p>
                                                    <p>{p.charge}</p>
                                                    <p>{p.installment_min}</p>
                                                    <p>{p.installment_max}</p> */}
                                                </div>
                                            ))
                                        )
                                            : (
                                                <p className="text-sm text-center text-gray-400">ไม่มีส่วนลด</p>
                                            )
                                    }

                                </div>
                            )}
                            {activeTab === 2 && (
                                <div className="grid grid-cols-2 gap-3">
                                    {/* ✅ เช็ค null ก่อน */}
                                    {groups?.discount_percent != null ? (
                                        <div className="flex gap-3 rounded-sm overflow-clip shadow">
                                            <div className="bg-main w-15 h-15 flex flex-col items-center justify-center">
                                                <p className="font-semibold text-lg capitalize text-white">
                                                    {groups.group_name}
                                                </p>
                                                <p className="font-normal text-[10px] capitalize text-text-primary">เลเวลลูกค้า</p>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <p className="text-[10px]">
                                                    <span className="text-sm font-semibold">{groups.discount_percent}</span> เปอร์เซนต์
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-center text-gray-400 col-span-2">ไม่มีส่วนลดตามเลเวล</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
export default CardPayment