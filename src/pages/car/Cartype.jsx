import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import toast from 'react-hot-toast'
import Input from '../../component/form/Input'
import TableCarType from '../../component/table/TableCarType'
import { createCarType, removeCarType, updateCarType } from '../../service/car/CarType'
import Pagination from '../../component/paginationComponent/Pagination'
import Swal from 'sweetalert2'
import useActionStore from '../../store/action-store'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'

const Cartype = () => {
    const token = useInsureAuth((s) => s.token)
    const [typeData, setTypeData] = useState([])
    const [type, setType] = useState('')
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 10;
    const lastPage = Math.ceil(total / limit)

    useEffect(() => {
        getCarType(page);
    }, [page])

    const getCarType = async (page) => {
        const res = await listCarModel(page)
            .then((res) => {
                setTypeData(res.data.data)
                setTotal(res.data.total)
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
                getCarType(page)
            })
            .catch((err) => console.log(err))
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
            getCarType(page);
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }

    const hdlUpdateType = async (id, value) => {
        try {
            const res = await updateCarType(token, id, value)
            toast.success(res.data.msg)
            getCarType(page)
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            {/* หัวข้อ */}
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
                    data={typeData}
                    onDelete={hdlDeleteType}
                    onUpdate={hdlUpdateType}
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
        </div>
    )
}

export default Cartype