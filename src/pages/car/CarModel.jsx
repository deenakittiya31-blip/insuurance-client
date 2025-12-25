import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import Select from '../../component/form/Select'
import { listCarBrandSelect } from '../../service/car/CarBrand'
import { createCarModel, listCarModel, removeCarModel, updateCarModel } from '../../service/car/CarModel'
import Input from '../../component/form/Input'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import TableCarModel from '../../component/table/TableCarModel'
import Pagination from '../../component/paginationComponent/Pagination'
import ModalCarModel from '../../component/modal/ModalCarModel'
import useActionStore from '../../store/action-store'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'

const initialForm = {
    brand_id: '',
    name: ''
}

const CarModel = () => {
    const token = useInsureAuth((s) => s.token)
    const [carModel, setCarModel] = useState([])
    const [form, setForm] = useState(initialForm)
    const getCarBrand = useActionStore((s) => s.getCarBrand)
    const carbrand = useActionStore((s) => s.carbrand)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 10;
    const lastPage = Math.ceil(total / limit)

    useEffect(() => {
        getCarBrand()
        getCarModel(page)
    }, [page])

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const getCarModel = async (page) => {
        const res = await listCarModel(page)
            .then((res) => {
                setCarModel(res.data.data)
                setTotal(res.data.total)
            })
            .catch((err) => console.log(err))
    }


    const hdlSubmit = async (e) => {
        e.preventDefault()
        if (!form.brand_id) {
            toast.error('กรุณาเลือกยี่ห้อรถ')
            return
        }

        if (!form.name.trim()) {
            toast.error('กรุณากรอกชื่อรุ่นรถ')
            return
        }

        try {
            const res = await createCarModel(token, form)
            document.getElementById('my_modal_2').close()
            toast.success(res.data.msg)
            setForm(initialForm)
            getCarModel(page);
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
            const res = await removeCarModel(token, id)
            getCarModel();
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const hdlUpdate = async (id, data) => {
        try {
            await updateCarModel(token, id, data)
            toast.success('อัปเดตเรียบร้อย')
            getCarModel(page)
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='รุ่นรถรถยนต์'
                    subtitle='ข้อมูลและรูปภาพของรุ่นรถรถยนต์'
                />
                <ModalCarModel
                    form={form}
                    onSubmit={hdlSubmit}
                    onChange={hdlOnChange}
                    carbrand={carbrand}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <NameTable
                    icon='🚗'
                    name='ตารางรุ่นรถ'
                />
                <TableCarModel
                    data={carModel}
                    onDelete={hdlDelete}
                    page={page}
                    limit={limit}
                    carBrand={carbrand}
                    onUpdate={hdlUpdate}
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
        </div>
    )
}

export default CarModel