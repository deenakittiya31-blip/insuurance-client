import { FaRegEye } from "react-icons/fa6"

const CardGroupCredit = ({ onRead, data }) => {
    return (
        <div>
            <button className='btn btn-sm btn-soft btn-info flex flex-1 gap-1 h-7' onClick={onRead}><FaRegEye size={13} /> ดู</button>
            <dialog id="modalCardGroup" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">ชุดข้อมูลงวดบัตรเครดิต ชุด <span className="text-info">{data.group_name}</span></h3>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-3">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='font-medium text-neutral-400'>รูปภาพ</th>
                                    <th className='font-medium text-neutral-400'>ธนาคาร</th>
                                    <th className='font-medium text-neutral-400'>จำนวนเดือน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.bankingroup?.map((i, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div className="w-10 h-10 rounded-md overflow-clip">
                                                <img src={i.logo_url} />
                                            </div>
                                        </td>
                                        <td className="font-semibold">{i.bank_name}</td>
                                        <td className="text-wrap">
                                            {i.installment_month?.map((month, index) => (
                                                <span key={index} >
                                                    {month}{index < i.installment_month.length - 1 ? ', ' : ' เดือน'}
                                                </span>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}
export default CardGroupCredit