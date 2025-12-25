import React from 'react'
import Input from '../../component/form/Input'
import { useEffect } from 'react'
import { useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import { createCarUsage, listCarUsage, removeCarUsage, updateCarUsage } from '../../service/car/CarUsage'
import TableCarUsage from '../../component/table/TableCarUsage'
import toast from 'react-hot-toast'
import Pagination from '../../component/paginationComponent/Pagination'
import Swal from 'sweetalert2'
import Title from '../../component/form/Title'
import NameTable from '../../component/form/NameTable'

const UsageCar = () => {
    const token = useInsureAuth((s) => s.token)
    const [usage, setUsage] = useState('')
    const [total, setTotal] = useState(0)
    const [usageData, setUsageData] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        getUsage(page);
    }, [page])


    const getUsage = async (page) => {
        const res = await listCarUsage(page)
            .then((res) => {
                setUsageData(res.data.data)
                setTotal(res.data.total)
                setUsage('');
            })
            .catch((err) => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!usage.trim()) {
            return toast('กรุณากรอกประเภทการใช้งาน')
        }
        createCarUsage(token, usage)
            .then((res) => {
                toast.success(res.data.msg)
                getUsage(page)
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
            const res = await removeCarUsage(token, id)
            getUsage(page);
            toast.success(res.data.msg)

        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }

    const hdlUpdateCarUsage = async (id, value) => {
        try {
            const res = await updateCarUsage(token, id, value)
            toast.success(res.data.msg)
            getUsage()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex justify-between items-center'>
                <Title
                    title='ประเภทการใช้งาน'
                    subtitle='ข้อมูลประเภทการใช้งานรถยนต์'
                />
                <form onSubmit={handleSubmit} className='flex gap-5 font-prompt'>
                    <Input
                        value={usage}
                        placeholder='เพิ่มประเภทการใช้งานของรถ'
                        width='w-xs'
                        name='year'
                        type='text'
                        onChange={(e) => setUsage(e.target.value)}
                    />
                    <button className="btn bg-main px-5 rounded-md text-white font-semibold">บันทึก</button>
                </form>
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <NameTable
                    icon='🚗'
                    name='ตารางประเภทการใช้งาน'
                />
                <TableCarUsage
                    data={usageData}
                    page={page}
                    limit={5}
                    onDelete={hdlDelete}
                    onUpdate={hdlUpdateCarUsage}
                />
            </div>
            <div className='flex justify-end'>
                {
                    total > 5 && (
                        <Pagination
                            onPrevious={() => page > 1 && setPage(page - 1)}
                            onNext={() => setPage(page + 1)}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default UsageCar