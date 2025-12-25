import React, { useEffect, useState } from 'react'
import ModalPackage from '../../component/modal/ModalPackage'
import TablePackage from '../../component/table/TablePackage'
import { createPackage, listPackage, readPackage, removePackage, updatePackage } from '../../service/insurance/PackageInsur'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import useInsureAuth from '../../store/auth-store'
import EditPackage from '../../component/edit/EditPackage'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'

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
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 10;
    const lastPage = Math.ceil(total / limit)

    useEffect(() => {
        getPackage(page);
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
            const res = await readPackage(token, id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
        setForm(initialState)
    }

    const getPackage = async (page) => {
        try {
            const res = await listPackage(page);
            setPackageData(res.data.data)
            setTotal(res.data.total)
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
            getPackage(page);
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
            getPackage(page)

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
            getPackage(page)
            toast.success(res.data.msg)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='แพ็กเกจ'
                    subtitle='ข้อมูลของแพ็กเกจแต่ละบริษัท'
                />
                <ModalPackage
                    form={form}
                    onSubmit={hdlSubmit}
                    onChange={hdlOnChange}
                    onClose={closeForm}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <NameTable
                    icon='📒'
                    name='ตารางแพ็กเกจ'
                />
                <TablePackage
                    data={packageData}
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