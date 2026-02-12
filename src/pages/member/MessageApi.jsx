import { useRef, useState } from "react"
import TableMember from "../../component/table/TableMember";
import { useEffect } from "react";
import { listForMessage, searchMember } from "../../service/member";
import { listGroup } from "../../service/member/group_member";
import { sendMessage } from "../../service/member/messageApi";
import toast from "react-hot-toast";
import TextAreaSendMessage from "../../component/input/TextAreaSendMessage";
import SearchBox from "../../component/form/SearchBox";
import { IoFilter } from "react-icons/io5";
import { listTagSelect } from "../../service/member/tag";
import SelectPerPage from "../../component/form/SelectPerPage";
import Pagination from "../../component/paginationComponent/Pagination";

const intitailState = {
    text: '',
    logo_url: '',
    logo_public_id: ''
}

const MessageApi = () => {
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [groupId, setGroupId] = useState([])
    const [member, setMember] = useState([])
    const [tagData, setTagData] = useState([])
    const [memberSelected, setMemberSelected] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])
    const [GroupData, setGroupData] = useState([])
    const [textSearch, setTextSearch] = useState('')
    const [form, setForm] = useState(intitailState)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const trigger = useRef(null);
    const dropdown = useRef(null);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [pagination, setPagination] = useState({})
    const [isStaticDataLoaded, setIsStaticDataLoaded] = useState(false)
    const [debouncedSearch, setDebouncedSearch] = useState('')

    // useEffect ใหม่ที่โหลดครั้งเดียว
    useEffect(() => {
        if (isStaticDataLoaded) return // ⭐ ไม่โหลดซ้ำ

        const fetchStaticData = async () => {
            const [groupRes, tagRes] = await Promise.all([
                listGroup(),
                listTagSelect()
            ])
            setGroupData(groupRes.data.data)
            setTagData(tagRes.data.data)
            setIsStaticDataLoaded(true)
        }

        fetchStaticData()
    }, [isStaticDataLoaded])

    // useEffect สำหรับ debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 500)
        return () => clearTimeout(timer)
    }, [textSearch])

    useEffect(() => {
        if (debouncedSearch.trim()) {
            handleSearchMember()
        } else {
            getMember(sortConfig.key, sortConfig.direction, page, limit, groupId)
        }
    }, [page, limit, sortConfig, debouncedSearch, groupId])

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !open ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    const getMember = async (sortKey, sortDirection, page, limit, group_id) => {
        try {
            const res = await listForMessage(sortKey, sortDirection, page, limit, group_id)
            setMember(res.data.data)
            setPagination(res.data.pagination)
        } catch (err) {
            console.log(err)
        }
    }

    const handlePerPageChange = (e) => {
        setLimit(Number(e.target.value))
        setPage(1)  //รีเซ็ตกลับไปหน้า 1
    }

    const handleSearchMember = async () => {
        try {
            const res = await searchMember({ search: textSearch })
            setMember(res.data.data)
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

    //เลือกสมาชิก
    const handleCheck = (e) => {
        const userId = e.target.value //ค่าที่โดนเช็ค

        setMemberSelected((prev) =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        )
    }

    //เลือกป้ายกำกับ
    const handleCheckTags = (e) => {
        const tagId = Number(e.target.value)

        setTagsSelected((prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        ))
    }

    //กรองข้อมูลกลุ่ม
    const handleCheckFilter = (e) => {
        const idGroup = Number(e.target.value)

        setGroupId((prev) =>
            prev.includes(idGroup)
                ? prev.filter(id => id !== idGroup)
                : [...prev, idGroup]
        )
    }

    //เลือกสมาชิกทั้งหมด
    const handleCheckAll = (e) => {
        if (e.target.checked) {
            const allMembers = member.map(item => item.user_id)
            setMemberSelected(allMembers)

        } else {
            setMemberSelected([])
        }
    }

    const isAllSelected = member.length > 0 && memberSelected.length === member.length

    const isSomeSelected = memberSelected.length > 0 && memberSelected.length < member.length

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmitMessage = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (memberSelected.length === 0 && tagsSelected.length === 0) {
            setLoading(false)
            return toast.error('กรุณาเลือกสมาชิก')
        }

        try {
            const res = await sendMessage({
                members: memberSelected,
                text: form.text,
                image: form.logo_url,
                tags: tagsSelected
            })
            toast.success(res.data.msg)
            setForm(intitailState)
            setGroupId([])
            setMemberSelected([])
            setTagsSelected([])
            setTextSearch('')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='flex flex-col gap-5 h-auto p-5 font-prompt'>
            <div className='grid  gap-5 bg-white rounded-2xl p-5'>
                <div className="flex gap-5">
                    <div className="flex-1">
                        <form onSubmit={handleSubmitMessage} className="">
                            <TextAreaSendMessage
                                onChange={handleOnChange}
                                value={form.text}
                                form={form}
                                setForm={setForm}
                                loading={loading}
                            />
                        </form>
                    </div>
                    <div className="bg-white shadow rounded-xl p-3 text-text-primary h-auto">
                        <p className="font-bold mb-2">ส่งตามป้ายกำกับ</p>
                        <div className="space-y-2">
                            {
                                tagData.map((i) => (
                                    <label key={i.id} className='flex items-center gap-2 text-sm text font-medium text-text-primary hover:bg-secondary-content'>
                                        <input
                                            value={i.id}
                                            type="checkbox"
                                            onChange={handleCheckTags}
                                            checked={tagsSelected.includes(i.id)}
                                            className="checkbox bg-white"
                                        />
                                        {i.tag_name}
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="grid gap-5">
                    <div className="flex gap-5">
                        <div className="flex-1">
                            <div>
                                <span className="font-bold text-lg text-text-primary tracking-wide ">รายชื่อลูกค้า</span>
                                <SearchBox
                                    width='w-full'
                                    placeholder='ค้นหาชื่อ, นามสกุล, เบอร์โทร...'
                                    onChange={(e) => setTextSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <SelectPerPage
                            onChange={handlePerPageChange}
                            perPage={limit}
                        />
                        <div className="flex gap-3 items-end">
                            <div className="relative">
                                <button ref={trigger} onClick={() => setOpen(!open)} className="btn btn-soft btn-secondary px-7 rounded-full"><IoFilter /> กรองข้อมูล</button>
                                <div
                                    ref={dropdown}
                                    onFocus={() => setOpen(true)}
                                    onBlur={() => setOpen(false)}
                                    className={`${open ? 'block' : 'hidden'} absolute top-12 right-0 bg-white border border-border/25 shadow-md rounded-xl w-45 h-auto z-50 overflow-clip`}
                                >
                                    <div className="flex flex-col">
                                        {
                                            GroupData.map((i) => (
                                                <label key={i.id} className='flex items-center gap-3 p-3 text-sm text font-medium text-text-primary hover:bg-secondary-content'>
                                                    <input
                                                        value={i.id}
                                                        type="checkbox"
                                                        onChange={handleCheckFilter}
                                                        checked={groupId.includes(i.id)}
                                                        className="checkbox bg-white"
                                                    />
                                                    {i.group_name}
                                                </label>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-72 overflow-y-auto">
                        <TableMember
                            data={member}
                            onChange={handleCheck}
                            selected={memberSelected}
                            onSort={handleSort}
                            sortConfig={sortConfig}
                            onCheckAll={handleCheckAll}
                            isAllSelected={isAllSelected}
                            isSomeSelected={isSomeSelected}
                        />
                    </div>
                    <div className='flex justify-end'>
                        {
                            pagination.totalItems > limit && (
                                <Pagination
                                    disablePrev={!pagination.hasPrevPage}
                                    disableNext={!pagination.hasNextPage}
                                    onPrevious={() => setPage(prev => prev - 1)}
                                    onNext={() => setPage(prev => prev + 1)}
                                />
                            )
                        }
                        {/* แสดงข้อมูลเพิ่มเติม */}
                        <div className="text-sm text-gray-600">
                            แสดง {member.length} จาก {pagination.totalItems || 0} รายการ
                            (หน้า {pagination.page || 1} / {pagination.totalPages || 1})
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MessageApi