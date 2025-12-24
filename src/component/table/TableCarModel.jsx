import React, { useState } from 'react'
import Select from '../form/Select'

const TableCarModel = ({ data, page, limit, onDelete, onUpdate, carBrand }) => {
    const [editingId, setEditingId] = useState(null)
    const [editName, setEditName] = useState('')

    const startEditName = (item) => {
        setEditingId(item.id)
        setEditName(item.name)
    }


    const cancelEdit = () => {
        setEditingId(null)
        setEditName('')
    }

    const saveName = async (id, value) => {
        if (!value.trim()) return cancelEdit()
        await onUpdate(id, { name: value })
        cancelEdit()
    }

    const changeBrand = async (id, brand_id) => {
        await onUpdate(id, { brand_id })
    }
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th className='text-center'>ยี่ห้อ</th>
                        <th className='text-center'>รุ่นรถ</th>
                        <th className='text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id}>
                                <th>{(page - 1) * limit + idx + 1}</th>
                                <td className="text-center">
                                    <Select
                                        data={carBrand}
                                        value={i.brand_id}
                                        onChange={(e) =>
                                            changeBrand(i.id, Number(e.target.value))
                                        }
                                        valueKey="id"
                                        labelKey="name"
                                    />
                                </td>
                                <td className="text-center">
                                    {editingId === i.id ? (
                                        <input
                                            autoFocus
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            onBlur={(e) =>
                                                saveName(i.id, e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    saveName(i.id, e.target.value)
                                                }
                                                if (e.key === 'Escape') cancelEdit()
                                            }}
                                            className="input input-bordered input-sm text-center"
                                        />
                                    ) : (
                                        <span
                                            onDoubleClick={() => startEditName(i)}
                                            className="cursor-pointer hover:underline"
                                        >
                                            {i.name}
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

export default TableCarModel