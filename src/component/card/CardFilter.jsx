import { useState } from "react";
import { IoIosArrowDown, IoIosCheckmarkCircle } from "react-icons/io";
import { FaBuilding } from "react-icons/fa";
import { TiSpanner } from "react-icons/ti";

const INITIAL_SHOW_COUNT = 3;

const CardFilter = ({ isOpen, form, typeInsur, company, onSubmit, onChange, onClose, onClear }) => {
    const [companyList, setCompanyList] = useState(true)
    const [repair, setRepair] = useState(true)
    const [showAllCompanies, setShowAllCompanies] = useState(false)

    const visibleCompanies = showAllCompanies ? company : company.slice(0, INITIAL_SHOW_COUNT);
    const extraCompanies = company.slice(INITIAL_SHOW_COUNT);
    const hasMore = company.length > INITIAL_SHOW_COUNT;
    const hiddenCount = company.length - INITIAL_SHOW_COUNT;

    // console.log(typeInsur)
    if (!isOpen) return null;
    return (
        <div onClick={onClose} className='z-60 mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit} className=" w-auto h-125 p-6 radius-box flex flex-col gap-3 bg-white rounded-lg text-text-primary overflow-y-auto">
                <h3 className="font-bold text-sm font-prompt text-text-primary">ตัวกรองข้อมูล</h3>
                <div className="flex gap-2">
                    {
                        typeInsur.map((i) => (
                            <button
                                key={i.id}
                                type="button"
                                onClick={() =>
                                    onChange({
                                        target: {
                                            name: 'insurance_type_id',
                                            value: i.id
                                        }
                                    })
                                }
                                className={`p-3 rounded-md text-[10px] 2xl:text-sm
                ${form.insurance_type_id == i.id
                                        ? 'bg-main text-white'
                                        : 'bg-[#EDEDF3]'
                                    }`}
                            >
                                {i.nametype}
                            </button>
                        ))
                    }
                </div>
                <div>
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-sm">บริษัทประกันภัย</p>
                        <IoIosArrowDown onClick={() => setCompanyList(!companyList)} className={`transition duration-300 ${companyList ? 'rotate-180' : 'rotate-0'}`} />
                    </div>

                    {
                        companyList && (
                            <div className="flex flex-col">
                                {
                                    visibleCompanies.map((j) => (
                                        <div key={j.id} className="flex justify-between border-b border-[#EDEDF3] py-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded-md overflow-clip">
                                                    <img src={j.logo_url} className="w-full h-full object-cover" />
                                                </div>
                                                <p className="text-xs">{j.namecompany}</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                name="insurance_company"
                                                value={j.id}
                                                onChange={onChange}
                                                checked={form.insurance_company.includes(String(j.id))}
                                                className="checkbox"
                                            />
                                        </div>
                                    ))
                                }
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateRows: showAllCompanies ? '1fr' : '0fr',
                                        transition: 'grid-template-rows 0.35s ease',
                                    }}
                                >
                                    <div style={{ overflow: 'hidden' }}>
                                        {extraCompanies.map((j, index) => (
                                            <div
                                                key={j.id}
                                                className="flex justify-between border-b border-[#EDEDF3] py-2"
                                                style={{
                                                    opacity: showAllCompanies ? 1 : 0,
                                                    transform: showAllCompanies ? 'translateY(0)' : 'translateY(-8px)',
                                                    transition: `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`,
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-7 h-7 rounded-md overflow-clip">
                                                        <img src={j.logo_url} className="w-full h-full object-cover" />
                                                    </div>
                                                    <p className="text-xs">{j.namecompany}</p>
                                                </div>
                                                <input type="checkbox" className="checkbox" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {hasMore && (
                                    <button
                                        type="button"
                                        onClick={() => setShowAllCompanies(!showAllCompanies)}
                                        className="mt-2 text-xs text-main font-medium flex items-center gap-1 self-start transition-all duration-200"
                                    >
                                        {showAllCompanies ? (
                                            <>
                                                <IoIosArrowDown className="rotate-180 transition duration-300" />
                                                แสดงน้อยลง
                                            </>
                                        ) : (
                                            <>
                                                <IoIosArrowDown className="transition duration-300" />
                                                แสดงเพิ่มเติม ({hiddenCount} บริษัท)
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        )
                    }
                </div >
                <div>
                    <div className='flex justify-between items-center'>
                        <p className="font-bold text-sm">ประเภทซ่อม</p>
                        <IoIosArrowDown onClick={() => setRepair(!repair)} className={`transition duration-300 ${repair ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                    {
                        repair && (
                            <div>
                                <div className="flex justify-between border-b border-[#EDEDF3] py-2">
                                    <div className="flex items-center gap-3">
                                        <button className="w-8 h-8 rounded-full bg-main text-white flex justify-center items-center"><IoIosCheckmarkCircle size={25} /></button>
                                        <p className="text-xs">เลือกทั้งหมด</p>
                                    </div>
                                    <input
                                        name='repair_type'
                                        value=''
                                        onChange={onChange}
                                        checked={form.repair_type === ''}
                                        type="checkbox"
                                        className="checkbox" />
                                </div>
                                <div className="flex justify-between border-b border-[#EDEDF3] py-2">
                                    <div className="flex items-center gap-3">
                                        <button className="w-8 h-8 rounded-full bg-main text-white flex justify-center items-center"><TiSpanner size={25} /></button>
                                        <p className="text-xs">ซ่อมอู่</p>
                                    </div>
                                    <input
                                        name='repair_type'
                                        value='ซ่อมอู่'
                                        onChange={onChange}
                                        checked={form.repair_type === 'ซ่อมอู่'}
                                        type="checkbox"
                                        className="checkbox" />
                                </div>
                                <div className="flex justify-between border-b border-[#EDEDF3] py-2">
                                    <div className="flex items-center gap-3">
                                        <button className="w-8 h-8 rounded-full bg-main text-white flex justify-center items-center"><FaBuilding size={15} /></button>
                                        <p className="text-xs">ซ่อมห้าง</p>
                                    </div>
                                    <input
                                        name='repair_type'
                                        value='ซ่อมห้าง'
                                        onChange={onChange}
                                        checked={form.repair_type === 'ซ่อมห้าง'}
                                        type="checkbox"
                                        className="checkbox" />
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="flex justify-between">
                    <button onClick={onClear} type="button" className="btn">ล้างข้อมูล</button>
                    <button type="submit" className="btn bg-main hover:bg-second text-white">กรองข้อมูล</button>
                </div>

            </form >
        </div >
    )
}
export default CardFilter