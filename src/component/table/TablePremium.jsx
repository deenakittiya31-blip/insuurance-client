import React from 'react'

const TablePremium = ({ data, onDelete, onEdite }) => {

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th className='text-center'>แพ็กเกจ</th>
                        <th className='text-center'>การใช้งาน</th>
                        <th className='text-center'>ปี</th>
                        <th className='text-center'>ราคาเบี้ยประกัน</th>
                        <th className='text-center'>ราคาค่าคุ้มครอง</th>
                        <th className='text-center'>ราคารวม</th>
                        <th className='text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id}>
                                <th>{idx + 1}</th>
                                <td className='text-center'>{i.package}</td>
                                <td className='text-center'>{i.usage_name}</td>
                                <td className='text-center'>{i.year}</td>
                                <td className='text-center'>{i.premium}</td>
                                <td className='text-center'>{i.compulsory}</td>
                                <td className='text-center'>{i.total}</td>
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