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

const initialForm = {
    brand_id: '',
    name: ''
}

const CarModel = () => {
    const token = useInsureAuth((s) => s.token)
    const [carModel, setCarModel] = useState([])
    const [carBrand, setCarBrand] = useState([])
    const [form, setForm] = useState(initialForm)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 10;
    const lastPage = Math.ceil(total / limit)

    useEffect(() => {
        getCarBrand()
        getCarModel(page)
    }, [page])

    console.log(carModel)
    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const getCarBrand = async () => {
        const res = await listCarBrandSelect()
            .then((res) => {
                setCarBrand(res.data.data)
            })
            .catch((err) => console.log(err))
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
            toast.success(res.data.msg)
            setForm(initialForm)
            getCarModel(page);
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    const hdlDelete = (id) => {
        Swal.fire({
            title: "คุณแน่ใจ ?",
            text: "ต้องการจะลบจริง ๆ ใช่ไหม?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#E5E4E2",
            confirmButtonColor: "#d33",
            confirmButtonText: "ลบ",
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await removeCarModel(token, id)
                getCarModel();
                toast.success(res.data.msg);
            }
        });
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

            <form onSubmit={hdlSubmit} className='flex justify-center items-baseline gap-5'>
                <Input
                    placeholder='เพิ่มโมเดลของรถ'
                    width='w-xs'
                    name='name'
                    type='text'
                    onChange={hdlOnChange}
                    value={form.name}
                />
                <Select
                    text='ยี่ห้อรถ'
                    data={carBrand}
                    value={form.brand_id}
                    onChange={(e) => setForm({ ...form, brand_id: Number(e.target.value) })}
                    valueKey='id'
                    labelKey='name'
                />
                <button type='submit' className="btn btn-primary">บันทึก</button>
            </form>
            <TableCarModel
                data={carModel}
                onDelete={hdlDelete}
                page={page}
                limit={limit}
                carBrand={carBrand}
                onUpdate={hdlUpdate}
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
        </div>
    )
}

export default CarModel