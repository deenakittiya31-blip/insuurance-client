import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import { createYear, listYear, readYear, removeYear, updateYear } from '../../service/car/CarYear'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import Title from '../../component/form/Title'
import TableYear from '../../component/table/TableYear'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'
import ModalYear from '../../component/modal/ModalYear'
import EditYear from '../../component/edit/EditYear'

const initialState = {
    year_be: '',
    year_ad: ''
}

const CarYear = () => {
    const token = useInsureAuth((s) => s.token)
    const [form, setForm] = useState(initialState)
    const [yearData, setYearData] = useState([])
    const [idSelect, setIdSelect] = useState(null)
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 10;
    const lastPage = Math.ceil(total / limit)


    useEffect(() => {
        getYear(page);
    }, [page])

    const getYear = async (page) => {
        const res = await listYear(page)
            .then((res) => {
                setYearData(res.data.data)
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
                document.getElementById('my_modal_2').close()
                setForm(initialState)
                getYear(page)
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
            getYear(page);
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
            getYear(page)
        } catch (err) {
            console.log(err)
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
                <NameTable
                    icon='🚗'
                    name='ตารางประเภทการใช้งาน'
                />
                <TableYear
                    data={yearData}
                    page={page}
                    limit={limit}
                    onDelete={hdlDelete}
                    onEdite={openModal}
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