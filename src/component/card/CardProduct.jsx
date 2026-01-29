import { FaCar, FaMoneyBillWave } from "react-icons/fa6"
import { IoIosArrowForward } from "react-icons/io"

const CardProduct = ({ data }) => {
    return (
        <div className="flex flex-col gap-5 bg-white rounded-md w-auto p-5 transition duration-400 ease-in-out hover:-translate-y-1.25 hover:shadow-md">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border border-gray-300 rounded-md overflow-clip">
                            <img src={data.image} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-sm">{data.company}</p>
                            <button className="btn btn-xs rounded-full px-3">ประกันชั้น 1</button>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" className="checkbox" />
                        <p className="text-xs font-medium">เปรียบเทียบ</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex justify-center items-center gap-2 text-xs font-semibold rounded-md bg-blue-100/50 px-3 py-1"><FaCar className="text-blue-600 size-4" /> ซ่อมอู่</button>
                    <button className="flex justify-center items-center gap-2 text-xs font-semibold rounded-md bg-blue-100/50 px-3 py-1"><FaMoneyBillWave className="text-blue-600 size-4" /> ผ่อนได้</button>
                </div>
            </div>
            <div className="w-full h-px bg-gray-200 my-3"></div>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <h1 className="font-bold text-lg ">Motor Type 2+</h1>
                    <div>
                        <p className="text-end text-xs font-medium">ทุนประกัน</p>
                        <p className="font-semibold">100,000 บาท</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div >
                        <p className="text-xs font-medium">ค่าเสียหายส่วนแรก</p>
                        <p className="font-medium">2,000 บาท</p>

                    </div>
                    <div className="text-end">
                        <p className="font-medium text-xs"><span className="font-semibold text-base text-blue-600">647</span> บาท/เดือน</p>
                        <p className="text-xs font-medium">(ผ่อนสูงสุด นาน 10 เดือน)</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-3 p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
                    <span className="flex flex-col">
                        <span className="text-[10px] font-semibold">เบี้ยประกันต่อ/ปี</span>
                        <span className="flex gap-1 font-bold text-xs 2xl:text-sm">฿3,000 <del className="font-normal">฿2,000</del></span>
                    </span>
                    <IoIosArrowForward className="2xl:size-7" />
                </button>
                <button className="h-full border border-gray-200 rounded-md bg-white hover:bg-gray-100 text-sm 2xl:text-base">รายละเอียด</button>
            </div>
        </div>
    )
}
export default CardProduct