import { useEffect, useState } from "react"
import NameTable from "../../component/form/NameTable"
import Title from "../../component/form/Title"
import { createJPG, createPDF, deleteQuotationCompare, listQuotationCompare, searchText } from '../../service/compare'
import TableQuotationList from "../../component/table/TableQuotationList"
import Pagination from "../../component/paginationComponent/Pagination"
import Swal from "sweetalert2"
import toast from "react-hot-toast"
import ModalMember from "../../component/quotation_about/ModalMember"
import { sendDocumentToMember } from "../../service/member"
import useInsureAuth from "../../store/auth-store"
import SearchBox from "../../component/quotation_about/SearchBox"
import SelectPerPage from "../../component/form/SelectPerPage"

const QuotationList = () => {
    const token = useInsureAuth((s) => s.token)
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
                getQuotationList(page)
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
            getQuotationList(page, perPage);
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const sendMessage = async (memberSelected) => {
        if (memberSelected.length === 0) {
            toast('กรุณาเลือกลูกค้า')
            return
        }

        try {
            const res = await sendDocumentToMember(memberSelected, quotationId)
            toast.success(res.data.msg)
        } catch (error) {
            console.log(error)
            toast.error('ส่งไม่สำเร็จ')
        }
    }

    const createComparePDF = async (q_id) => {
        try {
            const res = await createPDF(token, q_id)

            // ตรวจสอบว่ามีข้อมูลหรือไม่
            if (!res.data) {
                throw new Error('ไม่พบข้อมูล PDF')
            }

            // สร้าง blob URL
            const blob = new Blob([res.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)

            // เปิดในแท็บใหม่
            const newWindow = window.open(url, '_blank')

            // ตรวจสอบว่าเปิดแท็บได้หรือไม่ (กรณี popup blocker)
            if (!newWindow) {
                toast.error('กรุณาอนุญาตให้เปิด popup ในเบราว์เซอร์')

                // สำรอง: ดาวน์โหลดแทน
                const link = document.createElement('a')
                link.href = url
                link.download = `เปรียบเทียบใบเสนอราคา_${q_id}.pdf`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                toast.success('ดาวน์โหลด PDF สำเร็จ')
            } else {
                toast.success('เปิด PDF สำเร็จ')
            }

            // ลบ URL หลังจาก 1 นาที (ป้องกัน memory leak)
            setTimeout(() => {
                window.URL.revokeObjectURL(url)
            }, 60000)

        } catch (err) {
            console.error('PDF Error:', err)

            // แสดง error message ที่ชัดเจน
            if (err.response) {
                toast.error(err.response.data?.msg || 'สร้าง PDF ไม่สำเร็จ')
            } else if (err.request) {
                toast.error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์')
            } else {
                toast.error('เกิดข้อผิดพลาด: ' + err.message)
            }
        }
    }

    const createJPEG = async (q_id) => {
        try {
            const res = await createJPG(token, q_id)

            const blob = new Blob([res.data], { type: 'image/jpeg' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `quotation_${q_id}.jpg`; // ชื่อไฟล์
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
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
                <div className="flex justify-between items-baseline-last">
                    <NameTable
                        icon='📑'
                        name='ตารางใบเสนอราคา'
                    />
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
                />
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