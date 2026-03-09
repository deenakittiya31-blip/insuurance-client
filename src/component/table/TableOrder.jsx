import React, { useState } from 'react'
import Sort from '../sortData/Sort'
import { dateFormat } from '../../utils/dateformat'
import { numberFormat } from '../../utils/numerral';
import { FaLocationDot } from 'react-icons/fa6';

const TableOrder = ({ data, onSort, sortConfig, onUpdateStatus, onUpdateTracking }) => {
    const [editingId, setEditingId] = useState(null)
    const [editValue, setEditValue] = useState('')

    const startEdit = (item) => {
        setEditingId(item.id)
        setEditValue(item.tracking_order_id)
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditValue('')
    }

    const saveEdit = async (id, value) => {
        if (!value.trim()) return cancelEdit()
        await onUpdateTracking(id, value)
        cancelEdit()
    }

    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center gap-3'>
                                OrderId<Sort
                                    onSort={onSort}
                                    keyName='order_id'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                สถานะ<Sort
                                    onSort={onSort}
                                    keyName='status'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                วันที่สั่งซื้อ<Sort
                                    onSort={onSort}
                                    keyName='created_at'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center gap-3'>
                                ผู้สั่ง<Sort
                                    onSort={onSort}
                                    keyName='first_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400 max-w-24'>
                            <div className='flex items-center justify-center gap-3'>
                                ใบเสนอที่<Sort
                                    onSort={onSort}
                                    keyName='compare_id'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                รหัสเบี้ย<Sort
                                    onSort={onSort}
                                    keyName='premium_id'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ชื่อเบี้ย<Sort
                                    onSort={onSort}
                                    keyName='premium_name'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ราคา<Sort
                                    onSort={onSort}
                                    keyName='selling_price'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center gap-3'>
                                ชำระเงิน<Sort
                                    onSort={onSort}
                                    keyName='name_payment'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>เลขพัสดุ</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td className="align-top">{i.order_id}</td>
                                <td className="align-top">
                                    <select
                                        value={i.status}
                                        onChange={(e) => onUpdateStatus(i.id, e.target.value)}
                                        className="select select-sm w-full font-prompt"
                                    >
                                        <option value="สั่งซื้อสำเร็จ">สั่งซื้อสำเร็จ</option>
                                        <option value="กำลังจัดส่ง">กำลังจัดส่ง</option>
                                        <option value="จัดส่งเรียบร้อยแล้ว">จัดส่งเรียบร้อยแล้ว</option>
                                        <option value="ยกเลิก">ยกเลิก</option>
                                    </select>
                                </td>
                                <td className="align-top">{dateFormat(i.created_at)}</td>
                                <td className="align-top">
                                    <div className='flex items-center gap-1'>
                                        <div className="avatar">
                                            <div className="w-7 h-7 rounded-full">
                                                <img src={i.picture_url} />
                                            </div>
                                        </div>
                                        <p className='font-semibold'>{i.first_name}</p>
                                    </div>
                                </td>
                                <td className="align-top text-center">
                                    <p className='line-clamp-1'>{i.compare_id ? i.compare_id : '-'}</p>
                                </td>
                                <td className="align-top text-center">{i.premium_id}</td>
                                <td className="align-top">
                                    <p className='line-clamp-1'>{i.premium_name}</p>
                                </td>
                                <td className="align-top">{numberFormat(i.selling_price)}</td>
                                <td className="align-top">
                                    <div className='mb-1'>
                                        <button className="btn btn-xs text-text-primary" onClick={() => document.getElementById(`modaltableorder-${i.id}`).showModal()}>การชำระเงิน</button>
                                        <dialog id={`modaltableorder-${i.id}`} className="modal">
                                            <div className="modal-box w-11/12 max-w-70">
                                                <h3 className="font-bold text-lg text-center mb-3">ข้อมูลวิธีการชำระเงิน</h3>
                                                <div>
                                                    <div className='flex justify-between'>
                                                        <span className='font-medium'>วิธีการชำระเงิน</span>
                                                        <span className='font-normal'>{i.name_payment}</span>
                                                    </div>
                                                    {
                                                        i.bank_name != null && (
                                                            <>
                                                                <div className='flex justify-between'>
                                                                    <span className='font-medium'>ธนาคาร</span>
                                                                    <span className='font-normal'>{i.bank_name}</span>
                                                                </div>
                                                                <div className='flex justify-between'>
                                                                    <span className='font-medium'>ธนาคาร</span>
                                                                    <span className='font-normal'>{i.credit_installment} งวด</span>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                    <div className='w-full h-px bg-border/25 my-3' />
                                                    <div className='flex justify-between'>
                                                        <span className='font-medium'>ส่วนลดที่ได้</span>
                                                        <span className='font-normal'>{numberFormat(i.discount_price)} บาท</span>
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <span className='font-medium'>ส่วนลดเปอร์เซนต์</span>
                                                        <span className='font-normal'>{i.snap_discount_pct} %</span>
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <span className='font-medium'>ส่วนลดเงินบาท</span>
                                                        <span className='font-normal'>{i.snap_discount_amt} บาท</span>
                                                    </div>
                                                    {
                                                        i.snap_first_payment > 0 && (
                                                            <div className='flex justify-between'>
                                                                <span className='font-medium'>จ่ายครั้งแรก</span>
                                                                <span className='font-normal'>{numberFormat(i.snap_first_payment)} บาท</span>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        i.snap_charge > 0 && (
                                                            <div className='flex justify-between'>
                                                                <span className='font-medium'>ค่าธรรมเนียม</span>
                                                                <span className='font-normal'>{i.snap_charge} บาท</span>
                                                            </div>
                                                        )
                                                    }

                                                    <div className='flex justify-between'>
                                                        <span className='font-medium'>ส่วนลดเลเวล</span>
                                                        <span className='font-normal'>{i.snap_group_discount} %</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <form method="dialog" className="modal-backdrop">
                                                <button>close</button>
                                            </form>
                                        </dialog>
                                    </div>
                                    <p className='text-xs text-center'>{i.name_payment}</p>
                                </td>
                                <td className="align-top text-center">
                                    <div className='mb-1'>
                                        <button className="btn btn-xs text-text-primary" onClick={() => document.getElementById(`modaltableorder-${i.id}`).showModal()}>ที่อยู่จัดส่ง</button>
                                        <dialog id={`modaltableorder-${i.id}`} className="modal">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg">ที่อยู่จัดส่ง</h3>
                                                {i.address ? (
                                                    <div className="flex items-baseline gap-1">
                                                        <FaLocationDot className="size-5 fill-main" />
                                                        <div className="flex-1">
                                                            <p className="flex gap-2 items-baseline-last font-semibold text-sm">
                                                                {i.address.full_name}
                                                                <span className="font-normal text-xs text-gray-400">{i.address.phone}</span>
                                                            </p>
                                                            <span className="font-normal text-xs text-gray-400">{i.address.address_line} {i.address.subdistrict} {i.address.district} {i.address.province} {i.address.zipcode}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-gray-400">ไม่มีที่อยู่</p>
                                                )}
                                            </div>
                                            <form method="dialog" className="modal-backdrop">
                                                <button>close</button>
                                            </form>
                                        </dialog>
                                    </div>
                                    {editingId === i.id ? (
                                        <input
                                            autoFocus
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={(e) => saveEdit(i.id, e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    saveEdit(i.id, e.target.value)
                                                }
                                                if (e.key === 'Escape') cancelEdit()
                                            }}
                                            className="p-2 border rounded focus:outline-none bg-white"
                                        />
                                    ) : (
                                        <span
                                            className="cursor-pointer"
                                        >
                                            {i.tracking_order_id ? i.tracking_order_id : 'ไม่มี'}
                                        </span>
                                    )}
                                </td>
                                <td className="align-top">
                                    <div className='flex gap-5 justify-center'>
                                        <button onClick={() => startEdit(i)} className="btn btn-sm btn-soft btn-warning">แก้ไข</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}

export default TableOrder