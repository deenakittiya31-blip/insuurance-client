import React, { useState } from 'react'

const TableCarType = ({ data, page, limit, onDelete, onEdit }) => {

    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>ประเภทรถยนต์</th>
                        <th className='font-medium text-neutral-400'>รหัสการใช้งาน</th>
                        <th className='font-medium text-neutral-400'>ประเภทการใช้งาน</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td> {i.type}</td>
                                <td> {i.code}</td>
                                <td> {i.usage_name}</td>
                                <td className='flex gap-5 justify-center'>
                                    <button onClick={() => onEdit(i.id)} className="btn btn-sm btn-soft btn-warning">แก้ไข</button>
                                    <button onClick={() => onDelete(i.id)} className="btn btn-sm btn-soft btn-error">ลบ</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableCarType