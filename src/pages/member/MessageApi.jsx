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

const intitailState = {
    text: '',
    logo_url: '',
    logo_public_id: ''
}

const MessageApi = () => {
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [groupId, setGroupId] = useState([])
    const [member, setMember] = useState([])
    const [memberSelected, setMemberSelected] = useState([])
    const [GroupData, setGroupData] = useState([])
    const [loading, setLoading] = useState(false)
    const [textSearch, setTextSearch] = useState('')
    const [form, setForm] = useState(intitailState)
    const [open, setOpen] = useState(false)
    const trigger = useRef(null);
    const dropdown = useRef(null);

    useEffect(() => {
        getGroup()
    }, [])

    useEffect(() => {
        const deley = setTimeout(() => {
            if (textSearch.trim()) {
                handleSearchMember()
            } else {
                getMember(sortConfig.key, sortConfig.direction, groupId)
            }
        }, 500)
        return () => clearTimeout(deley)
    }, [sortConfig, textSearch, groupId])

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

    const getGroup = async () => {
        try {
            const res = await listGroup()
            setGroupData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getMember = async (sortKey, sortDirection, group_id) => {
        try {
            const res = await listForMessage(sortKey, sortDirection, group_id)
            setMember(res.data.data)

        } catch (err) {
            console.log(err)
        }
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

    const handleCheck = (e) => {
        const userId = e.target.value //ค่าที่โดนเช็ค
        const id = e.target.value

        setMemberSelected((prev) =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        )
    }

    const handleCheckFilter = (e) => {
        const idGroup = Number(e.target.value)

        setGroupId((prev) =>
            prev.includes(idGroup)
                ? prev.filter(id => id !== idGroup)
                : [...prev, idGroup]
        )
    }

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
        if (memberSelected.length <= 0) {
            return toast.error('กรุณาเลือกสมาชิก')
        }

        try {
            const res = await sendMessage({
                members: memberSelected,
                text: form.text,
                image: form.logo_url
            })
            console.log('success~')
            toast.success(res.data.msg)
            setForm(intitailState)
            setGroupId([])
            setMemberSelected([])
            setTextSearch('')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    console.log(form)

    return (
        <div className='flex flex-col gap-5 h-auto p-5 font-prompt'>
            <div className='grid  gap-5 bg-white rounded-2xl p-5'>
                <form onSubmit={handleSubmitMessage} className="">
                    <TextAreaSendMessage
                        onChange={handleOnChange}
                        value={form.text}
                        form={form}
                        setForm={setForm}
                    />
                </form>
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
                        <div className="flex gap-3 items-end">
                            <div className="relative">
                                <button ref={trigger} onClick={() => setOpen(!open)} className="btn btn-soft btn-secondary px-7 rounded-full"><IoFilter /> กรองข้อมูล</button>
                                <div
                                    ref={dropdown}
                                    onFocus={() => setOpen(true)}
                                    onBlur={() => setOpen(false)}
                                    className={`${open ? 'block' : 'hidden'} absolute top-10 right-0 bg-white border border-border/25 shadow-md rounded-xl w-45 h-auto z-50`}
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
                                                        className="checkbox"
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
                </div>
            </div>
        </div>
    )
}
export default MessageApi