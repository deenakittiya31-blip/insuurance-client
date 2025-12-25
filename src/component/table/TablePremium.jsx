import React from 'react'

const TablePremium = ({ data, page, limit, onDelete, onEdite }) => {

    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>แพ็กเกจ</th>
                        <th className='font-medium text-neutral-400'>การใช้งาน</th>
                        <th className='font-medium text-neutral-400'>ปี</th>
                        <th className='font-medium text-neutral-400'>ราคาเบี้ยประกัน</th>
                        <th className='font-medium text-neutral-400'>ราคาค่าคุ้มครอง</th>
                        <th className='font-medium text-neutral-400'>ราคารวม</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td>{i.package}</td>
                                <td>{i.usage_name}</td>
                                <td>{i.year}</td>
                                <td>{i.premium}</td>
                                <td>{i.compulsory}</td>
                                <td>{i.total}</td>
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

export default TablePremium