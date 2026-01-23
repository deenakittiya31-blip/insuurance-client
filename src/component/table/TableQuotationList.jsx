import { dateFormat } from "../../utils/dateformat"
import DotsVertical from "../form/DotsVertical"

const TableQuotationList = ({ data, page, limit, onDelete, onEdite, onSend }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>หมายเลขใบเสนอราคา</th>
                        <th className='font-medium text-neutral-400'>วันที่สร้าง</th>
                        <th className='font-medium text-neutral-400'>ประเภทการใช้งาน</th>
                        <th className='font-medium text-neutral-400'>ปีรถยนต์</th>
                        <th className='font-medium text-neutral-400'>ยี่ห้อรถ</th>
                        <th className='font-medium text-neutral-400'>รุ่นรถ</th>
                        <th className='font-medium text-neutral-400 text-center'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td>{(page - 1) * limit + idx + 1}</td>
                                <td>{i.q_id}</td>
                                <td>{dateFormat(i.created_at)}</td>
                                <td>{i.usage}</td>
                                <td>{i.year_be}/{i.year_ad}</td>
                                <td>{i.car_brand}</td>
                                <td>
                                    {
                                        i.car_model
                                            ? (<span>{i.car_model}</span>)
                                            : (<span>{i.sub_car_model}</span>)
                                    }
                                </td>
                                <td className='flex gap-5 justify-center'>
                                    <DotsVertical
                                        id={i.id}
                                        q_id={i.q_id}
                                        type={i.import_by}
                                        onDelete={() => onDelete(i.id)}
                                    />
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