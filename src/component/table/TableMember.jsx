import Sort from "../sortData/Sort"

const TableMember = ({ data, onChange, selected, onSort, sortConfig, onCheckAll, isAllSelected, isSomeSelected }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <div className="flex justify-end">
                <button className="btn btn-sm btn-soft btn-neutral">
                    <Sort
                        onSort={onSort}
                        keyName='recent_conversation'
                        currentSort={sortConfig}
                    />
                    คุยล่าสุด</button>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={isAllSelected}
                                    onChange={onCheckAll}
                                    ref={(el) => {
                                        if (el) {
                                            el.indeterminate = isSomeSelected
                                        }
                                    }}
                                />
                            </label>
                        </th>
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
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((i) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={i.user_id}
                                            checked={selected.includes(i.user_id)}
                                            onChange={onChange}
                                            className="checkbox" />
                                    </label>
                                </th>
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
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default TableMember