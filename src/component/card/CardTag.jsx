import SearchBox from "../quotation_about/SearchBox"
import { MdOutlinePersonSearch } from "react-icons/md";
import { AiFillSmile } from "react-icons/ai";

const CardTag = ({ data, total, onSee, onSearch }) => {
    return (
        <dialog id="cardTag" className="modal">
            <div className="modal-box max-w-2xl max-h-162.5 grid gap-5 font-prompt text-text-primary">
                <h3 className="font-bold text-lg">รายชื่อสมาชิกในป้ายกำกับ <span className="font-normal text-sm text-info">(จำนวน {total})</span></h3>
                <SearchBox
                    width='w-full'
                    placeholder='ค้นหา...'
                    onChange={(e) => onSearch(e.target.value)}
                />
                {/* table member */}
                <div className="w-full h-72 overflow-y-auto">
                    <div className="overflow-x-auto font-prompt cursor-pointer">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='font-medium text-neutral-400'>ชื่อไลน์</th>
                                    <th className='font-medium text-neutral-400 text-center'>ชื่อ-นามสกุล</th>
                                    <th className='font-medium text-neutral-400 text-center'>เบอร์โทรศัพท์ </th>
                                    <th className='font-medium text-neutral-400 text-center'>กลุ่ม</th>
                                    <th className='font-medium text-neutral-400 '></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((i) => (
                                        <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    {
                                                        i.picture_url
                                                            ? <div className="avatar">
                                                                <div className="mask mask-squircle h-12 w-12">
                                                                    <img
                                                                        src={i.picture_url}
                                                                        alt="Avatar member" />
                                                                </div>
                                                            </div>
                                                            : <div className='flex justify-center items-center rounded-lg bg-main w-10 h-10 overflow-hidden'><AiFillSmile className='fill-white size-6' /></div>
                                                    }
                                                    <div>
                                                        <p className="font-semibold capitalize">{i.display_name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center">{i.first_name} {i.last_name}</td>
                                            <td className="text-center">{i.phone}</td>
                                            <td className="text-center">{i.group_name === null ? '-' : i.group_name}</td>
                                            <td className="text-center">

                                                <button onClick={() => onSee(i.id)} className="flex-1 join-item btn btn-soft btn-info flex gap-1 h-7 p-1"><MdOutlinePersonSearch size={13} />ดู</button>

                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog >
    )
}
export default CardTag