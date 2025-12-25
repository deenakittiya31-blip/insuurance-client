import React from 'react'

const TableCarBrand = ({ data, page, limit, onDelete, onEdit }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>รูปภาพ</th>
                        <th className='font-medium text-neutral-400'>ยี่ห้อ</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td>
                                    <div className='w-10 h-10 bg-white rounded-sm overflow-hidden'>
                                        <img
                                            src={i.logo_url}
                                            alt={i.name}
                                            className="w-full object-cover"
                                        />
                                    </div>

                                </td>
                                <td>
                                    {i.name}
                                </td>
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

export default TableCarBrand