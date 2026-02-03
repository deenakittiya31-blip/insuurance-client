import { useEffect, useState } from "react"
import Title from "../../component/form/Title"
import { createJPG, deleteQuotationCompare, listQuotationCompare, searchText } from '../../service/compare'
import TableQuotationList from "../../component/table/TableQuotationList"
import Pagination from "../../component/paginationComponent/Pagination"
import Swal from "sweetalert2"
import toast from "react-hot-toast"
import ModalMember from "../../component/quotation_about/ModalMember"
import { sendDocumentToMember } from "../../service/member"
import useInsureAuth from "../../store/auth-store"
import SearchBox from "../../component/quotation_about/SearchBox"
import SelectPerPage from "../../component/form/SelectPerPage"
import { pinQuotation } from "../../service/quotation"
import { Link } from "react-router-dom"
import { BsPinAngle } from "react-icons/bs"
import { createComparePDF } from "../../utils/pdf"
import { createJPEG } from "../../utils/jpg"

const QuotationList = () => {
    const [list, setList] = useState([])
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [quotationId, setQuotationId] = useState(null)
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const lastPage = Math.ceil(total / perPage)

    useEffect(() => {
        getQuotationList(page, perPage, sortConfig.key, sortConfig.direction)
    }, [page, perPage, sortConfig])

    useEffect(() => {
        const deley = setTimeout(() => {
            handleSearchQuotation()
        }, 500)
        return () => clearTimeout(deley)
    }, [text])

    const handleSearchQuotation = async () => {
        try {
            const res = await searchText({ search: text })
            setList(res.data.data)
            if (!text) {
                getQuotationList(page, perPage, sortConfig.key, sortConfig.direction)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getQuotationList = async (page, perPage, sortKey = 'id', sortDirection = 'DESC') => {
        try {
            const res = await listQuotationCompare(page, perPage, sortKey, sortDirection)
            setList(res.data.data)
            setTotal(res.data.total)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSort = (keyName) => {
        let direction = 'ASC';

        if (sortConfig.key === keyName && sortConfig.direction === 'ASC') {
            direction = 'DESC';
        }

        setSortConfig({ key: keyName, direction });
    }

    const openModal = async (id) => {
        setOpen(true)
        setQuotationId(id)
    }

    const closeForm = () => {
        setOpen(false)
        setQuotationId(null)
    }

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)
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
            getQuotationList(page, perPage, sortConfig.key, sortConfig.direction)
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const sendMessage = async (memberSelected) => {
        if (memberSelected.length === 0) {
            toast.error('กรุณาเลือกลูกค้า')
            return
        }

        try {
            const res = await sendDocumentToMember(memberSelected, quotationId)
            getQuotationList(page, perPage, sortConfig.key, sortConfig.direction)
            toast.success(res.data.msg)
        } catch (error) {
            console.log(error)
            toast.error('ส่งไม่สำเร็จ')
        }
    }

    const handlePinQuotation = async (id) => {
        try {
            const res = await pinQuotation(id)
            toast.success(res.data.msg)
            getQuotationList(page, perPage, sortConfig.key, sortConfig.direction)
        } catch (err) {
            console.log(err)
            toast.error('ปักหมุดไม่สำเร็จ')
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
                <div className="flex justify-between items-baseline-last mb-5">
                    <Link to='/admin/pin-compare'>
                        <button className="flex justify-center items-center gap-1 btn btn-outline btn-accent font-prompt">
                            <BsPinAngle className='size-4' />
                            เบี้ยประกันที่ใช้บ่อย
                        </button>
                    </Link>
                    <div className="flex gap-3 items-baseline-last">
                        <SearchBox
                            width='w-sm'
                            placeholder='ค้นหาเลขที่ใบเสนอราคา, ชื่อ, ยี่ห้อรถยนต์...'
                            onChange={(e) => setText(e.target.value)}
                        />
                        <SelectPerPage
                            width='w-20'
                            onChange={handlePerPageChange}
                            perPage={perPage}
                        />
                    </div>

                </div>
                <TableQuotationList
                    data={list}
                    page={page}
                    limit={perPage}
                    onDelete={hdlDelete}
                    isOpen={openModal}
                    pdf={createComparePDF}
                    jpg={createJPEG}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    onPin={handlePinQuotation}
                />
                <div className='flex justify-end mt-5'>
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
            <ModalMember
                onSubmit={sendMessage}
                isOpen={open}
                onClose={closeForm}
                q_id={quotationId}
            />
        </div>
    )
}
export default QuotationList