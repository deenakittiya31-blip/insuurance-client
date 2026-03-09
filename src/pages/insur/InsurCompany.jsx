import React, { useEffect, useState } from 'react'
import ModalCompany from '../../component/modal/ModalCompany'
import TableCompany from '../../component/table/TableCompany'
import { createCompany, listCompany, readCompany, removeCompany, statusCompany, updateCompany } from '../../service/insurance/CompanyInsur'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import useInsureAuth from '../../store/auth-store'
import EditCompany from '../../component/edit/EditCompany'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'
import SelectPerPage from '../../component/form/SelectPerPage'
import SearchBox from '../../component/quotation_about/SearchBox'
import { companySchema } from '../../utils/schema'

const initialState = {
    namecompany: '',
    code: '',
    logo_url: null,
    phone: '',
    logo_public_id: null
}

const InsurCompany = () => {
    const [company, setCompany] = useState([])
    const token = useInsureAuth((s) => s.token)
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [pagination, setPagination] = useState({})
    const [textSearch, setTextSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [errors, setErrors] = useState({})
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 500)
        return () => clearTimeout(delay)
    }, [textSearch])

    useEffect(() => {
        getCompany();
    }, [page, perPage, sortConfig, debouncedSearch])

    const handleOnChange = (e) => {
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
            const res = await readCompany(token, id)
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

    const hdlSubmit = async (e) => {
        e.preventDefault()

        if (!form.namecompany || !form.logo_url) {
            toast.error('กรุณากรอกชื่อและเลือกรูป')
            return
        }

        const result = companySchema.safeParse(form)

        if (!result.success) {
            const fieldErrors = {}
            result.error.issues.forEach(err => {  //.issues แทน .errors
                fieldErrors[err.path[0]] = err.message
            })
            setErrors(fieldErrors)
            return
        }

        setErrors({})

        try {
            const res = await createCompany(token, form)
            document.getElementById('modalcompany').close();
            getCompany();
            toast.success(res.data.msg)
            setForm(initialState)

        } catch (err) {
            console.log(err)
            document.getElementById('modalcompany').close();
            toast.error(err.response.data.message)

        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updateCompany(token, idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getCompany()

        } catch (err) {
            console.log(err)
        }
    }

    const getCompany = async () => {
        try {
            const res = await listCompany({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch
            })
            setCompany(res.data.data)
            setPagination(res.data.pagination)
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
            const res = await removeCompany(token, id)
            getCompany();
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            await statusCompany(id, !currentStatus)
            getCompany();
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
                    title='บริษัทประกัน'
                    subtitle='ข้อมูลของบริษัทประกันที่เป็นพาร์ทเนอร์'
                />
                <ModalCompany
                    form={form}
                    setForm={setForm}
                    onChange={handleOnChange}
                    onSubmit={hdlSubmit}
                    error={errors}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='🏢'
                        name='ตารางบริษัท'
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
                <TableCompany
                    data={company}
                    onDelete={hdlDelete}
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
                    แสดง {company.length} จาก {pagination.totalItems || 0} รายการ
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
            <EditCompany
                isOpen={open}
                form={form}
                setForm={setForm}
                onSubmit={handleUpdate}
                onChange={handleOnChange}
                onClose={closeForm}
            />
        </div>
    )
}

export default InsurCompany