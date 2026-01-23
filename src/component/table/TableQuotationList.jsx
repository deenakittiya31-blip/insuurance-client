import { dateFormat } from "../../utils/dateformat"
import { Link } from "react-router-dom"
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaLine } from "react-icons/fa";
import { BiSolidFileJpg, BiSolidFilePdf } from "react-icons/bi";

const TableQuotationList = ({ data, page, limit, onDelete, isOpen, pdf, jpg }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ที่</th>
                        <th className='font-medium text-neutral-400'>ใบเสนอราคา No.</th>
                        <th className='font-medium text-neutral-400'>วันที่สร้าง</th>
                        <th className='font-medium text-neutral-400'>ชื่อลูกค้า</th>
                        <th className='font-medium text-neutral-400'>ทะเบียน</th>
                        <th className='font-medium text-neutral-400'>รายละเอียดรถยนต์</th>
                        <th className='font-medium text-neutral-400 text-center'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50 '>
                                <td className="align-top">{(page - 1) * limit + idx + 1}</td>
                                <td className="align-top">{i.q_id}</td>
                                <td className="align-top">{dateFormat(i.created_at)}</td>
                                <td className="align-top">{i.to_name}</td>
                                <td className="align-top">{i.details}</td>
                                <td className="align-top">
                                    <div className="flex gap-2">
                                        {i.car_brand}
                                        {
                                            i.car_model
                                                ? (<span className="line-clamp-1">{i.car_model}</span>)
                                                : (<span className="line-clamp-1">{i.sub_car_model}</span>)
                                        }
                                    </div>
                                    <div>
                                        {i.year_be}/{i.year_ad} {i.usage}
                                    </div>

                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-1">
                                            <button className='btn btn-sm btn-soft btn-info flex  flex-1 gap-1 h-7' onClick={() => isOpen(i.q_id)}>
                                                <FaLine size={13} /> ส่ง
                                            </button>
                                            <div className="join">
                                                <Link to={`/admin/compare-detail/${i.q_id}`}>
                                                    <button className="join-item btn btn-soft btn-warning flex gap-1 h-7 p-1"><FaRegEye size={13} /> ดู</button>
                                                </Link>
                                                <button onClick={() => onDelete(i.id)} className="join-item btn btn-soft btn-error flex gap-1 h-7 p-1"><AiOutlineDelete size={13} className="shrink" /> ลบ</button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1">
                                            <button className="btn btn-sm hover:btn-accent py-1"><BiSolidFilePdf size={17} onClick={() => pdf(i.q_id)} /> PDF</button>
                                            <button className="btn btn-sm hover:btn-accent py-1"><BiSolidFileJpg size={17} onClick={() => jpg(i.q_id)} /> JPG</button>
                                        </div>
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
export default TableQuotationList