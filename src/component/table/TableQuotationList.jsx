import { dateFormat } from "../../utils/dateformat"
import { Link } from "react-router-dom"
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaLine } from "react-icons/fa";
import { BiSolidFileJpg, BiSolidFilePdf } from "react-icons/bi";
import Sort from "../sortData/Sort";
import { BsFillPinAngleFill } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";

const TableQuotationList = ({ data, page, limit, onDelete, isOpen, pdf, jpg, onSort, sortConfig, onPin }) => {


    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ที่</th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ใบเสนอราคา No.<Sort
                                    onSort={onSort}
                                    keyName='id'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                วันที่สร้าง<Sort
                                    onSort={onSort}
                                    keyName='created_at'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ชื่อลูกค้า<Sort
                                    onSort={onSort}
                                    keyName='to_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ทะเบียน<Sort
                                    onSort={onSort}
                                    keyName='details'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                รายละเอียดรถยนต์<Sort
                                    onSort={onSort}
                                    keyName='car_brand'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            ประวัติ
                        </th>
                        <th className='font-medium text-neutral-400 text-center'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td className="align-top">
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => onPin(i.id)} className="flex items-center justify-center w-7 h-7 group">
                                            <BsFillPinAngleFill className={`size-5 group-hover:text-red-600 ${i.pin ? 'text-red-600' : 'text-gray-300'}`} />
                                        </button>

                                        {(page - 1) * limit + idx + 1}
                                    </div>
                                </td>
                                <td className="align-top">{i.q_id}</td>
                                <td className="align-top">{dateFormat(i.created_at)}</td>
                                <td className="align-top">{i.to_name}</td>
                                <td className="align-top">{i.details}</td>
                                <td className="align-top">
                                    <div className="flex gap-2">
                                        {i.car_brand}
                                        {
                                            i.car_model
                                                ? (<span className="line-clamp-1">{i.car_model}</span>)
                                                : (<span className="line-clamp-1">{i.sub_car_model}</span>)
                                        }
                                    </div>
                                    <div>
                                        {i.year_be}/{i.year_ad} {i.usage}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center -space-x-3">    {/* -space-x-3 */}
                                        {
                                            i.members?.slice(0, 3).map((member, index) => (
                                                <div className="tooltip" key={index}>
                                                    <div className="tooltip-content flex flex-col items-start">
                                                        <span>{member.display_name}</span>
                                                        <span>เมื่อ {dateFormat(member.sent_at)}</span>
                                                        <span>ใบเสนอที่ {member.compare_no}</span>
                                                    </div>
                                                    <div className="inline-flex align-middle w-7 h-7 border-white border-2 rounded-full overflow-hidden shrink-0"
                                                    >
                                                        <img src={member.picture_url} alt={member.display_name || 'Member'} className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        {
                                            i.members?.length > 3 && (
                                                <div className="tooltip">
                                                    <div className="tooltip-content flex flex-col gap-2 p-2">
                                                        {
                                                            i.members.map((i, idx) => (
                                                                <div key={idx} className="bg-white rounded-xs p-1 flex gap-3">
                                                                    <div className="w-12 h-12 border-white border-2 rounded-md overflow-hidden shrink-0"
                                                                    >
                                                                        <img src={i.picture_url} alt={i.display_name || 'Member'} className="w-full h-full object-cover" />
                                                                    </div>
                                                                    <div className="text-start text-xs">
                                                                        <p className="font-semibold text-gray-400">{i.display_name}</p>
                                                                        <p className="text-gray-400">เมื่อ {dateFormat(i.sent_at)}</p>
                                                                        <p className="text-gray-400">ใบเสนอราคาที่ : {i.compare_no}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="avatar avatar-placeholder">
                                                        <button className=" flex justify-center items-center bg-gray-200 text-white w-7 h-7 border-white border-2 rounded-full">
                                                            <span><HiOutlineDotsHorizontal size={20} /></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-1">
                                            <button className='btn btn-sm btn-soft btn-info flex  flex-1 gap-1 h-7' onClick={() => isOpen(i.q_id)}>
                                                <FaLine size={13} /> ส่ง
                                            </button>
                                            <div className="join">
                                                <Link to={`/app/compare-detail/${i.q_id}`}>
                                                    <button className="join-item btn btn-soft btn-warning flex gap-1 h-7 p-1"><FaRegEye size={13} /> ดู</button>
                                                </Link>
                                                <button onClick={() => onDelete(i.id)} className="join-item btn btn-soft btn-error flex gap-1 h-7 p-1"><AiOutlineDelete size={13} className="shrink" /> ลบ</button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1">
                                            <button onClick={() => pdf(i.q_id)} className="btn btn-sm hover:btn-accent py-1"><BiSolidFilePdf size={17} /> PDF</button>
                                            <button onClick={() => jpg(i.q_id)} className="btn btn-sm hover:btn-accent py-1"><BiSolidFileJpg size={17} /> JPG</button>
                                        </div>
                                    </div>


                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default TableQuotationList