import React from 'react'
import Sort from '../sortData/Sort'

const TableCompulsory = ({ data, page, limit, onDelete, onEdite, onToggle, onSort, sortConfig }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center gap-3'>
                                ประเภทรถยนต์ <Sort
                                    onSort={onSort}
                                    keyName='car_type'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center gap-3'>
                                รหัสประเภทหลัก <Sort
                                    onSort={onSort}
                                    keyName='code_usage'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center gap-3'>
                                รหัสประเภทย่อย <Sort
                                    onSort={onSort}
                                    keyName='code_sub'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center gap-3'>
                                ประเภทการใช้งาน <Sort
                                    onSort={onSort}
                                    keyName='detail'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center gap-3'>
                                สุทธิ <Sort
                                    onSort={onSort}
                                    keyName='net_price'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center gap-3'>
                                รวม <Sort
                                    onSort={onSort}
                                    keyName='total'
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
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td className='text-center'>{i.car_type}</td>
                                <td className='text-center'>{i.code_usage}</td>
                                <td className='text-center'>{i.code_sub}</td>
                                <td className='text-center'>{i.detail}</td>
                                <td className='text-center'>{i.net_price}</td>
                                <td className='text-center'>{i.total}</td>
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

export default TableCompulsory