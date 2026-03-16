import { useEffect, useState } from "react"
import Title from "../../component/form/Title"
import { copyCompare, deleteQuotationCompare, getDetailCompare, listQuotationCompare, searchText } from '../../service/compare'
import TableQuotationList from "../../component/table/TableQuotationList"
import Pagination from "../../component/paginationComponent/Pagination"
import Swal from "sweetalert2"
import toast from "react-hot-toast"
import ModalMember from "../../component/quotation_about/ModalMember"
import { sendDocumentToMember } from "../../service/member"
import SearchBox from "../../component/quotation_about/SearchBox"
import SelectPerPage from "../../component/form/SelectPerPage"
import { pinQuotation } from "../../service/quotation"
import { Link } from "react-router-dom"
import { BsPinAngle } from "react-icons/bs"
import { createComparePDF } from "../../utils/pdf"
import { createJPEG } from "../../utils/jpg"
import EditCopyCompare from "../../component/edit/EditCopyCompare"
import useInsureAuth from "../../store/auth-store"
import { useCompareForm } from "../../hooks/useCompareForm"


const QuotationList = () => {
    const user = useInsureAuth((s) => s.user)
    const [list, setList] = useState([])
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [carModel, setCarModel] = useState([])
    const [quotationId, setQuotationId] = useState(null)
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [pagination, setPagination] = useState({})
    const [textSearch, setTextSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 500)
        return () => clearTimeout(delay)
    }, [textSearch])

    useEffect(() => {
        getQuotationList()
    }, [page, perPage, sortConfig, debouncedSearch])

    const getQuotationList = async () => {
        try {
            const res = await listQuotationCompare({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch
            })
            setList(res.data.data)
            setPagination(res.data.pagination)
        } catch (err) {
            console.log(err)
        }
    }

    const {
        openCopy,
        form,
        openModalCopy,
        closeFormCopy,
        handleOnChange,
        handleCopyCompare
    } = useCompareForm({
        user,
        setCarModel,
        getQuotationList
    })

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
            getQuotationList()
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
            getQuotationList()
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
            getQuotationList()
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
                    <Link to='/app/pin-compare'>
                        <button className="flex justify-center items-center gap-1 btn btn-outline btn-secondary font-prompt">
                            <BsPinAngle className='size-4' />
                            เบี้ยประกันที่ใช้บ่อย
                        </button>
                    </Link>
                    <div className="flex gap-3 items-baseline-last">
                        <SearchBox
                            width='w-auto'
                            placeholder='ค้นหาเลขที่ใบเสนอราคา, ชื่อ, ยี่ห้อรถยนต์...'
                            onChange={(e) => setTextSearch(e.target.value)}
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
                    onCopy={openModalCopy}
                />
            </div>
            <div className='flex justify-between'>
                <div className="font-prompt text-sm text-gray-600">
                    แสดง {list.length} จาก {pagination.totalItems || 0} รายการ
                    (หน้า {pagination.page || 1} / {pagination.totalPages || 1})
                </div>
                {
                    pagination.totalItems > perPage && (
                        <Pagination
                            disablePrev={!pagination.hasPrevPage}
                            disableNext={!pagination.hasNextPage}
                            onPrevious={() => setPage(prev => prev - 1)}
                            onNext={() => setPage(prev => prev + 1)}
                        />
                    )
                }
            </div>
            <ModalMember
                onSubmit={sendMessage}
                isOpen={open}
                onClose={closeForm}
                q_id={quotationId}
            />
            <EditCopyCompare
                isOpen={openCopy}
                onClose={closeFormCopy}
                form={form}
                onChange={handleOnChange}
                onSubmit={handleCopyCompare}
                carmodel={carModel}
            />
        </div>
    )
}
export default QuotationList