import Swal from "sweetalert2"
import NameTable from "../../component/form/NameTable"
import SelectPerPage from "../../component/form/SelectPerPage"
import Title from "../../component/form/Title"
import SearchBox from "../../component/quotation_about/SearchBox"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { createPromotion, listPromotion, readPromotion, removePromotion, statusPromotion, updatePromotion } from "../../service/insurance/promotion"
import TablePromotion from "../../component/table/TablePromotion"
import Pagination from "../../component/paginationComponent/Pagination"
import ModalPromotion from "../../component/modal/ModalPromotion"
import EditPromotion from "../../component/edit/EditPromotion"

const initialState = {
    promotion_name: '',
    logo_url: null,
    logo_public_id: null
}

const Promotion = () => {
    const [promotion, setPromotion] = useState([])
    const [form, setForm] = useState(initialState)
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [pagination, setPagination] = useState({})
    const [textSearch, setTextSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 500)
        return () => clearTimeout(delay)
    }, [textSearch])

    useEffect(() => {
        getPromotion();
    }, [page, perPage, sortConfig, debouncedSearch])

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)  //รีเซ็ตกลับไปหน้า 1
    }

    const openModal = async (id) => {
        setOpen(true)
        setIdSelect(id)
        try {
            const res = await readPromotion(id)
            setForm(res.data.data)

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

    const closeForm = () => {
        setOpen(false)
        setForm(initialState)
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()

        if (!form.promotion_name || !form.logo_url) {
            toast.error('กรุณากรอกชื่อและเลือกรูป')
            return
        }

        try {
            const res = await createPromotion(form)
            document.getElementById('modalpromotion').close();
            getPromotion();
            toast.success(res.data.msg)
            setForm(initialState)

        } catch (err) {
            console.log(err)
            document.getElementById('modalpromotion').close();
            toast.error(err.response.data.message)

        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updatePromotion(idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getPromotion()

        } catch (err) {
            console.log(err)
        }
    }

    const getPromotion = async () => {
        try {
            const res = await listPromotion({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch
            })
            setPromotion(res.data.data)
            setPagination(res.data.pagination)
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
            const res = await removePromotion(id)
            getPromotion();
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            await statusPromotion(id, !currentStatus)
            getPromotion();
            toast.success('อัปเดตสถานะสำเร็จ')
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }
    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='บริษัทประกัน'
                    subtitle='ข้อมูลของบริษัทประกันที่เป็นพาร์ทเนอร์'
                />
                <ModalPromotion
                    form={form}
                    setForm={setForm}
                    onChange={handleOnChange}
                    onSubmit={hdlSubmit}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='🏢'
                        name='ตารางบริษัท'
                    />
                    <div className='flex items-end gap-5'>
                        <SearchBox
                            width='md:w-sm'
                            placeholder='ค้นหา...'
                            onChange={(e) => setTextSearch(e.target.value)}
                        />
                        <SelectPerPage
                            onChange={handlePerPageChange}
                            perPage={perPage}
                        />
                    </div>
                </div>
                <TablePromotion
                    data={promotion}
                    onDelete={hdlDelete}
                    onEdit={openModal}
                    page={page}
                    limit={perPage}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    onToggle={hdlToggleActive}
                />
            </div>
            <div className='flex justify-between'>
                <div className="font-prompt text-sm text-gray-600">
                    แสดง {promotion.length} จาก {pagination.totalItems || 0} รายการ
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
            <EditPromotion
                isOpen={open}
                form={form}
                setForm={setForm}
                onSubmit={handleUpdate}
                onChange={handleOnChange}
                onClose={closeForm}
            />
        </div>
    )
}
export default Promotion