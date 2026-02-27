import React, { useEffect, useState } from 'react'
import TablePackage from '../../component/table/TablePackage'
import { copyPackage, listPackage, readPackage, removePackage, searchPackage, statusPackage, updateDiscountLevel } from '../../service/insurance/PackageInsur'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'
import SelectPerPage from '../../component/form/SelectPerPage'
import { Link, useNavigate } from 'react-router-dom'
import SearchBox from '../../component/quotation_about/SearchBox'
import TablePackageAdmin from '../../component/table/TablePackageAdmin'

const DiscountLevel = () => {
    const navigate = useNavigate();
    const [packageData, setPackageData] = useState([])
    const [readPackageData, setReadPackageData] = useState({})
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [textSearch, setTextSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [pagination, setPagination] = useState({})

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 500)
        return () => clearTimeout(delay)
    }, [textSearch])

    useEffect(() => {
        getPackage();
    }, [page, perPage, sortConfig, debouncedSearch])

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)
    }

    const getPackage = async () => {
        try {
            const res = await listPackage({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch
            });
            setPackageData(res.data.data)
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

    const openReadPackage = async (id) => {
        document.getElementById('cardpackage').showModal()

        try {
            const res = await readPackage(id)
            setReadPackageData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateLevel = async ({ package_id, group_code, discount_percent }) => {
        try {
            await updateDiscountLevel({ package_id, group_code, discount_percent })

            // ต้อง map กลับตรงนี้เพื่อ update state เท่านั้น
            const groupToField = {
                'M001': 'l1',
                'M002': 'l2',
                'M003': 'l3',
                'M004': 'l4',
                'M005': 'l5',
            }

            setPackageData(prev =>
                prev.map(item =>
                    item.id === package_id
                        ? { ...item, [groupToField[group_code]]: discount_percent }
                        : item
                )
            )

            toast.success('แก้ไขสำเร็จ')
        } catch (err) {
            console.log(err)
            toast.error('แก้ไขไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <Title
                title='ข้อมูลส่วนลดตามเลเวล'
            />
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='📒'
                        name='ตารางแพ็กเกจ'
                    />
                    <div className="flex gap-3 items-baseline-last">
                        <SearchBox
                            width='w-full'
                            placeholder='ค้นหาชื่อ, รหัส, ซ่อม, โปรโมชั่น...'
                            onChange={(e) => setTextSearch(e.target.value)}
                        />
                        <SelectPerPage
                            onChange={handlePerPageChange}
                            perPage={perPage}
                        />
                    </div>
                </div>
                <TablePackageAdmin
                    data={packageData}
                    page={page}
                    limit={perPage}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    onRead={openReadPackage}
                    readData={readPackageData}
                    onUpdateLevel={handleUpdateLevel}
                />
            </div>
            <div className='flex justify-between'>
                <div className="font-prompt text-sm text-gray-600">
                    แสดง {packageData.length} จาก {pagination.totalItems || 0} รายการ
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

export default DiscountLevel