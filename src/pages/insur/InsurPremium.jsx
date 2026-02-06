import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import ModalPremium from '../../component/modal/ModalPremium'
import TablePremium from '../../component/table/TablePremium'
import { createPremium, listPremium, readPremium, removePremium, statusPremium, updatePremium } from '../../service/insurance/PremiumInsur'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import EditPremium from '../../component/edit/EditPremium'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'
import SelectPerPage from '../../component/form/SelectPerPage'
import { Link } from 'react-router-dom'

const initialState = {
    package_id: '',
    car_usage_id: '',
    car_year: '',
    premium_price: '',
    compulsory_price: '',
}

const InsurPremium = () => {
    const token = useInsureAuth((s) => s.token)
    const [premium, setPremium] = useState([])
    const [form, setForm] = useState(initialState)
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const lastPage = Math.ceil(total / perPage)

    useEffect(() => {
        getPremium(page, perPage, sortConfig.key, sortConfig.direction);
    }, [page, perPage, sortConfig])

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)
    }

    const openModal = async (id) => {
        setOpen(true)
        setIdSelect(id)
        try {
            const res = await readPremium(token, id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
    }

    const getPremium = async (page, perPage, sortKey = 'id', sortDirection = 'DESC') => {
        try {
            const res = await listPremium(page, perPage, sortKey, sortDirection)
            setPremium(res.data.data)
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

    console.log(premium)

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updatePremium(token, idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getPremium(page, perPage, sortConfig.key, sortConfig.direction)

        } catch (err) {
            console.log(err)
        }
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
            getPremium(page, perPage, sortConfig.key, sortConfig.direction)
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            await statusPremium(id, !currentStatus)
            getPremium(page, perPage, sortConfig.key, sortConfig.direction)
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
                    title='เบี้ยประกัน'
                    subtitle='ข้อมูลของเบี้ยประกัน ชื่อแพ็กเกจ และราคารวม'
                />
                <Link to='/app/add-premium'>
                    <button className='btn bg-main text-white font-prompt hover:bg-second'>เพิ่มเบี้ยแพ็กเกจ</button>
                </Link>
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='🪙'
                        name='ตารางเบี้ยประกัน'
                    />
                    <SelectPerPage
                        onChange={handlePerPageChange}
                        perPage={perPage}
                    />
                </div>
                <TablePremium
                    data={premium}
                    onDelete={hdlDelete}
                    onEdite={openModal}
                    page={page}
                    limit={perPage}
                    onToggle={hdlToggleActive}
                    onSort={handleSort}
                    sortConfig={sortConfig}
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
            <EditPremium
                value={form}
                onchange={hdlOnChange}
                onSubmit={handleUpdate}
                isOpen={open}
                onClose={closeForm}
            />
        </div>
    )
}

export default InsurPremium