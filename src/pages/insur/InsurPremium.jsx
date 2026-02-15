import React, { useEffect, useState } from 'react'
import TablePremium from '../../component/table/TablePremium'
import { listPremium, removePremium, searchPremium, statusPremium } from '../../service/insurance/PremiumInsur'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'
import SelectPerPage from '../../component/form/SelectPerPage'
import { Link } from 'react-router-dom'
import SearchBox from '../../component/quotation_about/SearchBox'

const InsurPremium = () => {
    const [premium, setPremium] = useState([])
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [textSearch, setTextSearch] = useState('')
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [pagination, setPagination] = useState({})
    const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 500)
        return () => clearTimeout(delay)
    }, [textSearch])

    useEffect(() => {
        getPremium();
    }, [page, perPage, sortConfig, debouncedSearch])

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)
    }

    const getPremium = async () => {
        try {
            const res = await listPremium({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch
            })
            setPremium(res.data.data)
            setPagination(res.data.pagination)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSort = (keyName) => {
        let direction = 'ASC';

        if (sortConfig.key === keyName && sortConfig.direction === 'ASC') {
            direction = 'DESC';
        }

        setSortConfig({ key: keyName, direction });
    }

    const hdlDelete = async (id) => {
        const result = await Swal.fire({
            title: "คุณแน่ใจ ?",
            text: "ต้องการจะลบจริง ๆ ใช่ไหม?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#E5E4E2",
            confirmButtonColor: "#d33",
            confirmButtonText: "ลบ",
            cancelButtonText: 'ยกเลิก'
        })

        if (!result.isConfirmed) return

        try {
            const res = await removePremium(id)
            getPremium()
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            console.log('Toggling:', { id, newStatus: !currentStatus })
            const res = await statusPremium(id, !currentStatus)

            console.log('Success response:', res.data)
            getPremium()
            toast.success(res.data.msg)
        } catch (err) {
            console.log('Error response:', err.response)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='เบี้ยประกัน'
                    subtitle='ข้อมูลของเบี้ยประกัน ชื่อแพ็กเกจ และราคารวม'
                />
                <Link to='/app/add-premium'>
                    <button className='btn bg-main text-white font-prompt hover:bg-second'>สร้างเบี้ยแพ็กเกจ</button>
                </Link>
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='🪙'
                        name='ตารางเบี้ยประกัน'
                    />
                    <div className="flex gap-3 items-baseline-last">
                        <SearchBox
                            width='w-full'
                            placeholder='ค้นหาชื่อเบี้ย, รหัสเบี้ย...'
                            onChange={(e) => setTextSearch(e.target.value)}
                        />
                        <SelectPerPage
                            onChange={handlePerPageChange}
                            perPage={perPage}
                        />
                    </div>
                </div>
                <TablePremium
                    data={premium}
                    onDelete={hdlDelete}
                    page={page}
                    limit={perPage}
                    onToggle={hdlToggleActive}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                />
            </div>
            <div className='flex justify-between'>
                <div className="font-prompt text-sm text-gray-600">
                    แสดง {premium.length} จาก {pagination.totalItems || 0} รายการ
                    (หน้า {pagination.page || 1} / {pagination.totalPages || 1})
                </div>
                {
                    pagination.totalItems > perPage && (
                        <Pagination
                            disablePrev={!pagination.hasPrevPage}
                            disableNext={!pagination.hasNextPage}
                            onPrevious={() => setPage(prev => prev - 1)}
                            onNext={() => setPage(prev => prev + 1)}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default InsurPremium