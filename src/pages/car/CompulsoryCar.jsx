import React from 'react'
import ModalCompul from '../../component/modal/ModalCompul'
import TableCompulsory from '../../component/table/TableCompulsory'
import { useState } from 'react'
import { useEffect } from 'react'
import { createCompulsory, ListCompulsory, readCompulsory, removeCompulsory, updateCompulsory } from '../../service/car/Compulsory'
import Swal from 'sweetalert2'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import EditCompulsory from '../../component/edit/EditCompulsory'

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

    useEffect(() => {
        getCompulsory()
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
            const res = await readCompulsory(token, id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
    }

    const getCompulsory = async () => {
        await ListCompulsory()
            .then((res) => {
                setCompulsory(res.data.data)
            })
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createCompulsory(token, form)
            document.getElementById('my_modal_2').close();
            getCompulsory();
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
            getCompulsory();
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
            getCompulsory()

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <ModalCompul
                form={form}
                onChange={hdlOnChange}
                onSubmit={hdlSubmit}
            />
            <TableCompulsory
                data={compulsory}
                onDelete={hdlDelete}
                onEdite={openModal}
            />
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