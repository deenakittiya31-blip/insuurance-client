import React from 'react'

const TableCompany = ({ data, onDelete, onEdit }) => {
    return (
        <div className="overflow-x-auto font-prompt ">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th className='font-medium text-neutral-400'>บริษัท</th>
                        <th className='font-medium text-neutral-400'>รหัส</th>
                        <th className='font-medium text-neutral-400'>เบอร์โทรศัพท์</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>
                                    <div className='w-10 h-10 rounded-sm overflow-hidden'>
                                        <img
                                            src={i.logo_url}
                                            alt={i.namecompany}
                                            className="w-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td>
                                    {i.namecompany}
                                </td>
                                <td>
                                    {i.code}
                                </td>
                                <td>
                                    {i.phone}
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

export default TableCompany