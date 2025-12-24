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
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th className='text-center'>ประเภท</th>
                        <th className='text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id}>
                                <th>{(page - 1) * limit + idx + 1}</th>
                                <td className="text-center">
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
                                            className="text-center p-2 border rounded focus:outline-none"
                                        />
                                    ) : (
                                        <span
                                            onDoubleClick={() => startEdit(i)}
                                            className="cursor-pointer hover:underline"
                                        >
                                            {i.usage_name}
                                        </span>
                                    )}
                                </td>
                                <td className='flex gap-5 justify-center'>
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