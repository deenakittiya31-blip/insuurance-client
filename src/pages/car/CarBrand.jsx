import React from 'react'
import TableCarBrand from '../../component/table/TableCarBrand'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { createCarBrand, listCarBrand, readCarBrand, removeCarBrand, updateCarBrand } from '../../service/car/CarBrand'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import EditCarBrand from '../../component/edit/EditCarBrand'
import ModalCarBrand from '../../component/modal/ModalCarBrand'

const initialState = {
    name: '',
    logo_url: null,
    logo_public_id: '',
}

const CarBrand = () => {
    const token = useInsureAuth((s) => s.token)
    const [data, setData] = useState()
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(false)

    useEffect(() => {
        getCarBrand();
    }, [])

    const handleOnChange = (e) => {
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
            const res = await readCarBrand(token, id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
        setForm(initialState)
    }

    const getCarBrand = async () => {
        const res = await listCarBrand()
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => console.log(err))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.name || !form.logo_url) {
            toast.error('กรุณากรอกชื่อและเลือกรูป')
            return
        }

        try {
            const res = await createCarBrand(token, form)
            toast.success(res.data.msg)
            setForm(initialState)
            getCarBrand()
            document.getElementById('my_modal_2').close()
        } catch (err) {
            console.error(err)
            toast.error("เกิดข้อผิดพลาด")
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
            const res = await removeCarBrand(token, id)
            getCarBrand();
            toast.success('ลบบริษัทประกันสำเร็จ');
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updateCarBrand(token, idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getCarBrand()

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <ModalCarBrand
                form={form}
                setForm={setForm}
                onChange={handleOnChange}
                onSubmit={handleSubmit}
            />
            <TableCarBrand
                data={data}
                onDelete={hdlDelete}
                onEdit={openModal}
            />
            <EditCarBrand
                form={form}
                setForm={setForm}
                onChange={handleOnChange}
                isOpen={open}
                onClose={closeForm}
                onSubmit={handleUpdate}
            />
        </div>
    )
}

export default CarBrand