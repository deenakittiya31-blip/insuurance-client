import { useEffect } from 'react'
import { useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import { createCarUsage, createUsageType, listCarUsage, listUsageType, readUsageType, removeCarUsage, removeUsageType, statusCarUsage, statusIsSee, statusUsageType, updateCarUsage, updateUsageType } from '../../service/car/CarUsage'
import TableCarUsage from '../../component/table/TableCarUsage'
import toast from 'react-hot-toast'
import Pagination from '../../component/paginationComponent/Pagination'
import Swal from 'sweetalert2'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import SelectPerPage from '../../component/form/SelectPerPage'
import TextInput from '../../component/form/TextInput'
import ModalCarUsage from '../../component/modal/ModalCarUsage'
import TableCarUsageType from '../../component/table/TableCarUsageType'
import EditCarUsage from '../../component/edit/EditCarUsage'
import SearchBox from '../../component/quotation_about/SearchBox'

const initialState = {
    code: '',
    car_type_id: '',
    car_usage_id: '',
    code_usage: '',
    visibility_no: ''
}

const UsageCar = () => {
    const token = useInsureAuth((s) => s.token)
    const [usage, setUsage] = useState('')
    const [form, setForm] = useState(initialState)
    const [usageData, setUsageData] = useState([])
    const [usageType, setUsageType] = useState([])
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [pagination, setPagination] = useState({})
    const [textSearch, setTextSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });

    useEffect(() => {
        getUsage();
    }, [])

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 500)
        return () => clearTimeout(delay)
    }, [textSearch])

    useEffect(() => {
        getCarUsageType();
    }, [page, perPage, sortConfig, debouncedSearch])


    const getUsage = async () => {
        const res = await listCarUsage()
            .then((res) => {
                setUsageData(res.data.data)
            })
            .catch((err) => console.log(err))
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)  //รีเซ็ตกลับไปหน้า 1
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!usage.trim()) {
            return toast('กรุณากรอกประเภทการใช้งาน')
        }
        createCarUsage(token, usage)
            .then((res) => {
                toast.success(res.data.msg)
                setUsage('')
                getUsage()
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
            const res = await removeCarUsage(token, id)
            getUsage();
            toast.success(res.data.msg)

        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }

    const hdlUpdateCarUsage = async (id, value) => {
        try {
            const res = await updateCarUsage(token, id, value)
            toast.success(res.data.msg)
            getUsage()
        } catch (err) {
            console.log(err)
        }
    }

    //car usage type
    const getCarUsageType = async () => {
        try {
            const res = await listUsageType({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: textSearch
            })

            setUsageType(res.data.data)
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

    const submitCarUsageType = (e) => {
        e.preventDefault()
        if (!form.car_type_id || !form.car_usage_id) {
            return toast('กรุณากรอกข้อมูลให้ครบ')
        }
        createUsageType(token, form)
            .then((res) => {
                toast.success(res.data.msg)
                document.getElementById('modalcarusagetype').close()
                setForm(initialState)
                getCarUsageType()
            })
            .catch((err) => console.log(err))
    }

    const hdlDeleteCarUsageType = async (id) => {
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
            const res = await removeUsageType(id)

            getCarUsageType()
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }

    const openModal = async (id) => {
        setOpen(true)
        setIdSelect(id)

        try {
            const res = await readUsageType(id)
            setForm(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(idSelect)

    const closeForm = () => {
        setOpen(false)
        setForm(initialState)
    }

    const hdlUpdateCarUsageType = async (e) => {
        e.preventDefault()

        try {
            const res = await updateUsageType(idSelect, form)
            toast.success(res.data.msg)
            closeForm()
            setForm(initialState)
            getCarUsageType()
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActiveCarUsage = async (id, currentStatus) => {
        try {
            await statusCarUsage(id, !currentStatus)
            getUsage()
            toast.success('อัปเดตสถานะสำเร็จ')
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    const hdlToggleActiveCarUsageType = async (id, currentStatus) => {
        try {
            await statusUsageType(id, !currentStatus)
            getCarUsageType()
            toast.success('อัปเดตสถานะสำเร็จ')
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    const hdlToggleIsSee = async (id, currentStatus) => {
        try {
            await statusIsSee(id, !currentStatus)
            getCarUsageType()
            toast.success('อัปเดตสถานะสำเร็จ')
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex justify-between items-center'>
                <Title
                    title='ประเภทการใช้งาน'
                    subtitle='ข้อมูลประเภทการใช้งานรถยนต์'
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='🚗'
                        name='ตารางประเภทการใช้งานรถยนต์'
                    />
                    <ModalCarUsage
                        form={form}
                        onChange={handleOnChange}
                        onSubmit={submitCarUsageType}
                    />
                </div>
                <div className='flex justify-between items-end gap-3'>
                    <SelectPerPage
                        onChange={handlePerPageChange}
                        perPage={perPage}
                    />
                    <SearchBox
                        width='md:w-sm'
                        placeholder='ค้นหา...'
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                </div>
                <TableCarUsageType
                    data={usageType}
                    page={page}
                    limit={perPage}
                    onDelete={hdlDeleteCarUsageType}
                    onEdite={openModal}
                    onToggle={hdlToggleActiveCarUsageType}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    isSee={hdlToggleIsSee}
                />
                <EditCarUsage
                    form={form}
                    onChange={handleOnChange}
                    onSubmit={hdlUpdateCarUsageType}
                    isOpen={open}
                    onClose={closeForm}
                />
            </div>
            <div className='flex justify-between'>
                <div className="font-prompt text-sm text-gray-600">
                    แสดง {usageType.length} จาก {pagination.totalItems || 0} รายการ
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
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='🚗'
                        name='ตารางประเภทการใช้งาน'
                    />
                    <form onSubmit={handleSubmit} className='flex items-baseline-last gap-1 font-prompt'>
                        <TextInput
                            value={usage}
                            placeholder='เพิ่มประเภทการใช้งานของรถ'
                            width='w-40 lg:w-xs'
                            name='year'
                            type='text'
                            onChange={(e) => setUsage(e.target.value)}
                        />
                        <button className="btn bg-main px-5 rounded-md text-white font-semibold">บันทึก</button>
                    </form>
                </div>
                <TableCarUsage
                    data={usageData}
                    onDelete={hdlDelete}
                    onUpdate={hdlUpdateCarUsage}
                    onToggle={hdlToggleActiveCarUsage}
                />
            </div>
        </div>
    )
}

export default UsageCar