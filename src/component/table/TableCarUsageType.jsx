import Sort from "../sortData/Sort"

const TableCarUsageType = ({ data, page, limit, onDelete, onEdite, onToggle, isSee, onSort, sortConfig }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                รหัส<Sort
                                    onSort={onSort}
                                    keyName='code'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ประเภทรถยนต์<Sort
                                    onSort={onSort}
                                    keyName='car_type_id'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center  gap-3'>
                                ประเภทการใช้งาน<Sort
                                    onSort={onSort}
                                    keyName='car_usage_id'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>
                            <div className='flex items-center  gap-3'>
                                รหัสประเภทการใช้งาน<Sort
                                    onSort={onSort}
                                    keyName='code_usage'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>สถานะ</th>
                        <th className='font-medium text-neutral-400'>เปิด-ปิดลูกค้า</th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ลำดับการมองเห็น<Sort
                                    onSort={onSort}
                                    keyName='visibility_no'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
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
                                    <input
                                        type="checkbox"
                                        onChange={() => isSee(i.id, i.is_see)}
                                        checked={i.is_see}
                                        className="toggle" />
                                </td>
                                <td className="text-center">{i.visibility_no}</td>
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