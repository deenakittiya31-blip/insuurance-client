import { useState } from "react"
import NameTable from "../../component/form/NameTable"
import TextInput from "../../component/form/TextInput"
import { createTag, listMemberByTag, listTag, removeTag, statusTag, updateTag } from "../../service/member/tag"
import toast from "react-hot-toast"
import TableTag from "../../component/table/TableTag"
import { useEffect } from "react"
import Title from "../../component/form/Title"
import Swal from "sweetalert2"
import SelectPerPage from "../../component/form/SelectPerPage"
import Pagination from "../../component/paginationComponent/Pagination"
import ModalAddTagMember from "../../component/modal/ModalAddTagMember"
import CardTag from "../../component/card/CardTag"
import { useNavigate } from "react-router-dom"
import SearchBox from "../../component/quotation_about/SearchBox"

const tagPage = () => {
    const navigate = useNavigate()
    const [tagData, setTagData] = useState([])
    const [totalMember, setTotalMember] = useState(0)
    const [memberIntag, setMemberIntag] = useState([])
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({})
    const [perPage, setPerPage] = useState(10)
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [textSearch, setTextSearch] = useState('')
    const [searchMember, setSearchMember] = useState('')
    const [currentTagId, setCurrentTagId] = useState(null)
    const [tag, setTag] = useState('')

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 500)
        return () => clearTimeout(delay)
    }, [textSearch])

    useEffect(() => {
        if (currentTagId) {
            const delay = setTimeout(() => {
                fetchMemberInTag(currentTagId, searchMember)
            }, 400)

            return () => clearTimeout(delay)
        }
    }, [searchMember])

    useEffect(() => {
        getTag();
    }, [page, perPage, sortConfig, debouncedSearch])

    const getTag = async () => {
        try {
            const res = await listTag({
                page,
                limit: perPage,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction,
                search: textSearch,
            })
            setTagData(res.data.data)
            setPagination(res.data.pagination)
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

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)  //รีเซ็ตกลับไปหน้า 1
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!tag.trim()) {
            return toast('กรุณากรอกข้อมูล')
        }

        try {
            const res = await createTag(tag)
            toast.success(res.data.msg)
            getTag();
            setTag('')
        } catch (err) {
            console.log(err)
            toast.error('ไม่สามารถสร้างได้')
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
            const res = await removeTag(id)
            getTag();
            toast.success(res.data.msg)

        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }

    }

    const hdlUpdateTag = async (id, value) => {
        try {
            const res = await updateTag(id, value)
            toast.success(res.data.msg)
            getTag();
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleActive = async (id, currentState) => {
        try {
            const res = await statusTag(id, !currentState)
            toast.success(res.data.msg)
            getTag();
        } catch (err) {
            console.log(err)
            toast.error('ไม่สามารถอัปเดตสถานะได้')
        }
    }

    const openModalReadMember = async (id) => {
        document.getElementById('cardTag').showModal()
        setCurrentTagId(id)
        fetchMemberInTag(id)
    }

    const fetchMemberInTag = async (tagId, searchValue = '') => {
        try {
            const res = await listMemberByTag(tagId, searchValue)
            setMemberIntag(res.data.data)
            setTotalMember(res.data.total)
        } catch (err) {
            console.log(err)
        }
    }

    const SeeMember = (memberId) => {
        document.getElementById('cardTag').close()
        navigate(`/app/member?edit=${memberId}`)
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='ป้ายกำกับลูกค้า'
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <div className="flex justify-between items-end gap-1">
                    <form onSubmit={handleSubmit} className='flex items-baseline-last gap-1 font-prompt'>
                        <TextInput
                            value={textSearch}
                            placeholder='เพิ่มป้ายกำกับ...'
                            width='w-40 lg:w-xs'
                            name='tag_name'
                            type='text'
                            onChange={(e) => setTextSearch(e.target.value)}
                        />
                        <button className="btn bg-main px-5 rounded-md text-white font-semibold">บันทึก</button>
                    </form>
                    <ModalAddTagMember />
                </div>
                <div className='flex justify-between items-end gap-3'>
                    <SelectPerPage
                        onChange={handlePerPageChange}
                        perPage={perPage}
                    />
                    <SearchBox
                        width='w-full lg:w-70'
                        placeholder='ค้นหา...'
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                </div>
                <TableTag
                    data={tagData}
                    onDelete={hdlDelete}
                    onUpdate={hdlUpdateTag}
                    onToggle={hdlToggleActive}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    onRead={openModalReadMember}
                />
            </div>
            <div className='flex justify-between font-prompt'>
                <div className="text-sm text-gray-600">
                    แสดง {tagData.length} จาก {pagination.totalItems || 0} รายการ
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
            <CardTag
                data={memberIntag}
                total={totalMember}
                onSee={SeeMember}
                onSearch={setSearchMember}
            />
        </div>
    )
}
export default tagPage