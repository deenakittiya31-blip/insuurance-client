import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import { creatType, listType, readType, removeType, updateType } from '../../service/insurance/TypeInsur'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import TableInsurType from '../../component/table/TableInsurType'
import ModalInsurType from '../../component/modal/ModalInsurType'
import EditTypeInsur from '../../component/edit/EditTypeInsur'

const initialState = {
    nameType: '',
    description: ''
}

const InsurTypes = () => {
    const token = useInsureAuth((s) => s.token)
    const [type, setType] = useState([])
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)

    useEffect(() => {
        getTypeInsur();
    }, [])

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

    const getTypeInsur = async () => {
        try {
            const res = await listType();
            setType(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()

        if (!form.nameType) {
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
            getTypeInsur()

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
            getTypeInsur();
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <ModalInsurType
                value={form}
                onChange={hdlOnChange}
                onSubmit={hdlSubmit}
            />
            <TableInsurType
                data={type}
                onDelete={hdlDelete}
                onEdite={openModal}
            />
            <EditTypeInsur
                value={form}
                onChange={hdlOnChange}
                onSubmit={handleUpdate}
                isOpen={open}
                onClose={closeForm}
            />
        </div>
    )
}

export default InsurTypes