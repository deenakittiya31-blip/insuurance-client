import React, { useState, useEffect } from 'react'
import ModalCompul from '../../component/modal/ModalCompul'
import TableCompulsory from '../../component/table/TableCompulsory'
import { createCompulsory, ListCompulsory, readCompulsory, removeCompulsory, statusCompulsory, updateCompulsory } from '../../service/car/Compulsory'
import Swal from 'sweetalert2'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import EditCompulsory from '../../component/edit/EditCompulsory'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'
import SelectPerPage from '../../component/form/SelectPerPage'
import SearchBox from '../../component/quotation_about/SearchBox'

const initialState = {
    car_type: '',
    car_usage_type_id: '',
    code_sub: '',
    detail: '',
    net_price: '',
    vat: '',
    stamp: '',
    total: '',
}

const CompulsoryCar = () => {
    const [compulsory, setCompulsory] = useState([])
    const token = useInsureAuth((s) => s.token)
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
        getCompulsory(page, perPage)
    }, [page, perPage, sortConfig, debouncedSearch])

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
            const res = await readCompulsory(token, id)
            setForm(res.data.data)

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

    const closeForm = () => {
        setOpen(false)
        setForm(initialState)
    }

    const getCompulsory = async () => {
        try {
            const res = await ListCompulsory({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch
            })
            setCompulsory(res.data.data)
            setPagination(res.data.pagination)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createCompulsory(form)
            document.getElementById('modalcompul').close();
            setForm(initialState)
            getCompulsory();
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
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
            const res = await removeCompulsory(token, id)
            getCompulsory();
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updateCompulsory(token, idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getCompulsory()

        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            console.log(currentStatus)
            await statusCompulsory(id, !currentStatus)
            getCompulsory()
            toast.success('อัปเดตสถานะสำเร็จ')
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title title='พรบ. รถยนต์' />
                <ModalCompul
                    form={form}
                    onChange={hdlOnChange}
                    onSubmit={hdlSubmit}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='🚗'
                        name='ตารางพ.ร.บ. รถยนต์'
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
                <TableCompulsory
                    data={compulsory}
                    onDelete={hdlDelete}
                    onEdite={openModal}
                    page={page}
                    limit={perPage}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    onToggle={hdlToggleActive}
                />
            </div>
            <div className='flex justify-between'>
                <div className="font-prompt text-sm text-gray-600">
                    แสดง {compulsory.length} จาก {pagination.totalItems || 0} รายการ
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
            <EditCompulsory
                form={form}
                onChange={hdlOnChange}
                onSubmit={handleUpdate}
                isOpen={open}
                onClose={closeForm}
            />
        </div>
    )
}

export default CompulsoryCar