import React from 'react'
import Sort from '../sortData/Sort'
import { dateFormatNoTime } from '../../utils/dateformat'
import { Link } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'

const TablePremium = ({ data, page, limit, onDelete, onSort, sortConfig, onToggle }) => {

    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400 text-center'>ลำดับ</th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center  gap-3'>
                                รหัสเบี้ย<Sort
                                    onSort={onSort}
                                    keyName='premium_id'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center  gap-3'>
                                ชื่อเบี้ย<Sort
                                    onSort={onSort}
                                    keyName='premium_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center  gap-3'>
                                บริษัทประกันภัย<Sort
                                    onSort={onSort}
                                    keyName='namecompany'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center  gap-3'>
                                ประเภทประกันภัย<Sort
                                    onSort={onSort}
                                    keyName='nametype'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center  gap-3'>
                                ประเภทรถ<Sort
                                    onSort={onSort}
                                    keyName='code_type'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center  gap-3'>
                                ทุนเริ่มต้น<Sort
                                    onSort={onSort}
                                    keyName='total_premium'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center  gap-3'>
                                ทุนสูงสุด<Sort
                                    onSort={onSort}
                                    keyName='net_income'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center  gap-3'>
                                ราคาขาย<Sort
                                    onSort={onSort}
                                    keyName='selling_price'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center  gap-3'>
                                วันเริ่มต้น-สิ้นสุด<Sort
                                    onSort={onSort}
                                    keyName='start_date'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>สถานะ</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td className="align-top">{(page - 1) * limit + idx + 1}</td>
                                <td className='text-center text-wrap align-top'>
                                    <div>{i.premium_id}</div>
                                    <div className='text-xs font-semibold'>{i.package_id}</div>
                                </td>
                                <td className='text-wrap align-top text-center'>{i.premium_name}</td>
                                <td className="align-top text-center">{i.namecompany}</td>
                                <td className="align-top text-center">{i.nametype}</td>
                                <td className="align-top text-center">
                                    {
                                        i.type?.map((t, idx) => (
                                            <span key={idx} className='line-clamp-1'>
                                                {t.code_type}({t.code_usage})
                                            </span>
                                        ))
                                    }
                                </td>
                                <td className="align-top text-center">{i.total_premium}</td>
                                <td className="align-top text-center">{i.net_income}</td>
                                <td className="align-top text-center">{i.selling_price}</td>
                                <td className="align-top text-center">
                                    <div className='flex flex-col text-center'>
                                        {dateFormatNoTime(i.start_date)}
                                        <span>ถึง</span>
                                        {dateFormatNoTime(i.end_date)}
                                    </div>
                                </td>
                                <td className="align-top text-center">
                                    <input
                                        type="checkbox"
                                        onChange={() => onToggle(i.id, i.is_active)}
                                        checked={i.is_active}
                                        className="toggle" />
                                </td>
                                <td className="align-top text-center">
                                    <div className='flex gap-5 justify-center'>
                                        <Link to={`/app/edit-premium/${i.id}`}>
                                            <button className="btn btn-sm btn-soft btn-warning"><FiEdit size={13} />แก้ไข</button>
                                        </Link>
                                        <button onClick={() => onDelete(i.id)} className="btn btn-sm btn-soft btn-error"> <AiOutlineDelete size={13} />ลบ</button>
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

export default TablePremium