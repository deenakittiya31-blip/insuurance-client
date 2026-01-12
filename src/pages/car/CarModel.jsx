import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import { createCarModel, listCarModel, readCarModel, removeCarModel, updateCarModel } from '../../service/car/CarModel'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import TableCarModel from '../../component/table/TableCarModel'
import Pagination from '../../component/paginationComponent/Pagination'
import ModalCarModel from '../../component/modal/ModalCarModel'
import useActionStore from '../../store/action-store'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import EditCarmodel from '../../component/edit/EditCarmodel'

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
    const limit = 10;
    const lastPage = Math.ceil(total / limit)

    useEffect(() => {
        getCarBrandSelect()
        getCarModel(page)
    }, [page])

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const getCarModel = async (page) => {
        const res = await listCarModel(page)
            .then((res) => {
                setCarModel(res.data.data)
                setTotal(res.data.total)
            })
            .catch((err) => console.log(err))
    }

    const openModal = async (id) => {
        setOpen(true)
        setIdSelect(id)
        try {
            const res = await readCarModel(token, id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
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
            getCarModel(page);
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
            getCarModel(page)
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตไม่สำเร็จ')
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
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <NameTable
                    icon='🚗'
                    name='ตารางรุ่นรถ'
                />
                <TableCarModel
                    data={carModel}
                    onDelete={hdlDelete}
                    page={page}
                    limit={limit}
                    onEdit={openModal}
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