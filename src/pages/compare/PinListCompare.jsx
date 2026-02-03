import { useEffect, useState } from "react";
import useInsureAuth from "../../store/auth-store";
import { deleteQuotationCompare, listPinCompare } from "../../service/compare";
import Pagination from "../../component/paginationComponent/Pagination";
import SelectPerPage from "../../component/form/SelectPerPage";
import SearchBox from "../../component/quotation_about/SearchBox";
import Title from "../../component/form/Title";
import TableQuotationList from '../../component/table/TableQuotationList'
import { pinQuotation } from "../../service/quotation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { createComparePDF } from "../../utils/pdf";
import { createJPEG } from "../../utils/jpg";
import { sendDocumentToMember } from "../../service/member";
import ModalMember from "../../component/quotation_about/ModalMember";

const PinListCompare = () => {
    const token = useInsureAuth((s) => s.token)
    const [pinList, setPinList] = useState([])
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [quotationId, setQuotationId] = useState(null)
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const lastPage = Math.ceil(total / perPage)

    useEffect(() => {
        getPinList(page, perPage, sortConfig.key, sortConfig.direction)
    }, [page, perPage, sortConfig])

    const getPinList = async (page, perPage, sortKey = 'id', sortDirection = 'DESC') => {
        try {
            const res = await listPinCompare(page, perPage, sortKey, sortDirection)
            setPinList(res.data.data)
            setTotal(res.data.total)
        } catch (err) {
            console.log(err)
        }
    }

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)
    }

    const handleSort = (keyName) => {
        let direction = 'ASC';

        if (sortConfig.key === keyName && sortConfig.direction === 'ASC') {
            direction = 'DESC';
        }

        setSortConfig({ key: keyName, direction });
    }

    const handlePinQuotation = async (id) => {
        try {
            const res = await pinQuotation(id)
            toast.success(res.data.msg)
            getPinList(page, perPage, sortConfig.key, sortConfig.direction)
        } catch (err) {
            console.log(err)
            toast.error('ปักหมุดไม่สำเร็จ')
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
            getPinList(page, perPage, sortConfig.key, sortConfig.direction)
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const openModal = async (id) => {
        setOpen(true)
        setQuotationId(id)
    }

    const closeForm = () => {
        setOpen(false)
        setQuotationId(null)
    }

    const sendMessage = async (memberSelected) => {
        if (memberSelected.length === 0) {
            toast.error('กรุณาเลือกลูกค้า')
            return
        }

        try {
            const res = await sendDocumentToMember(memberSelected, quotationId)
            getPinList(page, perPage, sortConfig.key, sortConfig.direction)
            toast.success(res.data.msg)
        } catch (error) {
            console.log(error)
            toast.error('ส่งไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='เบี้ยประกันที่ใช้บ่อย'
                />
            </div>
            <div className='flex-1 bg-white rounded-2xl p-5'>
                <div className="flex justify-between items-baseline-last mb-5">
                    <Link to='/admin/quotationlist'>
                        <button className="flex justify-center items-center gap-1 btn btn-outline btn-accent font-prompt">
                            <IoDocumentAttachOutline className='size-4' />
                            รายการใบเสนอราคา
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
                    data={pinList}
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
export default PinListCompare