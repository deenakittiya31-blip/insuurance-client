import React, { useEffect, useState } from 'react'
import TablePackage from '../../component/table/TablePackage'
import { listPackage, readPackage, removePackage, statusPackage } from '../../service/insurance/PackageInsur'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'
import SelectPerPage from '../../component/form/SelectPerPage'
import { Link } from 'react-router-dom'

const InsurPackage = () => {
    const [packageData, setPackageData] = useState([])
    const [readPackageData, setReadPackageData] = useState({})
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const lastPage = Math.ceil(total / perPage)

    useEffect(() => {
        getPackage(page, perPage, sortConfig.key, sortConfig.direction);
    }, [page, perPage, sortConfig])

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)
    }

    const getPackage = async (page, perPage, sortKey = 'id', sortDirection = 'DESC') => {
        try {
            const res = await listPackage(page, perPage, sortKey, sortDirection);
            setPackageData(res.data.data)
            setTotal(res.data.total)
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
            const res = await removePackage(id)
            getPackage(page, perPage, sortConfig.key, sortConfig.direction)
            toast.success(res.data.msg)

        } catch (err) {
            console.log(err)
        }
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

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            await statusPackage(id, !currentStatus)
            getPackage(page, perPage, sortConfig.key, sortConfig.direction)
            toast.success('อัปเดตสถานะสำเร็จ')
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='แพ็กเกจ'
                    subtitle='ข้อมูลของแพ็กเกจแต่ละบริษัท'
                />
                <Link to='/app/addpackage'>
                    <button className='btn bg-main text-white font-prompt hover:bg-second'>เพิ่มแพ็กเกจ</button>
                </Link>
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='📒'
                        name='ตารางแพ็กเกจ'
                    />
                    <SelectPerPage
                        onChange={handlePerPageChange}
                        perPage={perPage}
                    />
                </div>
                <TablePackage
                    data={packageData}
                    onDelete={hdlDelete}
                    page={page}
                    limit={perPage}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    onRead={openReadPackage}
                    readData={readPackageData}
                    onToggle={hdlToggleActive}
                />
            </div>
            <div className='flex justify-end'>
                {
                    total > perPage && (
                        <Pagination
                            disablePrev={page === 1}
                            disableNext={page === lastPage}
                            onPrevious={() => setPage(page - 1)}
                            onNext={() => setPage(page + 1)}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default InsurPackage