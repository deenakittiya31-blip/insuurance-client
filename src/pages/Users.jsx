import Swal from "sweetalert2"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import EditPromotion from "../component/edit/EditPromotion"
import Pagination from "../component/paginationComponent/Pagination"
import SelectPerPage from "../component/form/SelectPerPage"
import SearchBox from "../component/quotation_about/SearchBox"
import Title from "../component/form/Title"
import { listUser, readUser, removeUser, statusUser, updateUser } from "../service/users"
import { register } from "../service/auth"
import TableUser from "../component/table/TableUser"
import ModalUser from "../component/modal/ModalUser"
import EditUser from "../component/edit/EditUser"

const initialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    first_name: '',
    last_name: ''
}

const Users = () => {
    const [user, setUser] = useState([])
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
        getUser();
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
            const res = await readUser(id)
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

    console.log(form)

    const hdlSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await register(form)
            document.getElementById('modaluser').close();
            getUser();
            toast.success(res.data.msg)
            setForm(initialState)

        } catch (err) {
            console.log(err)
            document.getElementById('modaluser').close();
            toast.error(err.response.data.message)

        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updateUser(idSelect, form)
            setForm(initialState)
            closeForm()
            toast.success(res.data.msg)
            getUser()

        } catch (err) {
            console.log(err)
        }
    }

    const getUser = async () => {
        try {
            const res = await listUser({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch
            })
            setUser(res.data.data)
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
            const res = await removeUser(id)
            getUser();
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            await statusUser(id, !currentStatus)
            getUser();
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
                    title='ผู้ใช้งานระบบ'
                />
                <ModalUser
                    form={form}
                    setForm={setForm}
                    onChange={handleOnChange}
                    onSubmit={hdlSubmit}
                />
            </div>
            <div className='bg-white rounded-2xl p-5 space-y-5'>
                <div className='flex justify-end items-end gap-5'>
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
                <TableUser
                    data={user}
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
                    แสดง {user.length} จาก {pagination.totalItems || 0} รายการ
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
            <EditUser
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
export default Users