import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import ModalPremium from '../../component/modal/ModalPremium'
import TablePremium from '../../component/table/TablePremium'
import { createPremium, listPremium, readPremium, removePremium, updatePremium } from '../../service/insurance/PremiumInsur'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import EditPremium from '../../component/edit/EditPremium'

const initialState = {
    package_id: '',
    car_usage_id: '',
    car_year: '',
    premium_price: '',
    compulsory_price: '',
}

const InsurPremuim = () => {
    const token = useInsureAuth((s) => s.token)
    const [premium, setPremium] = useState([])
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)

    useEffect(() => {
        getPremium();
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
        console.log(id)
        try {
            const res = await readPremium(token, id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
    }

    const getPremium = async () => {
        try {
            const res = await listPremium()
            setPremium(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        if (!form.package_id) {
            toast.error('กรุณาเลือกแพ็กเกจ')
            return
        }
        if (!form.car_usage_id) {
            toast.error('กรุณาเลือกการใช้งาน')
            return
        }

        try {
            const res = await createPremium(token, form)
            document.getElementById('my_modal_2').close();
            setForm(initialState)
            getPremium();
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updatePremium(token, idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getPremium()

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
            const res = await removePremium(token, id)
            getPremium()
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <ModalPremium
                form={form}
                onSubmit={hdlSubmit}
                onChange={hdlOnChange}
            />
            <TablePremium
                data={premium}
                onDelete={hdlDelete}
                onEdite={openModal}
            />
            <EditPremium
                value={form}
                onchange={hdlOnChange}
                onSubmit={handleUpdate}
                isOpen={open}
                onClose={closeForm}
            />
        </div>
    )
}

export default InsurPremuim