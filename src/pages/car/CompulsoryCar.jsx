import React, { useState, useEffect } from 'react'
import ModalCompul from '../../component/modal/ModalCompul'
import TableCompulsory from '../../component/table/TableCompulsory'
import { createCompulsory, ListCompulsory, readCompulsory, removeCompulsory, updateCompulsory } from '../../service/car/Compulsory'
import Swal from 'sweetalert2'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import EditCompulsory from '../../component/edit/EditCompulsory'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'

const initialState = {
    car_type_id: '',
    price: '',
    coverage_detail: ''
}

const CompulsoryCar = () => {
    const [compulsory, setCompulsory] = useState([])
    const token = useInsureAuth((s) => s.token)
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 10;
    const lastPage = Math.ceil(total / limit)

    useEffect(() => {
        getCompulsory(page)
    }, [page])

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

    const getCompulsory = async () => {
        await ListCompulsory()
            .then((res) => {
                setCompulsory(res.data.data)
                setTotal(res.data.total)
            })
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createCompulsory(token, form)
            document.getElementById('my_modal_2').close();
            getCompulsory(page);
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
            getCompulsory(page);
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
            getCompulsory(page)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='ยี่ห้อรถยนต์'
                    subtitle='ข้อมูลและรูปภาพของยี่ห้อรถยนต์'
                />
                <ModalCompul
                    form={form}
                    onChange={hdlOnChange}
                    onSubmit={hdlSubmit}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <NameTable
                    icon='🚗'
                    name='ตารางยี่ห้อ'
                />
                <TableCompulsory
                    data={compulsory}
                    onDelete={hdlDelete}
                    onEdite={openModal}
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
            <EditCompulsory
                value={form}
                onChange={hdlOnChange}
                onSubmit={handleUpdate}
                isOpen={open}
                onClose={closeForm}
            />
        </div>
    )
}

export default CompulsoryCar