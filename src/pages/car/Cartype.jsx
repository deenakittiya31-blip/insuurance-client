import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import Input from '../../component/form/Input'
import TableCarType from '../../component/table/TableCarType'
import { createCarType, listCarType, readCarType, removeCarType, statusCarType, updateCarType } from '../../service/car/CarType'
import Pagination from '../../component/paginationComponent/Pagination'
import Swal from 'sweetalert2'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import ModalCarType from '../../component/modal/ModalCarType'
import EditCarType from '../../component/edit/EditCarType'
import SelectPerPage from '../../component/form/SelectPerPage'
import SearchBox from '../../component/quotation_about/SearchBox'

const initialState = {
    type: '',
    code: '',
}

const Cartype = () => {
    const token = useInsureAuth((s) => s.token)
    const [typeData, setTypeData] = useState([])
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [pagination, setPagination] = useState({})
    const [textSearch, setTextSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 500)
        return () => clearTimeout(delay)
    }, [textSearch])

    useEffect(() => {
        getCarType();
    }, [page, perPage, sortConfig, debouncedSearch])

    const getCarType = async () => {
        try {
            const res = await listCarType({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch
            })

            setTypeData(res.data.data)
            setPagination(res.data.pagination)
        } catch (err) {
            console.log(err)
        }
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

    const handleSort = (keyName) => {
        let direction = 'ASC';

        if (sortConfig.key === keyName && sortConfig.direction === 'ASC') {
            direction = 'DESC';
        }

        setSortConfig({ key: keyName, direction });
    }

    const openModal = async (id) => {
        setOpen(true)
        setIdSelect(id)
        try {
            const res = await readCarType(token, id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
        setForm(initialState)
    }

    const handleSubmitType = (e) => {
        e.preventDefault()
        if (!form.type) {
            return toast('กรุณากรอกประเภทรถ')
        }

        createCarType(token, form)
            .then((res) => {
                document.getElementById('modalcartype').close()
                toast.success(res.data.msg)
                setForm(initialState)
                getCarType()
            })
            .catch((err) => console.log(err))
    }

    const hdlDeleteType = async (id) => {
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
            const res = await removeCarType(token, id)
            toast.success(res.data.msg)
            getCarType();
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updateCarType(token, idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getCarType()
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตไม่สำเร็จ')
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            await statusCarType(id, !currentStatus)
            getCarType()
            toast.success('อัปเดตสถานะสำเร็จ')
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            {/* หัวข้อ */}
            <div className='flex justify-between items-center'>
                <Title
                    title='ประเภทรถยนต์'
                    subtitle='ข้อมูลประเภทรถยนต์'
                />
                <ModalCarType
                    form={form}
                    onSubmit={handleSubmitType}
                    onChange={hdlOnChange}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='🚗'
                        name='ตารางประเภทรถยนต์'
                    />
                    <div className='flex items-end gap-5'>
                        <SearchBox
                            width='md:w-sm'
                            placeholder='ค้นหา...'
                            onChange={(e) => setTextSearch(e.target.value)}
                        />
                        <SelectPerPage
                            onChange={handlePerPageChange}
                            perPage={perPage}
                        />
                    </div>
                </div>
                <TableCarType
                    data={typeData}
                    onDelete={hdlDeleteType}
                    onEdit={openModal}
                    page={page}
                    limit={perPage}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    onToggle={hdlToggleActive}
                />
            </div>
            <div className='flex justify-between'>
                <div className="font-prompt text-sm text-gray-600">
                    แสดง {typeData.length} จาก {pagination.totalItems || 0} รายการ
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
            <EditCarType
                value={form}
                onChange={hdlOnChange}
                onSubmit={handleUpdate}
                isOpen={open}
                onClose={closeForm}
            />
        </div>
    )
}

export default Cartype