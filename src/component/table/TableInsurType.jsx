import React from 'react'

const TableInsurType = ({ data, onDelete, onEdite }) => {
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th className='text-center'>ประเภทประกัน</th>
                        <th className='text-center'>รายละเอียด</th>
                        <th className='text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id}>
                                <th>{idx + 1}</th>
                                <td className='text-center'>
                                    {i.nametype}
                                </td>
                                <td className='text-center'>
                                    {i.description}
                                </td>
                                <td className='flex gap-5 justify-center'>
                                    <button onClick={() => onEdite(i.id)} className="btn btn-sm btn-soft btn-warning">แก้ไข</button>
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

export default TableInsurType