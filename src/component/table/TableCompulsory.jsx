import React from 'react'

const TableCompulsory = ({ data, page, limit, onDelete, onEdite }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400 text-center'>ประเภทรถยนต์</th>
                        <th className='font-medium text-neutral-400 text-center'>รหัสประเภทหลัก</th>
                        <th className='font-medium text-neutral-400 text-center'>รหัสประเภทย่อย</th>
                        <th className='font-medium text-neutral-400 text-center'>ประเภทการใช้งาน</th>
                        <th className='font-medium text-neutral-400 text-center'>สุทธิ</th>
                        <th className='font-medium text-neutral-400 text-center'>รวม</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td className='text-center'>{i.car_type}</td>
                                <td className='text-center'>{i.code_usage}</td>
                                <td className='text-center'>{i.code_sub}</td>
                                <td className='text-center'>{i.detail}</td>
                                <td className='text-center'>{i.net_price}</td>
                                <td className='text-center'>{i.total}</td>
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

export default TableCompulsory