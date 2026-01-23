import { useEffect, useState } from "react"
import NameTable from "../../component/form/NameTable"
import Title from "../../component/form/Title"
import { deleteQuotationCompare, listQuotationCompare } from '../../service/compare'
import TableQuotationList from "../../component/table/TableQuotationList"
import Pagination from "../../component/paginationComponent/Pagination"
import Swal from "sweetalert2"
import toast from "react-hot-toast"

const QuotationList = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 10;
    const lastPage = Math.ceil(total / limit)

    useEffect(() => {
        getQuotationList(page)
    }, [page])

    const getQuotationList = async (page) => {
        try {
            const res = await listQuotationCompare(page)
            setList(res.data.data)
            setTotal(res.data.total)
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
            const res = await deleteQuotationCompare(id)
            getQuotationList(page);
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-5 p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='รายการใบเสนอราคา'
                    subtitle='ข้อมูลรายการใบเสนอราคา ส่งใบเสนอราคาให้ลูกค้า'
                />
            </div>
            <div className='flex-1 bg-white rounded-2xl p-5'>
                <NameTable
                    icon='📑'
                    name='ตารางใบเสนอราคา'
                />
                <TableQuotationList
                    data={list}
                    page={page}
                    limit={limit}
                    onDelete={hdlDelete}
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
        </div>
    )
}
export default QuotationList