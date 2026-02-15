import Sort from '../sortData/Sort'

const TableYear = ({ data, page, limit, onDelete, onEdite, onSort, sortConfig, onToggle }) => {

    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center gap-3'>
                                ลำดับ <Sort
                                    onSort={onSort}
                                    keyName='id'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                ปี พ.ศ. <Sort
                                    onSort={onSort}
                                    keyName='year_be'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                ปี ค.ศ. <Sort
                                    onSort={onSort}
                                    keyName='year_ad'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>สถานะ</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td className='text-center'>{i.year_be}</td>
                                <td className='text-center'>{i.year_ad}</td>
                                <td className='text-center'>
                                    <input
                                        type='checkbox'
                                        onChange={() => onToggle(i.id, i.is_active)}
                                        checked={i.is_active}
                                        className='toggle'
                                    />
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

export default TableYear