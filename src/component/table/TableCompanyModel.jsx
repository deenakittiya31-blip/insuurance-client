import { Link } from 'react-router-dom'

const TableCompanyModel = ({ data, page, limit, onDelete }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>บริษัท</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.company_id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td>{i.namecompany}</td>
                                <td>
                                    <div className='flex gap-5 justify-center'>
                                        <Link to={`/app/custommodel-detail/${i.company_id}`} >
                                            <button className="btn btn-sm btn-soft btn-warning">แก้ไข</button>
                                        </Link>
                                        <button onClick={() => onDelete(i.company_id)} className="btn btn-sm btn-soft btn-error">ลบ</button>
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
export default TableCompanyModel