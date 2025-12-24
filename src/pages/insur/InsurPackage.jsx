import React, { useEffect, useState } from 'react'
import ModalPackage from '../../component/modal/ModalPackage'
import TablePackage from '../../component/table/TablePackage'
import { createPackage, listPackage, readPackage, removePackage, updatePackage } from '../../service/insurance/PackageInsur'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import useInsureAuth from '../../store/auth-store'
import EditPackage from '../../component/edit/EditPackage'

const initialState = {
    company_id: '',
    insurance_type_id: '',
    package_name: '',
    coverage_amount: ''
}

const InsurPackage = () => {
    const token = useInsureAuth((s) => s.token)
    const [packageData, setPackageData] = useState([])
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)

    useEffect(() => {
        getPackage();
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
            const res = await readPackage(token, id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
    }

    const getPackage = async () => {
        try {
            const res = await listPackage();
            setPackageData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createPackage(token, form)
            document.getElementById('my_modal_2').close();
            setForm(initialState)
            getPackage();
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updatePackage(token, idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getPackage()

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
            const res = await removePackage(token, id)
            getPackage()
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <ModalPackage
                form={form}
                onSubmit={hdlSubmit}
                onChange={hdlOnChange}
            />
            <TablePackage
                data={packageData}
                onDelete={hdlDelete}
                onEdite={openModal}
            />
            <EditPackage
                value={form}
                onchange={hdlOnChange}
                onSubmit={handleUpdate}
                isOpen={open}
                onClose={closeForm}
            />
        </div>
    )
}

export default InsurPackage