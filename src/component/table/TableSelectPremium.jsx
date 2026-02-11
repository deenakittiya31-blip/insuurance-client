import { MdHideImage } from "react-icons/md";
import Sort from "../sortData/Sort"

const TableSelectPackage = ({ data, page, limit, onChange, isChecked, onSort, sortConfig }) => {
    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>เลือก</th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                รูป<Sort
                                    onSort={onSort}
                                    keyName='display_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                ชื่อแพ็กเกจ<Sort
                                    onSort={onSort}
                                    keyName='first_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                ประเภท<Sort
                                    onSort={onSort}
                                    keyName='last_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                ทุนซ่อม<Sort
                                    onSort={onSort}
                                    keyName='group_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                รักษาพยาบาล<Sort
                                    onSort={onSort}
                                    keyName='phone'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                ราคารวม<Sort
                                    onSort={onSort}
                                    keyName='phone'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                ราคาสุทธิ<Sort
                                    onSort={onSort}
                                    keyName='phone'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                ราคาขาย<Sort
                                    onSort={onSort}
                                    keyName='phone'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                ส่วนลด %<Sort
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
                        data?.map((i, idx) => (
                            <tr key={i.index_premium} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td className="align-middle">{idx + 1}</td>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={i.index_premium}
                                            checked={isChecked(i.index_premium)}
                                            onChange={onChange}
                                            className="checkbox" />
                                    </label>
                                </th>
                                <td className="align-middle text-center">
                                    <div className="flex items-center gap-3">
                                        {
                                            i.logo_url
                                                ? <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={i.logo_url}
                                                            alt="Avatar member" />
                                                    </div>
                                                </div>
                                                : <div className='flex justify-center items-center rounded-lg bg-border w-10 h-10 overflow-hidden'><MdHideImage className='fill-white size-6' /></div>
                                        }
                                        <div>
                                            <p className="font-semibold capitalize">{i.namecompany}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle text-center">{i.package_name}</td>
                                <td className="align-middle text-center">{i.nametype}</td>
                                <td className="align-middle text-center">{i.repair_fund_max}</td>
                                <td className="align-middle text-center">{i.medical_expense}</td>
                                <td className="align-middle text-center">{i.total_premium}</td>
                                <td className="align-middle text-center">{i.net_income}</td>
                                <td className="align-middle text-center">{i.selling_price}</td>
                                <td className="align-middle text-center">{i.premium_discount}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default TableSelectPackage