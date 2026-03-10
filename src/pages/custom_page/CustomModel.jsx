import { useEffect, useState } from 'react'
import Title from '../../component/form/Title'
import { createModel, deleteModelCompany, listModelCompany } from '../../service/custommodel'
import TableCompanyModel from '../../component/table/TableCompanyModel'
import Pagination from '../../component/paginationComponent/Pagination'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import ModalModel from '../../component/modal/ModalModel'
import SelectPerPage from '../../component/form/SelectPerPage'

const CustomModel = () => {
    const [data, setData] = useState([])
    const [form, setForm] = useState({ company_id: '' })
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const lastPage = Math.ceil(total / perPage)

    useEffect(() => {
        getListModelCompany(page, perPage);
    }, [page, perPage])

    const getListModelCompany = async (page, perPage) => {
        try {
            const res = await listModelCompany(page, perPage)
            setData(res.data.data)
            setTotal(res.data.total)
        } catch (err) {
            console.log(err)
        }
    }

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await createModel(form.company_id)
            getListModelCompany(page, perPage)
            setForm('')
            document.getElementById('modalmodel').close()
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlDelete = async (company_id) => {
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
            const res = await deleteModelCompany(company_id)
            getListModelCompany(page, perPage);
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex justify-between'>
                <Title title='ปรับแต่งโมเดลดึงข้อมูลเอกสาร' subtitle='ข้อมูลบริษัทที่มีโมเดลดึงเอกสาร' />
                <ModalModel
                    value={form}
                    onSubmit={handleSubmit}
                    onChange={(e) =>
                        setForm(prev => ({
                            ...prev,
                            company_id: e.target.value
                        }))
                    } />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-end items-baseline-last'>
                    <SelectPerPage
                        onChange={handlePerPageChange}
                        perPage={perPage}
                    />
                </div>
                <TableCompanyModel
                    data={data}
                    onDelete={hdlDelete}
                    page={page}
                    limit={perPage}
                />
            </div>
            <div className='flex justify-end'>
                {
                    total > perPage && (
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
export default CustomModel