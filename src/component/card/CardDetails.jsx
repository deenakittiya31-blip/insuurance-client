import { FaCarCrash, FaMoneyBillWave } from "react-icons/fa"

const CardDetails = ({ car_protect, third_protect, additional_protect, logo_url, namecompany, nametype, repair_type, payments }) => {
    return (
        <div>
            <button className="w-full h-full border border-gray-200 rounded-md bg-white hover:bg-gray-100 text-sm 2xl:text-base transition duration-400 ease-in-out hover:scale-105 hover:shadow-sm" onClick={() => document.getElementById('modalDetail').showModal()}>รายละเอียด</button>
            <dialog id="modalDetail" className="modal">
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
                        <div></div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
export default CardDetails