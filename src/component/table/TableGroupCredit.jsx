import React, { useState } from 'react'
import CardGroupCredit from '../card/CardGroupCredit'

const TableGroupCredit = ({ data, onDelete, onToggle, readData, onRead, onEdit }) => {

    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>ประเภท</th>
                        <th className='font-medium text-neutral-400'>สถานะ</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{idx + 1}</td>
                                <td>{i.group_name}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => onToggle(i.id, i.is_active)}
                                        checked={i.is_active}
                                        className="toggle" />
                                </td>
                                <td>
                                    <div className='flex gap-5 justify-center'>
                                        <CardGroupCredit
                                            onRead={() => onRead(i.id)}
                                            data={readData}
                                        />
                                        <button onClick={() => onEdit(i.id)} className="btn btn-sm btn-soft btn-warning">แก้ไข</button>
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

export default TableGroupCredit