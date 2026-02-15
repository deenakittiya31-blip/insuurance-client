import React from 'react'
import Sort from '../sortData/Sort'

const TableInsurType = ({ data, page, limit, onDelete, onEdite, onToggle, onSort, sortConfig }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center gap-3'>
                                รหัสประเภท <Sort
                                    onSort={onSort}
                                    keyName='type_code'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center gap-3'>
                                ประเภทประกัน <Sort
                                    onSort={onSort}
                                    keyName='nametype'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center gap-3'>
                                รายละเอียด <Sort
                                    onSort={onSort}
                                    keyName='description'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>สถานะ</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td>{i.type_code}</td>
                                <td>{i.nametype}</td>
                                <td>
                                    <p className='line-clamp-2'>{i.description}</p>
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

export default TableInsurType