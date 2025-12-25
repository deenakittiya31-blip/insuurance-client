import React from 'react'

const TablePackage = ({ data, page, limit, onDelete, onEdite }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>บริษัท</th>
                        <th className='font-medium text-neutral-400'>ประเภทของประกัน</th>
                        <th className='font-medium text-neutral-400'>แพ็กเกจ</th>
                        <th className='font-medium text-neutral-400'>คุ้มครอง</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td>{i.company}</td>
                                <td>{i.type}</td>
                                <td>{i.package_name}</td>
                                <td>{i.coverage_amount}</td>
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

export default TablePackage