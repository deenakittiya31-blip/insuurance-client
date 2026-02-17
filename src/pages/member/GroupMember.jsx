import { useEffect, useState } from "react"
import { createGroup, deleteGroup, listGroup, readGroup, statusGroup, updateGroup } from "../../service/member/group_member"
import Title from "../../component/form/Title"
import toast from "react-hot-toast"
import Swal from "sweetalert2"
import EditGroupMember from "../../component/edit/EditGroupMember"
import ModalGroupMember from "../../component/modal/ModalGroupMember"
import SelectPerPage from "../../component/form/SelectPerPage"
import SearchBox from "../../component/quotation_about/SearchBox"
import Pagination from "../../component/paginationComponent/Pagination"
import Sort from "../../component/sortData/Sort"

const intitailState = {
    group_name: '',
    head_url: '',
    head_public_id: ''
}

const GroupMember = () => {
    const [group, setGroup] = useState([])
    const [open, setOpen] = useState(false)
    const [idSelect, setIdSelect] = useState(false)
    const [form, setForm] = useState(intitailState)
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
        fetchGroupMember();
    }, [page, perPage, sortConfig, debouncedSearch])

    const fetchGroupMember = async () => {
        try {
            const res = await listGroup({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: debouncedSearch
            })
            setGroup(res.data.data)
            setPagination(res.data.pagination)
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
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCreateGroup = async (e) => {
        e.preventDefault()
        if (!form.group_name.trim()) {
            return toast('กรุณากรอกชื่อกลุ่ม')
        }

        try {
            const res = await createGroup(form)

            setGroup(prev => [res.data.data, ...prev])
            setPagination(prev => ({
                ...prev,
                totalItems: prev.totalItems + 1
            }))

            toast.success(res.data.msg)
            setForm(intitailState)
            document.getElementById('modalgroupmember').close()
        } catch (err) {
            console.log(err)
            toast.error('สร้างกลุ่มไม่สำเร็จ')
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

        setGroup(prev => prev.filter(item => item.id !== id))
        setPagination(prev => ({
            ...prev,
            totalItems: prev.totalItems - 1
        }))

        try {
            const res = await deleteGroup(id)
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            fetchGroupMember()
            toast.error('ลบกลุ่มไม่สำเร็จ')
        }
    }

    const openModal = async (id) => {
        setOpen(true)
        setIdSelect(id)

        try {
            const res = await readGroup(id)
            setForm(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const closeForm = () => {
        setOpen(false)
        setForm(intitailState)
    }

    const updateGroupName = async (e) => {
        e.preventDefault()
        if (!form.group_name.trim()) {
            return toast.error('กรุณากรอกชื่อกลุ่ม')
        }

        setGroup(prev => prev.map(item =>
            item.id === idSelect ? { ...item, group_name: form.group_name } : item
        ))
        closeForm()

        try {
            const res = await updateGroup(idSelect, form)
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            fetchGroupMember()
            toast.error('แก้ไขกลุ่มไม่สำเร็จ')
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        //อัปเดต UI ทันที (ไม่ต้องรอ API)
        setGroup(prev => prev.map(item =>
            item.id === id ? { ...item, is_active: !currentStatus } : item
        ))

        try {
            await statusGroup(id, !currentStatus)
            toast.success('อัปเดตสถานะกลุ่มสำเร็จ')
        } catch (err) {
            console.log(err)
            setGroup(prev => prev.map(item =>
                item.id === id ? { ...item, is_active: currentStatus } : item
            ))
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='กลุ่มลูกค้า'
                />
                <ModalGroupMember
                    form={form}
                    setForm={setForm}
                    onChange={handleOnChange}
                    onSubmit={handleCreateGroup}
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
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
                <div className="overflow-x-auto font-prompt">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='font-medium text-neutral-400'>ลำดับ</th>
                                <th className='font-medium text-neutral-400'>รูปภาพ</th>
                                <th className='font-medium text-neutral-400'>
                                    <div className='flex items-center gap-3'>
                                        กลุ่ม <Sort
                                            onSort={handleSort}
                                            keyName='group_namee'
                                            currentSort={sortConfig}
                                        />
                                    </div>
                                </th>
                                <th className='font-medium text-neutral-400'>สถานะ</th>
                                <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                group?.map((i, idx) => (
                                    <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                        <td>{(page - 1) * perPage + idx + 1}</td>
                                        <td>
                                            <div className="w-10 h-10 rounded-md">
                                                <img src={i.logo_url} alt={i.group_name} className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td>
                                            {i.group_name}
                                        </td>
                                        <td className='text-center'>
                                            <input
                                                type='checkbox'
                                                onChange={() => hdlToggleActive(i.id, i.is_active)}
                                                checked={i.is_active}
                                                className='toggle'
                                            />
                                        </td>
                                        <td>
                                            <div className='flex gap-5 justify-center'>
                                                <button onClick={() => openModal(i.id)} className="btn btn-sm btn-soft btn-warning">แก้ไข</button>
                                                <button onClick={() => handleDelete(i.id)} className="btn btn-sm btn-soft btn-error">ลบ</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className="font-prompt text-sm text-gray-600">
                    แสดง {group.length} จาก {pagination.totalItems || 0} รายการ
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
            <EditGroupMember
                form={form}
                setForm={setForm}
                onChange={handleOnChange}
                isOpen={open}
                onClose={closeForm}
                onSubmit={updateGroupName}
            />
        </div>
    )
}
export default GroupMember