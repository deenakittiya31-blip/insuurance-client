import React from 'react'
import Input from '../../component/form/Input'
import { useEffect } from 'react'
import { useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import { createCarUsage, listCarUsage, removeCarUsage, updateCarUsage } from '../../service/car/CarUsage'
import TableCarUsage from '../../component/table/TableCarUsage'
import Pagination from '../../component/pagination/pagination'
import toast from 'react-hot-toast'

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
        try {
            if (window.confirm('ลบปีนี้ใช่ไหม')) {
                const res = await removeCarUsage(token, id)
                toast.success(res.data.message)
                getUsage(page);
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }

    const hdlUpdateCarUsage = async (id, value) => {
        try {
            await updateCarUsage(token, id, value)
            toast.success('อัปเดตเรียบร้อย')
            getUsage()
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex flex-col gap-5'>
                <form onSubmit={handleSubmit} className='flex gap-5'>
                    <Input
                        value={usage}
                        placeholder='เพิ่มประเภทการใช้งานของรถ'
                        width='w-xs'
                        name='year'
                        type='text'
                        onChange={(e) => setUsage(e.target.value)}
                    />
                    <button className="btn btn-primary">บันทึก</button>
                </form>
                <TableCarUsage
                    data={usageData}
                    page={page}
                    limit={5}
                    onDelete={hdlDelete}
                    onUpdate={hdlUpdateCarUsage}
                />
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
        </div>
    )
}

export default UsageCar