import React, { useState } from 'react'

const TableCarUsage = ({ data, page, limit, onDelete, onUpdate }) => {
    const [editingId, setEditingId] = useState(null)
    const [editValue, setEditValue] = useState('')

    const startEdit = (item) => {
        setEditingId(item.id)
        setEditValue(item.usage_name)
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditValue('')
    }

    const saveEdit = async (id, value) => {
        if (!value.trim()) return cancelEdit()
        await onUpdate(id, value)
        cancelEdit()
    }
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>ประเภท</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td>
                                    {editingId === i.id ? (
                                        <input
                                            autoFocus
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={(e) => saveEdit(i.id, e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    saveEdit(i.id, e.target.value)
                                                }
                                                if (e.key === 'Escape') cancelEdit()
                                            }}
                                            className="p-2 border rounded focus:outline-none bg-white"
                                        />
                                    ) : (
                                        <span
                                            className="cursor-pointer"
                                        >
                                            {i.usage_name}
                                        </span>
                                    )}
                                </td>
                                <td className='flex gap-5 justify-center'>
                                    <button onClick={() => startEdit(i)} className="btn btn-sm btn-soft btn-warning">แกไข</button>
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

export default TableCarUsage