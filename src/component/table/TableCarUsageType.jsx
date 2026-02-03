const TableCarUsageType = ({ data, page, limit, onDelete, onEdite, onToggle }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>รหัส</th>
                        <th className='font-medium text-neutral-400'>ประเภทรถยนต์</th>
                        <th className='font-medium text-neutral-400 text-center'>ประเภทการใช้งาน</th>
                        <th className='font-medium text-neutral-400 text-center'>รหัสประเภทการใช้งาน</th>
                        <th className='font-medium text-neutral-400'>สถานะ</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td>{i.code}</td>
                                <td><p className='line-clamp-1'>{i.car_type}</p></td>
                                <td className="text-center">{i.usage_name}</td>
                                <td className="text-center">{i.code_usage}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => onToggle(i.id, i.is_active)}
                                        checked={i.is_active}
                                        className="toggle" />
                                </td>
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
export default TableCarUsageType