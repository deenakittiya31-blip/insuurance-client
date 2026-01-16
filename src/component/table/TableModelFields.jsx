import { FaRegTrashAlt } from "react-icons/fa";

const TableModelFields = ({ data, onDelete, onEdite }) => {
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>#</th>
                        <th className='font-medium text-neutral-400'>ชื่อฟิลด์</th>
                        <th className='font-medium text-neutral-400'>คำอธิบาย</th>
                        <th className='font-medium text-neutral-400'>ตัวอย่าง</th>
                        <th className='font-medium text-neutral-400 text-center'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>
                                    <button className="w-7 h-7 rounded-full bg-linear-to-r from-orange-500 to-violet-500 text-white font-semibold">{idx + 1}</button>
                                </td>
                                <td>
                                    {i.key_name}
                                </td>
                                <td>
                                    {i.description}
                                </td>
                                <td>
                                    {i.example_value}
                                </td>
                                <td className='flex gap-5 text-center'>
                                    <button onClick={() => onEdite(i.id)} className="btn btn-sm btn-soft btn-warning hover:text-white">แก้ไข</button>
                                    <button onClick={() => onDelete(i.id)} className="btn btn-sm btn-soft btn-error hover:text-white">ลบ</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default TableModelFields