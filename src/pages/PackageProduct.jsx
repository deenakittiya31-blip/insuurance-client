import { FaCar, FaEdit, FaBuilding } from "react-icons/fa";
import useActionStore from "../store/action-store";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosCheckmarkCircle } from "react-icons/io";
import { TiSpanner } from "react-icons/ti";
import { GoSortDesc } from "react-icons/go";
import CardProduct from "../component/card/CardProduct";

const data = [
    {
        company: 'วิริยะประกันภัย',
        image: 'https://www.chessbroker.com/admin/upload/news/f8d837512938c12424eff93757b94d30.jpg'
    },
    {
        company: 'ธนชาตประกันภัย',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzJcHVp_L9XVdOKmhaAPgPMHOr8plCaZ-IQ&s'
    },
    {
        company: 'เมืองไทยประกันภัย',
        image: 'https://yt3.googleusercontent.com/ytc/AIdro_kanxXmHHRFD7U3nJtSqL5DV7DONDBHxMsKLtdEdN3wyw=s900-c-k-c0x00ffffff-no-rj'
    },
]

const PackageProduct = () => {
    const { typeInsur, getTypeInsurSelect, company, getCompanySelect } = useActionStore();
    const [companyList, setCompanyList] = useState(false)
    const [repair, setRepair] = useState(false)

    useEffect(() => {
        getTypeInsurSelect();
        getCompanySelect();
    }, [])

    console.log(company)
    return (
        <div className="w-full h-auto 2xl:h-screen bg-[#EDEDF3] flex justify-center items-center py-5 lg:px-30 font-prompt">
            <div className="flex flex-col lg:flex-row gap-5">
                <div>
                    <div className="flex flex-col gap-3">
                        <div className="bg-white rounded-md p-5">
                            <div className="flex gap-3 justify-between items-center mb-3">
                                <div className="flex gap-3 items-center">
                                    <button className="w-8 h-8 p-1 rounded-full bg-[#1231F5] text-white flex justify-center items-center"><FaCar /></button>
                                    <p className="font-semibold text-sm">ข้อมูลรถของคุณ</p>
                                </div>
                                <button className="p-2 rounded-md bg-yellow-300 text-xs text-black flex gap-1 justify-center items-center"><FaEdit /> แก้ไขข้อมูล</button>
                            </div>
                            <p className="text-xs">ISUZU / D-MAX / 2022 / Auto 2 ประตู / 1.9 / 5</p>
                        </div>
                        <div className="flex flex-col gap-2 bg-white rounded-md p-5">
                            <p className="font-bold text-sm">ตัวกรองข้อมูล</p>
                            <div className="flex gap-2">
                                {
                                    typeInsur.map((i) => (
                                        <button key={i.id} className="bg-[#EDEDF3] p-3 rounded-md text-[10px] 2xl:text-sm">{i.nametype}</button>
                                    ))
                                }
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className="font-bold text-sm">บริษัทประกันภัย</p>
                                <IoIosArrowDown onClick={() => setCompanyList(!companyList)} className={`transition duration-300 ${companyList ? 'rotate-180' : 'rotate-0'}`} />
                            </div>
                            {
                                companyList && (
                                    <div className="flex flex-col">
                                        {
                                            company.map((j) => (
                                                <div key={j.id} className="flex justify-between border-b border-[#EDEDF3] py-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-7 h-7 rounded-md overflow-clip">
                                                            <img src={j.logo_url} className="w-full h-full object-cover" />
                                                        </div>
                                                        <p className="text-xs">{j.namecompany}</p>
                                                    </div>
                                                    <input type="checkbox" className="checkbox" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            <div className='flex justify-between items-center'>
                                <p className="font-bold text-sm">ประเภทซ่อม</p>
                                <IoIosArrowDown onClick={() => setRepair(!repair)} className={`transition duration-300 ${repair ? 'rotate-180' : 'rotate-0'}`} />
                            </div>
                            {
                                repair && (
                                    <div>
                                        <div className="flex justify-between border-b border-[#EDEDF3] py-2">
                                            <div className="flex items-center gap-3">
                                                <button className="w-8 h-8 rounded-full bg-[#1231F5] text-white flex justify-center items-center"><IoIosCheckmarkCircle size={25} /></button>
                                                <p className="text-xs">เลือกทั้งหมด</p>
                                            </div>
                                            <input type="checkbox" className="checkbox" />
                                        </div>
                                        <div className="flex justify-between border-b border-[#EDEDF3] py-2">
                                            <div className="flex items-center gap-3">
                                                <button className="w-8 h-8 rounded-full bg-[#1231F5] text-white flex justify-center items-center"><TiSpanner size={25} /></button>
                                                <p className="text-xs">ซ่อมอู่</p>
                                            </div>
                                            <input type="checkbox" className="checkbox" />
                                        </div>
                                        <div className="flex justify-between border-b border-[#EDEDF3] py-2">
                                            <div className="flex items-center gap-3">
                                                <button className="w-8 h-8 rounded-full bg-[#1231F5] text-white flex justify-center items-center"><FaBuilding size={15} /></button>
                                                <p className="text-xs">ซ่อมห้าง</p>
                                            </div>
                                            <input type="checkbox" className="checkbox" />
                                        </div>
                                    </div>
                                )
                            }
                            <button className="btn bg-blue-600 hover:bg-blue-700 text-white">กรองข้อมูล</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between items-baseline-last">
                        <h1 className="font-bold">ผลลัพธ์ <span className="text-blue-600">6 รายการ</span></h1>
                        <button className="p-2 rounded-md bg-white font-semibold text-sm text-black flex gap-1 justify-center items-center"><GoSortDesc size={20} /> ราคาจาก น้อย-มาก</button>
                    </div>
                    <div className="grid justify-center lg:grid-cols-2 gap-5">
                        {
                            data.map((i, idx) => (
                                <CardProduct key={idx} data={i} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PackageProduct