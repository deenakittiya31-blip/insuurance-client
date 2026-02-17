import { useState, useEffect } from "react"
import { deleteMember, listMember, readMember, statusMember, updateMember } from "../../service/member"
import TableMemberList from '../../component/table/TableMemberList'
import NameTable from "../../component/form/NameTable"
import SelectPerPage from "../../component/form/SelectPerPage"
import Pagination from "../../component/paginationComponent/Pagination"
import toast from "react-hot-toast"
import Swal from "sweetalert2"
import EditMember from "../../component/edit/EditMember"
import SearchBox from "../../component/quotation_about/SearchBox"
import { listSelectGroup } from "../../service/member/group_member"
import Title from "../../component/form/Title"
import { removeTagFromMember } from "../../service/member/tag"
import { useNavigate, useSearchParams } from "react-router-dom"

const initialState = {
    first_name: '',
    last_name: '',
    group_id: '',
    phone: '',
    note: '',
    tags: []
}

const Home = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const editId = searchParams.get("edit");
    const [member, setMember] = useState([])
    const [group, setGroup] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [isOpen, setIsOpen] = useState(false)
    const [idUpdate, setIdUpdate] = useState(null)
    const [textSearch, setTextSearch] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [form, setForm] = useState(initialState)
    const [pagination, setPagination] = useState({})
    const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
        if (editId) {
            openModal(editId);
            navigate('/app/member', { replace: true });
        }
    }, [editId]);

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 500)
        return () => clearTimeout(delay)
    }, [textSearch])

    useEffect(() => {
        getMember()
    }, [page, perPage, sortConfig, debouncedSearch])

    useEffect(() => {
        fetchGroupMember();
    }, [])

    const getMember = async () => {
        try {
            const res = await listMember({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch
            })
            setMember(res.data.data)
            setPagination(res.data.pagination)

        } catch (err) {
            console.log(err)
        }
    }

    const fetchGroupMember = async () => {
        try {
            const res = await listSelectGroup()
            setGroup(res.data.data)
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

    const handleUpdate = async (e) => {
        e.preventDefault()

        setMember(prev => prev.map(item =>
            item.id === idUpdate ? { ...item, ...form } : item
        ))
        closeForm()

        try {
            const res = await updateMember(idUpdate, form)
            setForm(initialState)
            toast.success(res.data.msg)
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

        setMember(prev => prev.filter(item => item.id !== id))
        setPagination(prev => ({
            ...prev,
            totalItems: prev.totalItems - 1
        }))

        try {
            const res = await deleteMember(id)
            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteTag = async (id) => {
        try {
            const res = await removeTagFromMember(id)
            setForm(prev => ({
                ...prev,
                tags: prev.tags.filter(tag => tag.tag_member_id !== id)
            }))

            toast.success(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }

    const handleOnToggle = async (id, currentStatus) => {
        setMember(prev => prev.map(item =>
            item.id === id ? { ...item, is_active: !currentStatus } : item
        ))
        try {
            await statusMember(id, !currentStatus)
            toast.success('อัปเดตสถานะสำเร็จ')

        } catch (err) {
            console.log(err)
            setMember(prev => prev.map(item =>
                item.id === id ? { ...item, is_active: currentStatus } : item
            ))
            toast.error('อัปเดตสถานะไม่สำเร็จ')
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
                    onToggle={handleOnToggle}
                />
            </div>
            <div className='flex justify-between'>
                <div className="font-prompt text-sm text-gray-600">
                    แสดง {member.length} จาก {pagination.totalItems || 0} รายการ
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
            <EditMember
                removeTag={handleDeleteTag}
                isOpen={isOpen}
                form={form}
                onChange={handleOnChange}
                onClose={closeForm}
                onSubmit={handleUpdate}
                group={group}
            />
        </div>
    )
}
export default Home