import React from 'react'
import Sort from '../sortData/Sort'
import { dateFormatNoTime } from '../../utils/dateformat'

const TablePremium = ({ data, page, limit, onDelete, onEdite, onSort, sortConfig, onToggle }) => {

    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400 text-center'>ลำดับ</th>
                        <th className='font-medium text-neutral-400 text-center'>รหัสเบี้ย
                            <div className='flex items-center  gap-3'>
                                รหัสเบี้ย<Sort
                                    onSort={onSort}
                                    keyName='created_at'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>ชื่อเบี้ย</th>
                        <th className='font-medium text-neutral-400 text-center'>บริษัทประกันภัย</th>
                        <th className='font-medium text-neutral-400 text-center'>ประเภทประกันภัย</th>
                        <th className='font-medium text-neutral-400 text-center'>ประเภทรถ</th>
                        <th className='font-medium text-neutral-400 text-center'>ทุนเริ่มต้น</th>
                        <th className='font-medium text-neutral-400 text-center'>ทุนสูงสุด</th>
                        <th className='font-medium text-neutral-400 text-center'>ราคาขาย</th>
                        <th className='font-medium text-neutral-400 text-center'>วันเริ่มต้น-สิ้นสุด</th>
                        <th className='font-medium text-neutral-400 text-center'>สถานะ</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td className='text-wrap'>
                                    <div>{i.premium_id}</div>
                                    <div>{i.package_id}</div>
                                </td>
                                <td className='text-wrap'>{i.premium_name}</td>
                                <td>{i.namecompany}</td>
                                <td>{i.nametype}</td>
                                <td>
                                    {
                                        i.type?.map((t, idx) => (
                                            <span key={idx} className='line-clamp-1'>
                                                {t.code_type}({t.code_usage})
                                            </span>
                                        ))
                                    }
                                </td>
                                <td>{i.repair_fund_int}</td>
                                <td>{i.repair_fund_max}</td>
                                <td>{i.selling_price}</td>
                                <td>
                                    <div className='flex flex-col text-center'>
                                        {dateFormatNoTime(i.start_date)}
                                        <span>ถึง</span>
                                        {dateFormatNoTime(i.end_date)}
                                    </div>
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => onToggle(i.id, i.is_active)}
                                        checked={i.is_active}
                                        className="toggle" />
                                </td>
                                <td>
                                    <div className='flex gap-5 justify-center'>
                                        <button onClick={() => onEdite(i.id)} className="btn btn-sm btn-soft btn-warning">แก้ไข</button>
                                        <button onClick={() => onDelete(i.id)} className="btn btn-sm btn-soft btn-error">ลบ</button>
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