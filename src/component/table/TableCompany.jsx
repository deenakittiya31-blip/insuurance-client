import React from 'react'

const TableCompany = ({ data, onDelete, onEdit }) => {
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th className='text-center'>รูปภาพ</th>
                        <th className='text-center'>บริษัท</th>
                        <th className='text-center'>รหัส</th>
                        <th className='text-center'>เบอร์โทรศัพท์</th>
                        <th className='text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <img
                                        src={i.logo_url}
                                        alt={i.nameCompany}
                                        className="w-10 h-10 object-contain mx-auto"
                                    />
                                </td>
                                <td className='text-center'>
                                    {i.nameCompany}
                                </td>
                                <td className='text-center'>
                                    {i.code}
                                </td>
                                <td className='text-center'>
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