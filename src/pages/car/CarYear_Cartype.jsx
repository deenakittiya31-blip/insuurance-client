import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import { createYear, listYear, removeYear, updateYear } from '../../service/car/CarYear'
import Input from '../../component/form/Input'
import TableYear from '../../component/table/TableYear'
import TableCarType from '../../component/table/TableCarType'
import { createCarType, removeCarType, updateCarType } from '../../service/car/CarType'
import Pagination from '../../component/paginationComponent/Pagination'
import Swal from 'sweetalert2'
import useActionStore from '../../store/action-store'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'

const CarYear_Cartype = () => {
    const token = useInsureAuth((s) => s.token)
    const cartype = useActionStore((s) => s.cartype)
    const getCarType = useActionStore((s) => s.getCarType)
    const [year, setYear] = useState('')
    const [type, setType] = useState('')
    const [yearData, setYearData] = useState([])
    const [page, setPage] = useState(1)


    useEffect(() => {
        getCarType();
        getYear(page);
    }, [page])

    const getYear = async (page) => {
        const res = await listYear(page)
            .then((res) => {
                setYearData(res.data.data)
            })
            .catch((err) => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!year.trim()) {
            return toast('กรุณากรอกปี')
        }
        createYear(token, year)
            .then((res) => {
                toast.success(res.data.msg)
                setYear('')
                getYear()
            })
            .catch((err) => console.log(err))
    }

    const handleSubmitType = (e) => {
        e.preventDefault()
        if (!type.trim()) {
            return toast('กรุณากรอกประเภทรถ')
        }
        createCarType(token, type)
            .then((res) => {
                toast.success(res.data.msg)
                setType('')
                getCarType()
            })
            .catch((err) => console.log(err))
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
            const res = await removeYear(token, id)
            toast.success(res.data.msg)
            getYear();
        } catch (err) {
            console.log(err)
        }
    }

    const hdlDeleteType = async (id) => {
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
            const res = await removeCarType(token, id)
            toast.success(res.data.msg)
            getCarType();
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }

    const hdlUpdateType = async (id, value) => {
        try {
            const res = await updateCarType(token, id, value)
            toast.success(res.data.msg)
            getCarType()
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตไม่สำเร็จ')
        }
    }

    const hdlUpdateYear = async (id, value) => {
        try {
            const res = await updateYear(token, id, value)
            toast.success(res.data.msg)
            getYear()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-10 h-auto p-5'>
            {/* หัวข้อ */}
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <Title
                        title='ประเภทรถยนต์'
                        subtitle='ข้อมูลประเภทรถยนต์'
                    />
                    <form onSubmit={handleSubmitType} className='flex gap-5 font-prompt'>
                        <Input
                            placeholder='เพิ่มประเภทของรถ'
                            width='w-xs'
                            name='year'
                            type='text'
                            onChange={(e) => setType(e.target.value)}
                        />
                        <button className="btn bg-main px-5 rounded-md text-white font-semibold">บันทึก</button>
                    </form>
                </div>
                <div className='bg-white rounded-2xl p-5'>
                    <NameTable
                        icon='🚗'
                        name='ตารางประเภทรถยนต์'
                    />
                    <TableCarType
                        data={cartype}
                        onDelete={hdlDeleteType}
                        onUpdate={hdlUpdateType}
                    />
                </div>
            </div>
            {/* หัวข้อ */}
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <Title
                        title='ปีรถยนต์'
                        subtitle='ข้อมูลปีรถยนต์'
                    />
                    <form onSubmit={handleSubmit} className='flex gap-5 font-prompt'>
                        <Input
                            placeholder='เพิ่มปีของรถ'
                            width='w-xs'
                            name='year'
                            type='text'
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <button className="btn bg-main px-5 rounded-md text-white font-semibold">บันทึก</button>
                    </form>
                </div>
                <div className='bg-white rounded-2xl p-5'>
                    <NameTable
                        icon='🚗'
                        name='ตารางประเภทการใช้งาน'
                    />
                    <TableYear
                        data={yearData}
                        page={page}
                        limit={5}
                        onDelete={hdlDelete}
                        onUpdate={hdlUpdateYear}
                    />
                </div>
                <div className='flex justify-end'>
                    <Pagination
                        onPrevious={() => setPage(page - 1)}
                        onNext={() => setPage(page + 1)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CarYear_Cartype