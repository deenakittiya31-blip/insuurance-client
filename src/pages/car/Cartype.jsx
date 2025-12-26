import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import Input from '../../component/form/Input'
import TableCarType from '../../component/table/TableCarType'
import { createCarType, listCarType, removeCarType, updateCarType } from '../../service/car/CarType'
import Pagination from '../../component/paginationComponent/Pagination'
import Swal from 'sweetalert2'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import ModalCarType from '../../component/modal/ModalCarType'
import useActionStore from '../../store/action-store'
import EditCarType from '../../component/edit/EditCarType'

const initialState = {
    type: '',
    code: '',
    car_usage_id: ''
}

const Cartype = () => {
    const token = useInsureAuth((s) => s.token)
    const getCarUsage = useActionStore((s) => s.getCarUsageSelect)
    const carUsage = useActionStore((s) => s.carUsage)
    const [typeData, setTypeData] = useState([])
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 10;
    const lastPage = Math.ceil(total / limit)

    useEffect(() => {
        getCarType(page);
        getCarUsage();
    }, [page])

    const getCarType = async (page) => {
        const res = await listCarType(page)
            .then((res) => {
                setTypeData(res.data.data)
                setTotal(res.data.total)
            })
            .catch((err) => console.log(err))
    }

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
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

    const closeForm = () => {
        setOpen(false)
        setForm(initialState)
    }

    const handleSubmitType = (e) => {
        e.preventDefault()
        if (!form.type) {
            return toast('กรุณากรอกประเภทรถ')
        }
        if (!form.car_usage_id) {
            return toast('กรุณากรอกประเภทการใช้งานรถ')
        }
        createCarType(token, form)
            .then((res) => {
                document.getElementById('my_modal_2').close()
                toast.success(res.data.msg)
                setForm(initialState)
                getCarType(page)
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
            getCarType(page);
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
            getCarType(page)
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตไม่สำเร็จ')
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
                    carUsage={carUsage}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <NameTable
                    icon='🚗'
                    name='ตารางประเภทรถยนต์'
                />
                <TableCarType
                    data={typeData}
                    onDelete={hdlDeleteType}
                    onEdit={openModal}
                    page={page}
                    limit={limit}
                />
            </div>
            <div className='flex justify-end'>
                {
                    total > limit && (
                        <Pagination
                            disablePrev={page === 1}
                            disableNext={page === lastPage}
                            onPrevious={() => setPage(page - 1)}
                            onNext={() => setPage(page + 1)}
                        />
                    )
                }
            </div>
            <EditCarType
                carUsage={carUsage}
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