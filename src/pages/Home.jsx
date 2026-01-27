import { useState, useEffect } from "react"
import Title from "../component/form/Title"
import { deleteMember, listMemberPagination, readMember, searchMember, updateMember } from "../service/member"
import TableMemberList from "../component/table/TableMemberList"
import NameTable from "../component/form/NameTable"
import SelectPerPage from "../component/form/SelectPerPage"
import Pagination from "../component/paginationComponent/Pagination"
import toast from "react-hot-toast"
import Swal from "sweetalert2"
import EditMember from "../component/edit/EditMember"
import SearchBox from "../component/quotation_about/SearchBox"

const initialState = {
    first_name: '',
    last_name: '',
    phone: '',
    note: ''
}

const Home = () => {
    const [member, setMember] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState(0)
    const lastPage = Math.ceil(total / perPage)
    const [isOpen, setIsOpen] = useState(false)
    const [idUpdate, setIdUpdate] = useState(null)
    const [textSearch, setTextSearch] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        getMember(page, perPage, sortConfig.key, sortConfig.direction)
    }, [page, perPage, sortConfig])

    useEffect(() => {
        const deley = setTimeout(() => {
            handleSearchMember()
        }, 500)
        return () => clearTimeout(deley)
    }, [textSearch])

    const getMember = async (page, perPage, sortKey = 'id', sortDirection = 'DESC') => {
        try {
            const res = await listMemberPagination(page, perPage, sortKey, sortDirection)
            setMember(res.data.data)
            setTotal(res.data.total)

        } catch (err) {
            console.log(err)
        }
    }

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)  //รีเซ็ตกลับไปหน้า 1
    }

    const handleSort = (keyName) => {
        let direction = 'ASC';

        if (sortConfig.key === keyName && sortConfig.direction === 'ASC') {
            direction = 'DESC';
        }

        setSortConfig({ key: keyName, direction });
    }

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const openModal = async (id) => {
        setIsOpen(true)
        setIdUpdate(id)
        try {
            const res = await readMember(id)
            setForm(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setIsOpen(false)
        setForm(initialState)
    }

    const handleSearchMember = async () => {
        try {
            const res = await searchMember({ search: textSearch })
            setMember(res.data.data)
            if (!textSearch) {
                getMember(sortConfig.key, sortConfig.direction)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updateMember(idUpdate, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getMember(page, perPage, sortConfig.key, sortConfig.direction)

        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
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
            const res = await deleteMember(id)
            getMember(page, perPage, sortConfig.key, sortConfig.direction)
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='ข้อมูลลูกค้า'
                />
            </div>
            <div className='flex flex-col gap-3 bg-white rounded-2xl p-5'>
                <div className='flex justify-between items-baseline-last'>
                    <NameTable
                        icon='👩‍🦰'
                        name='ตารางข้อมูลลูกค้า'
                    />
                    <div className="flex gap-3 items-baseline-last">
                        <SearchBox
                            width='w-full'
                            placeholder='ค้นหาชื่อ, นามสกุล, เบอร์โทร...'
                            onChange={(e) => setTextSearch(e.target.value)}
                        />
                        <SelectPerPage
                            width='w-30'
                            onChange={handlePerPageChange}
                            perPage={perPage}
                        />
                    </div>
                </div>
                <TableMemberList
                    data={member}
                    page={page}
                    limit={perPage}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    onDelete={handleDelete}
                    onEdite={openModal}
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
            <EditMember
                isOpen={isOpen}
                form={form}
                onChange={handleOnChange}
                onClose={closeForm}
                onSubmit={handleUpdate}
            />
        </div>
    )
}
export default Home