import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import { createCarModel, listCarModel, readCarModel, removeCarModel, statusCarModel, updateCarModel } from '../../service/car/CarModel'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import TableCarModel from '../../component/table/TableCarModel'
import Pagination from '../../component/paginationComponent/Pagination'
import ModalCarModel from '../../component/modal/ModalCarModel'
import useActionStore from '../../store/action-store'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import EditCarmodel from '../../component/edit/EditCarmodel'
import SelectPerPage from '../../component/form/SelectPerPage'
import SearchBox from '../../component/quotation_about/SearchBox'

const initialState = {
    brand_id: '',
    name: ''
}

const CarModel = () => {
    const token = useInsureAuth((s) => s.token)
    const [carModel, setCarModel] = useState([])
    const [form, setForm] = useState(initialState)
    const getCarBrandSelect = useActionStore((s) => s.getCarBrandSelect)
    const carbrand = useActionStore((s) => s.carbrand)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
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
        getCarModel()
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

    const getCarModel = async () => {
        try {
            const res = await listCarModel({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch
            })

            setCarModel(res.data.data)
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

    const handleOpenEditModal = async (id) => {
        getCarBrandSelect()
        setOpen(true)
        setIdSelect(id)
        try {
            const res = await readCarModel(token, id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const handleOpenCreateModal = () => {
        getCarBrandSelect()
        document.getElementById('modalcarmodel').showModal()
    }

    const closeForm = () => {
        setOpen(false)
        setForm(initialState)
    }



    const hdlSubmit = async (e) => {
        e.preventDefault()
        if (!form.brand_id) {
            toast.error('กรุณาเลือกยี่ห้อรถ')
            return
        }

        if (!form.name.trim()) {
            toast.error('กรุณากรอกชื่อรุ่นรถ')
            return
        }

        try {
            const res = await createCarModel(token, form)
            document.getElementById('modalcarmodel').close()
            toast.success(res.data.msg)
            setForm(initialState)
            getCarModel();
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
            const res = await removeCarModel(token, id)
            getCarModel();
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const hdlUpdate = async (e) => {
        e.preventDefault()
        try {
            await updateCarModel(token, idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success('อัปเดตเรียบร้อย')
            getCarModel()
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตไม่สำเร็จ')
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            await statusCarModel(id, !currentStatus)
            getCarModel()
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
                    title='รุ่นรถรถยนต์'
                    subtitle='ข้อมูลของรุ่นรถรถยนต์'
                />
                <ModalCarModel
                    form={form}
                    onSubmit={hdlSubmit}
                    onChange={hdlOnChange}
                    carbrand={carbrand}
                    isOpen={handleOpenCreateModal}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='🚗'
                        name='ตารางรุ่นรถ'
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
                <TableCarModel
                    data={carModel}
                    onDelete={hdlDelete}
                    page={page}
                    limit={perPage}
                    onEdit={handleOpenEditModal}
                    onToggle={hdlToggleActive}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                />
            </div>
            <div className='flex justify-between'>
                <div className="font-prompt text-sm text-gray-600">
                    แสดง {carModel.length} จาก {pagination.totalItems || 0} รายการ
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
            <EditCarmodel
                carbrand={carbrand}
                value={form}
                onChange={hdlOnChange}
                onSubmit={hdlUpdate}
                isOpen={open}
                onClose={closeForm}
            />
        </div>
    )
}

export default CarModel