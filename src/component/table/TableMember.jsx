const TableMember = ({ data, onClick }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                        </th>
                        <th className='font-medium text-neutral-400'>ชื่อไลน์</th>
                        <th className='font-medium text-neutral-400'>ชื่อ</th>
                        <th className='font-medium text-neutral-400'>นามสกุล</th>
                        <th className='font-medium text-neutral-400'>เบอร์โทรศัพท์</th>
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
                                            onClick={onClick} className="checkbox" />
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
                                    {i.first_name}
                                </td>
                                <td>{i.last_name}</td>
                                <td>
                                    {i.phone}
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