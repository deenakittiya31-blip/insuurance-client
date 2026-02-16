import { AiFillSmile } from "react-icons/ai"
import { dateFormatNoTime } from "../../utils/dateformat"
import Sort from "../sortData/Sort"

const TableUser = ({ data, page, onSort, sortConfig, limit, onDelete, onEdit, onToggle }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ชื่อผู้ใช้<Sort
                                    onSort={onSort}
                                    keyName='name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                อีเมลล์<Sort
                                    onSort={onSort}
                                    keyName='email'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ชื่อจริง<Sort
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
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                สิทธิ์<Sort
                                    onSort={onSort}
                                    keyName='role'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                วันที่เพิ่ม<Sort
                                    onSort={onSort}
                                    keyName='created_at'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            สถานะ
                        </th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((i, idx) => (
                            <tr key={i.user_id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        {
                                            i.logo_url

                                                ? <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={i.logo_url
                                                            }
                                                            alt={i.first_name} />
                                                    </div>
                                                </div>
                                                : <div className='flex justify-center items-center rounded-lg bg-main w-10 h-10 overflow-hidden'><AiFillSmile className='fill-white size-6' /></div>
                                        }
                                        <p className="font-semibold capitalize">{i.name}</p>
                                    </div>
                                </td>
                                <td>{i.email === null ? '-' : i.email}</td>
                                <td>{i.first_name === null ? '-' : i.first_name}</td>
                                <td>{i.last_name === null ? '-' : i.last_name}</td>
                                <td>{i.phone === null ? '-' : i.phone}</td>
                                <td>{i.role === null ? '-' : i.role}</td>
                                <td>{i.created_at === null ? '-' : dateFormatNoTime(i.created_at)}</td>
                                <td className='text-center'>
                                    <input
                                        type='checkbox'
                                        onChange={() => onToggle(i.user_id, i.is_active)}
                                        checked={!!i.is_active}
                                        className='toggle'
                                    />
                                </td>
                                <td>
                                    <div className='flex gap-5 justify-center'>
                                        <button onClick={() => onEdit(i.user_id)} className="btn btn-sm btn-soft btn-warning">แก้ไข</button>
                                        <button onClick={() => onDelete(i.user_id)} className="btn btn-sm btn-soft btn-error">ลบ</button>
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
export default TableUser