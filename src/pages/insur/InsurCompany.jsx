import React, { useEffect, useState } from 'react'
import ModalCompany from '../../component/modal/ModalCompany'
import TableCompany from '../../component/table/TableCompany'
import { createCompany, listCompany, readCompany, removeCompany, updateCompany } from '../../service/insurance/CompanyInsur'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import useInsureAuth from '../../store/auth-store'
import EditCompany from '../../component/edit/EditCompany'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'

const initialState = {
    namecompany: '',
    code: '',
    logo_url: null,
    phone: '',
    logo_public_id: null
}

const InsurCompany = () => {
    const [company, setCompany] = useState([])
    const token = useInsureAuth((s) => s.token)
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)

    useEffect(() => {
        getCompany();
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
        try {
            const res = await readCompany(token, id)
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

        if (!form.namecompany || !form.logo_url) {
            toast.error('กรุณากรอกชื่อและเลือกรูป')
            return
        }

        try {
            const res = await createCompany(token, form)
            document.getElementById('my_modal_2').close();
            getCompany();
            toast.success(res.data.msg)
            setForm(initialState)

        } catch (err) {
            console.log(err)
            document.getElementById('my_modal_2').close();
            toast.error(err.response.data.message)

        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updateCompany(token, idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getCompany()

        } catch (err) {
            console.log(err)
        }
    }

    const getCompany = async () => {
        try {
            const res = await listCompany()
            setCompany(res.data.data)
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
            const res = await removeCompany(token, id)
            getCompany();
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='บริษัทประกัน'
                    subtitle='ข้อมูลของบริษัทประกันที่เป็นพาร์ทเนอร์'
                />
                <ModalCompany
                    form={form}
                    setForm={setForm}
                    onChange={handleOnChange}
                    onSubmit={hdlSubmit}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <NameTable
                    icon='🏢'
                    name='ตารางบริษัท'
                />
                <TableCompany
                    data={company}
                    onDelete={hdlDelete}
                    onEdit={openModal}
                />
            </div>
            <EditCompany
                isOpen={open}
                form={form}
                setForm={setForm}
                onSubmit={handleUpdate}
                onChange={handleOnChange}
                onClose={closeForm}
            />
        </div>
    )
}

export default InsurCompany