import React, { useEffect, useState } from 'react'
import useInsureAuth from '../../store/auth-store'
import { createYear, listYear, removeYear, updateYear } from '../../service/car/CarYear'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import Input from '../../component/form/Input'
import Title from '../../component/form/Title'
import TableYear from '../../component/table/TableYear'
import NameTable from '../../component/form/NameTable'
import Pagination from '../../component/paginationComponent/Pagination'

const CarYear = () => {
    const token = useInsureAuth((s) => s.token)
    const [year, setYear] = useState('')
    const [yearData, setYearData] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 10;
    const lastPage = Math.ceil(total / limit)


    useEffect(() => {
        getYear(page);
    }, [page])

    const getYear = async (page) => {
        const res = await listYear(page)
            .then((res) => {
                setYearData(res.data.data)
                setTotal(res.data.total)
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
                getYear(page)
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
            getYear(page);
        } catch (err) {
            console.log(err)
        }
    }

    const hdlUpdateYear = async (id, value) => {
        try {
            const res = await updateYear(token, id, value)
            toast.success(res.data.msg)
            getYear(page)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
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
                    limit={limit}
                    onDelete={hdlDelete}
                    onUpdate={hdlUpdateYear}
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

export default CarYear