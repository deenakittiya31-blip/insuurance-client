import Sort from "../sortData/Sort"

const TableMemberList = ({ data, page, onSort, sortConfig, limit, onDelete, onEdite }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <div className="flex justify-end">
                <button className="btn btn-sm btn-soft btn-success">
                    <Sort
                        onSort={onSort}
                        keyName='display_name'
                        currentSort={sortConfig}
                    />
                    คุยล่าสุด</button>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ชื่อไลน์<Sort
                                    onSort={onSort}
                                    keyName='display_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ชื่อ<Sort
                                    onSort={onSort}
                                    keyName='first_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                นามสกุล<Sort
                                    onSort={onSort}
                                    keyName='last_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                เบอร์โทรศัพท์<Sort
                                    onSort={onSort}
                                    keyName='phone'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={i.picture_url}
                                                    alt="Avatar member" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold capitalize">{i.display_name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {i.first_name === null ? '-' : i.first_name}
                                </td>
                                <td>{i.last_name === null ? '-' : i.last_name}</td>
                                <td>
                                    {i.phone === null ? '-' : i.phone}
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
export default TableMemberList