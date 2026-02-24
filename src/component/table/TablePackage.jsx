import React from 'react'
import Sort from '../sortData/Sort'
import { dateFormat, dateFormatNoTime } from '../../utils/dateformat'
import { FiEdit } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'
import CardPackage from '../card/CardPackage';
import { IoMdCopy } from "react-icons/io";

const TablePackage = ({ data, page, limit, onDelete, onSort, sortConfig, onToggle, onRead, readData, onCopy }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
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
                                รหัสแพ็กเกจ<Sort
                                    onSort={onSort}
                                    keyName='package_id'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ชื่อแพ็กเกจ<Sort
                                    onSort={onSort}
                                    keyName='package_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ชื่อบริษัท<Sort
                                    onSort={onSort}
                                    keyName='namecompany'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ประเภทประกันภัย<Sort
                                    onSort={onSort}
                                    keyName='nametype'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                เวลาเริ่ม-สิ้นสุด<Sort
                                    onSort={onSort}
                                    keyName='start_date'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th>
                            <div className='flex items-center  gap-3'>
                                ซ่อม<Sort
                                    onSort={onSort}
                                    keyName='repair_type'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>สถานะ</th>
                        <th className='font-medium text-neutral-400'>เบี้ย
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td className="align-top">{(page - 1) * limit + idx + 1}</td>
                                <td className="align-top">{dateFormat(i.created_at)}</td>
                                <td className="align-top">{i.package_id}</td>
                                <td className="align-top"><p className='font-semibold line-clamp-1'>{i.package_name}</p></td>
                                <td className="align-top">{i.namecompany}</td>
                                <td className="align-top text-center">{i.nametype}</td>
                                <td className="align-top">
                                    <div className='flex flex-col text-center'>
                                        {dateFormatNoTime(i.start_date)}
                                        <span>ถึง</span>
                                        {dateFormatNoTime(i.end_date)}
                                    </div>
                                </td>
                                <td className="align-top">{i.repair_type}</td>
                                <td className="align-top">
                                    <input
                                        type="checkbox"
                                        onChange={() => onToggle(i.id, i.is_active)}
                                        checked={i.is_active}
                                        className="toggle" />
                                </td>
                                <td className="align-top">
                                    <div className='flex items-center gap-3'>
                                        <button className='w-5 h-5 rounded-full bg-gray-300 text-white'>
                                            {i.premium_count}
                                        </button>
                                        เบี้ย
                                    </div>
                                </td>
                                <td className="align-top">
                                    <div className="flex flex-col gap-1">
                                        <div className='flex gap-1'>
                                            <button className='btn btn-sm btn-soft btn-success flex flex-1 gap-1 h-7' onClick={() => onCopy(i.id)}><IoMdCopy size={13} /> ลอก</button>
                                            <CardPackage
                                                onRead={() => onRead(i.id)}
                                                data={readData}
                                            />
                                        </div>
                                        <div className="join w-full flex">
                                            <Link to={`/app/editpackage/${i.id}`}>
                                                <button className="flex-1 join-item btn btn-soft btn-warning flex gap-1 h-7 p-1"><FiEdit size={13} />แก้ไข</button>
                                            </Link>
                                            <button onClick={() => onDelete(i.id)} className="flex-1 join-item btn btn-soft btn-error flex gap-1 h-7 p-1"><AiOutlineDelete size={13} className="shrink" /> ลบ</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}

export default TablePackage