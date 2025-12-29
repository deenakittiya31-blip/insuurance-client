import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import { creatType, listType, readType, removeType, statusType, updateType } from '../../service/insurance/TypeInsur'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import TableInsurType from '../../component/table/TableInsurType'
import ModalInsurType from '../../component/modal/ModalInsurType'
import EditTypeInsur from '../../component/edit/EditTypeInsur'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'

const initialState = {
    nametype: '',
    description: ''
}

const InsurTypes = () => {
    const token = useInsureAuth((s) => s.token)
    const [type, setType] = useState([])
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 10;
    const lastPage = Math.ceil(total / limit)

    useEffect(() => {
        getTypeInsur(page);
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
            const res = await readType(token, id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
    }

    const getTypeInsur = async (page) => {
        try {
            const res = await listType(page);
            setType(res.data.data)
            setTotal(res.data.total)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()

        if (!form.nametype) {
            toast.error('กรุณากรอกประเภทของประกัน')
            return
        }

        try {
            const res = await creatType(token, form)
            document.getElementById('my_modal_2').close();
            setForm(initialState)
            getTypeInsur();
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || 'เกิดข้อผิดพลาด')
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updateType(token, idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getTypeInsur(page)

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
            const res = await removeType(token, id)
            getTypeInsur(page);
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            await statusType(token, id, !currentStatus)
            getTypeInsur(page)
            toast.success('อัปเดตสถานะสำเร็จ')
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='ประเภทประกัน'
                    subtitle='ข้อมูลประเภทประกันและรายละเอียด'
                />
                <ModalInsurType
                    value={form}
                    onChange={hdlOnChange}
                    onSubmit={hdlSubmit}
                />
            </div>
            <div className='flex-1 bg-white rounded-2xl p-5'>
                <NameTable
                    icon='🛡️'
                    name='ตารางประกันรถยนต์'
                />
                <TableInsurType
                    data={type}
                    onDelete={hdlDelete}
                    onEdite={openModal}
                    page={page}
                    limit={limit}
                    onToggle={hdlToggleActive}
                />
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
                <EditTypeInsur
                    value={form}
                    onChange={hdlOnChange}
                    onSubmit={handleUpdate}
                    isOpen={open}
                    onClose={closeForm}
                />
            </div>
        </div>
    )
}

export default InsurTypes