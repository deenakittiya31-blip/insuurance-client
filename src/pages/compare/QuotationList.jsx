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
import { listByCarModel } from "../../service/car/CarModel"
import useInsureAuth from "../../store/auth-store"
import Compare from "../insur/Compare"

const initialState = {
    to_name: '',
    details: '',
    car_brand_id: '',
    car_model_id: '',
    car_year_id: '',
    car_usage_id: '',
    sub_car_model: ''
}

const QuotationList = () => {
    const user = useInsureAuth((s) => s.user)
    const [list, setList] = useState([])
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [carModel, setCarModel] = useState([])
    const [quotationId, setQuotationId] = useState(null)
    const [compareId, setCompareId] = useState(null)
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)
    const [openCopy, setOpenCopy] = useState(false)
    const [form, setForm] = useState(initialState)
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

    //Copy Section
    const openModalCopy = async (id) => {
        setOpenCopy(true)
        setCompareId(id)
        try {
            const res = await getDetailCompare(id)
            const {
                to_name,
                details,
                car_brand_id,
                car_model_id,
                car_year_id,
                car_usage_id,
                sub_car_model
            } = res.data.data

            setForm({
                to_name,
                details,
                car_brand_id,
                car_model_id,
                car_year_id,
                car_usage_id,
                sub_car_model
            })

            if (car_brand_id) {
                fetchCarModels(car_brand_id)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const closeFormCopy = () => {
        setOpenCopy(false)
        setForm(initialState)
        setCompareId(null)
    }

    const fetchCarModels = async (brandId) => {
        try {
            const res = await listByCarModel(brandId)
            setCarModel(res.data.data)
        } catch (err) {
            console.log(err)
            setCarModel([])
        }
    }

    const handleOnChange = async (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value,
        }))

        if (name === 'car_brand_id') {
            await fetchCarModels(value)
        }
    }

    const handleCopyCompare = async (e) => {
        e.preventDefault()
        console.log({
            ...form,
            offer_id: user.user_id,
            import_by: 'key-in',
            qIdOld: compareId
        })

        try {
            const res = await copyCompare({
                ...form,
                offer_id: user.user_id,
                import_by: 'key-in',
                qIdOld: compareId
            })
            closeFormCopy()
            toast(`${res.data.msg} รหัสใบเสนอราคาที่ ${res.data.qIdNew}`,
                {
                    duration: 3000,
                }
            );
            getQuotationList(page, perPage, sortConfig.key, sortConfig.direction)
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
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
                        <button className="flex justify-center items-center gap-1 btn btn-outline btn-secondary font-prompt">
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
                    onCopy={openModalCopy}
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
            <EditCopyCompare
                isOpen={openCopy}
                form={form}
                setForm={setForm}
                onSubmit={handleCopyCompare}
                onChange={handleOnChange}
                // onChangeSelect={hdlSelectChange}
                onClose={closeFormCopy}
                carmodel={carModel}
            />
        </div>
    )
}
export default QuotationList