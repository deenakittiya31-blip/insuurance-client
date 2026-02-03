import { useEffect } from 'react'
import { useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import { createCarUsage, createUsageType, listCarUsage, listUsageType, readUsageType, removeCarUsage, removeUsageType, statusCarUsage, statusUsageType, updateCarUsage, updateUsageType } from '../../service/car/CarUsage'
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

const initialState = {
    code: '',
    car_type_id: '',
    car_usage_id: '',
    code_usage: ''
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
    const [total, setTotal] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const lastPage = Math.ceil(total / perPage)

    useEffect(() => {
        getUsage();
        getCarUsageType(page, perPage);
    }, [page, perPage])


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
    const getCarUsageType = async (page, perPage) => {
        const res = await listUsageType(page, perPage)
            .then((res) => {
                setUsageType(res.data.data)
                setTotal(res.data.total)
            })
            .catch((err) => console.log(err))
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
                getCarUsageType(page, perPage)
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

            getCarUsageType(page, perPage)
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
            getCarUsageType(page, perPage)
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
            getCarUsageType(page, perPage)
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
                    <div className='flex items-baseline gap-3'>
                        <ModalCarUsage
                            form={form}
                            onChange={handleOnChange}
                            onSubmit={submitCarUsageType}
                        />
                        <SelectPerPage
                            onChange={handlePerPageChange}
                            perPage={perPage}
                        />
                    </div>
                </div>
                <TableCarUsageType
                    data={usageType}
                    page={page}
                    limit={perPage}
                    onDelete={hdlDeleteCarUsageType}
                    onEdite={openModal}
                    onToggle={hdlToggleActiveCarUsageType}
                />
                <EditCarUsage
                    form={form}
                    onChange={handleOnChange}
                    onSubmit={hdlUpdateCarUsageType}
                    isOpen={open}
                    onClose={closeForm}
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