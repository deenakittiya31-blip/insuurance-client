import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import { createYear, listYear, readYear, removeYear, statusCarYear, updateYear } from '../../service/car/CarYear'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import Title from '../../component/form/Title'
import TableYear from '../../component/table/TableYear'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'
import ModalYear from '../../component/modal/ModalYear'
import EditYear from '../../component/edit/EditYear'
import SelectPerPage from '../../component/form/SelectPerPage'

const initialState = {
    year_be: '',
    year_ad: ''
}

const CarYear = () => {
    const token = useInsureAuth((s) => s.token)
    const [form, setForm] = useState(initialState)
    const [yearData, setYearData] = useState([])
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [idSelect, setIdSelect] = useState(null)
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState(0)
    const lastPage = Math.ceil(total / perPage)


    useEffect(() => {
        getYear(page, perPage, sortConfig.key, sortConfig.direction);
    }, [page, perPage, sortConfig])

    const getYear = async (page, perPage, sortKey = 'id', sortDirection = 'DESC') => {
        await listYear(page, perPage, sortKey, sortDirection)
            .then((res) => {
                setYearData(res.data.data)
                setTotal(res.data.total)
            })
            .catch((err) => console.log(err))
    }

    const handleSort = (keyName) => {
        let direction = 'ASC';

        if (sortConfig.key === keyName && sortConfig.direction === 'ASC') {
            direction = 'DESC';
        }

        setSortConfig({ key: keyName, direction });
    }

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)  //รีเซ็ตกลับไปหน้า 1
    }

    const openModal = async (id) => {
        setOpen(true)
        setIdSelect(id)
        try {
            const res = await readYear(token, id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
        setForm(initialState)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.year_ad) {
            toast.error('กรุณากรอกปี')
            return
        }

        if (!form.year_be) {
            toast.error('กรุณากรอกปี')
            return
        }

        createYear(token, form)
            .then((res) => {
                toast.success(res.data.msg)
                document.getElementById('modalcaryear').close()
                setForm(initialState)
                getYear(page, perPage)
            })
            .catch((err) => console.log(err))
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
            const res = await removeYear(token, id)
            toast.success(res.data.msg)
            getYear(page, perPage);
        } catch (err) {
            console.log(err)
        }
    }

    const hdlUpdateYear = async (e) => {
        e.preventDefault()
        try {
            const res = await updateYear(token, idSelect, form)
            closeForm()
            toast.success(res.data.msg)
            getYear(page, perPage)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            await statusCarYear(id, !currentStatus)
            getYear(page, perPage)
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
                    title='ปีรถยนต์'
                    subtitle='ข้อมูลปีรถยนต์'
                />
                <ModalYear
                    form={form}
                    onChange={hdlOnChange}
                    onSubmit={handleSubmit}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='🚗'
                        name='ตารางประเภทการใช้งาน'
                    />
                    <SelectPerPage
                        onChange={handlePerPageChange}
                        perPage={perPage}
                    />
                </div>
                <TableYear
                    data={yearData}
                    page={page}
                    limit={perPage}
                    onDelete={hdlDelete}
                    onEdite={openModal}
                    onSort={handleSort}
                    sortConfig={sortConfig}
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
            <EditYear
                form={form}
                onChange={hdlOnChange}
                onSubmit={hdlUpdateYear}
                isOpen={open}
                onClose={closeForm}
            />
        </div>
    )
}

export default CarYear