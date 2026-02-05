import React from 'react'

const TablePremium = ({ data, page, limit, onDelete, onEdite }) => {

    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400 text-center'>ลำดับ</th>
                        <th className='font-medium text-neutral-400 text-center'>รหัสเบี้ย</th>
                        <th className='font-medium text-neutral-400 text-center'>ชื่อเบี้ย</th>
                        <th className='font-medium text-neutral-400 text-center'>บริษัทประกันภัย</th>
                        <th className='font-medium text-neutral-400 text-center'>ประเภทประกันภัย</th>
                        <th className='font-medium text-neutral-400 text-center'>ประเภทรถ</th>
                        <th className='font-medium text-neutral-400 text-center'>ทุนเริ่มต้น</th>
                        <th className='font-medium text-neutral-400 text-center'>ทุนสูงสุด</th>
                        <th className='font-medium text-neutral-400 text-center'>ราคาขาย</th>
                        <th className='font-medium text-neutral-400 text-center'>วันเริ่มต้น-สิ้นสุด</th>
                        <th className='font-medium text-neutral-400 text-center'>สถานะ</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td className='text-wrap'>{i.package}</td>
                                <td className='text-wrap'>{i.usage_name}</td>
                                <td>{i.year}</td>
                                <td>{i.premium}</td>
                                <td>{i.compulsory}</td>
                                <td>{i.total}</td>
                                <td>{i.total}</td>
                                <td>{i.total}</td>
                                <td>{i.total}</td>
                                <td>{i.total}</td>
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

export default TablePremium