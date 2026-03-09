import React from 'react'
import Sort from '../sortData/Sort'
import { dateFormatNoTime } from '../../utils/dateformat'
import { FiEdit } from "react-icons/fi";
import { Link } from 'react-router-dom'
import CardPackage from '../card/CardPackage';
import { useState } from 'react';

const TablePackageAdmin = ({ data, page, limit, onSort, sortConfig, onRead, onUpdateLevel, readData }) => {
    const [editingCell, setEditingCell] = useState(null) // { rowId, field }
    const [editCellValue, setEditCellValue] = useState('')

    const fieldToGroupCode = (field) => {
        const map = {
            l1: 'M001',
            l2: 'M002',
            l3: 'M003',
            l4: 'M004',
            l5: 'M005',
        }
        return map[field]
    }

    const handleDoubleClick = (rowId, field, currentValue) => {
        setEditingCell({ rowId, field })
        setEditCellValue(currentValue ?? 0)
    }

    const handleCancel = () => {
        setEditingCell(null)
        setEditCellValue('')
    }

    const handleSave = async (item, field) => {
        const num = Number(editCellValue)
        if (isNaN(num)) return handleCancel()

        await onUpdateLevel({
            package_id: item.id,
            group_code: fieldToGroupCode(field),
            discount_percent: num
        })
        handleCancel()
    }

    const handleKeyDown = (e, item, field) => {
        if (e.key === 'Enter') handleSave(item, field)
        if (e.key === 'Escape') handleCancel()
    }

    const renderLevelCell = (item, field) => {
        const isEditing = editingCell?.rowId === item.id && editingCell?.field === field

        if (isEditing) {
            return (
                <input
                    type="number"
                    min={0}
                    max={100}
                    className="input input-xs input-bordered w-16 text-center"
                    value={editCellValue}
                    autoFocus
                    onChange={(e) => setEditCellValue(e.target.value)}
                    onBlur={() => handleSave(item, field)}
                    onKeyDown={(e) => handleKeyDown(e, item, field)}
                />
            )
        }

        return (
            <span
                className="cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded select-none"
                title="ดับเบิ้ลคลิกเพื่อแก้ไข"
                onDoubleClick={() => handleDoubleClick(item.id, field, item[field])}
            >
                {item[field] ?? 0}
            </span>
        )
    }

    return (
        <div className="overflow-x-auto font-prompt">
            <table className="table">
                <thead>
                    <tr>
                        <th className='font-medium text-neutral-400'>ลำดับ</th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                วดป<Sort
                                    onSort={onSort}
                                    keyName='created_at'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                รหัสแพ็กเกจ<Sort
                                    onSort={onSort}
                                    keyName='package_id'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center  gap-3'>
                                ชื่อบริษัท<Sort
                                    onSort={onSort}
                                    keyName='namecompany'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                ประเภท<Sort
                                    onSort={onSort}
                                    keyName='nametype'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th>
                            <div className='flex items-center justify-center gap-3'>
                                ซ่อม<Sort
                                    onSort={onSort}
                                    keyName='repair_type'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-neutral-400'>
                            <div className='flex items-center justify-center gap-3'>
                                สิ้นสุด<Sort
                                    onSort={onSort}
                                    keyName='start_date'
                                    currentSort={sortConfig}
                                />
                            </div>
                        </th>
                        <th className='font-medium text-center text-neutral-400'>L1</th>
                        <th className='font-medium text-center text-neutral-400'>L2</th>
                        <th className='font-medium text-center text-neutral-400'>L3</th>
                        <th className='font-medium text-center text-neutral-400'>L4</th>
                        <th className='font-medium text-center text-neutral-400'>L5</th>
                        <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((i, idx) => (
                            <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                <td className="align-top">{(page - 1) * limit + idx + 1}</td>
                                <td className="align-top">{dateFormatNoTime(i.created_at)}</td>
                                <td className="align-top">{i.package_id}</td>
                                <td className="align-top">{i.namecompany}</td>
                                <td className="align-top text-center">{i.nametype}</td>
                                <td className="align-top text-center">{i.repair_type}</td>
                                <td className="align-top">
                                    <div className='flex flex-col text-center text-xs'>
                                        {dateFormatNoTime(i.start_date)}
                                        <span>ถึง</span>
                                        {dateFormatNoTime(i.end_date)}
                                    </div>
                                </td>
                                <td className="align-top text-center">{renderLevelCell(i, 'l1')}</td>
                                <td className="align-top text-center">{renderLevelCell(i, 'l2')}</td>
                                <td className="align-top text-center">{renderLevelCell(i, 'l3')}</td>
                                <td className="align-top text-center">{renderLevelCell(i, 'l4')}</td>
                                <td className="align-top text-center">{renderLevelCell(i, 'l5')}</td>
                                <td className="align-top">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className='flex gap-1'>
                                            <Link to={`/app/editpackage/${i.id}`}>
                                                <button className='btn btn-sm btn-soft btn-warning flex flex-1 gap-1 h-7'><FiEdit size={13} /> แก้ไข</button>
                                            </Link>
                                            <CardPackage
                                                onRead={() => onRead(i.id)}
                                                data={readData}
                                            />
                                        </div>
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

export default TablePackageAdmin