import { useEffect, useState } from "react";
import TableMember from "../table/TableMember";
import SearchBox from "./SearchBox";
import { LuSend } from "react-icons/lu";
import { listForMessage, searchMember } from "../../service/member";
import { listGroup } from "../../service/member/group_member";
import { getDetailCompare } from "../../service/compare";
import useInsureAuth from "../../store/auth-store";
import StateDetailSend from "./StateDetailSend";

const ModalMember = ({ isOpen, onClose, onSubmit, q_id }) => {
    const token = useInsureAuth((s) => s.token)
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [groupId, setGroupId] = useState([])
    const [member, setMember] = useState([])
    const [memberSelected, setMemberSelected] = useState([])
    const [GroupData, setGroupData] = useState([])
    const [loading, setLoading] = useState(false)
    const [textSearch, setTextSearch] = useState('')
    const [detail, setDetail] = useState({})

    useEffect(() => {
        if (!isOpen) return;

        if (textSearch) {
            handleSearchMember()
        } else {
            getMember(sortConfig.key, sortConfig.direction, groupId)
            getGroup()
        }

    }, [isOpen, sortConfig, groupId, textSearch])

    useEffect(() => {
        if (!q_id) return;
        getDetail();
    }, [q_id])

    useEffect(() => {
        console.log('groupId updated:', groupId)
    }, [groupId])

    const getGroup = async () => {
        try {
            const res = await listGroup()
            setGroupData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getDetail = async () => {
        try {
            const res = await getDetailCompare(token, q_id)
            setDetail(res.data.data)
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
            if (!textSearch) {
                getMember(sortConfig.key, sortConfig.direction, groupId)
            }
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

    const handleSubmitMessage = async () => {
        setLoading(true)

        try {
            await onSubmit(memberSelected)
            handleClose()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setMemberSelected([])
        setGroupId([])
        setTextSearch('')
        onClose(setMemberSelected);
    }

    if (!isOpen) return null;

    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <div className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg font-prompt">
                {/* กล่องเสิร์ชและปุ่มส่ง */}
                <StateDetailSend data={detail} />
                <div className="flex gap-5">
                    <div className="flex-1">
                        <SearchBox
                            width='w-full'
                            placeholder='ค้นหาชื่อ, นามสกุล, เบอร์โทร...'
                            onChange={(e) => setTextSearch(e.target.value)} />
                    </div>
                    <button
                        type='submit'
                        onClick={handleSubmitMessage}
                        disabled={loading}
                        className="inline-flex items-center gap-3 rounded-sm bg-success text-white font-semibold px-7 py-1 whitespace-nowrap overflow-hidden font-prompt transition-colors duration-300 cursor-pointer"
                    >
                        <span
                            className="relative shrink-0 w-6.25 h-6.25 rounded-sm text-black grid place-items-center overflow-hidden">
                            <LuSend
                                className={`
                                    absolute text-white
                                    transition-transform duration-300 ease-in-out
                                    ${loading ? 'translate-x-[150%] -translate-y-[150%]' : 'translate-x-0 translate-y-0'}
                                `}
                            />
                            <LuSend
                                className={`
                                    absolute text-white
                                    transition-transform duration-300 ease-in-out delay-100
                                    ${loading ? 'translate-x-0 translate-y-0' : 'translate-x-[-150%] translate-y-[150%]'}
                                `}
                            />
                        </span>
                    </button>
                </div>
                <div className="flex gap-3 justify-end">
                    {
                        GroupData.map((i) => (
                            <label key={i.id} className='flex items-center gap-3 text-sm'>
                                <input
                                    value={i.id}
                                    type="checkbox"
                                    onChange={handleCheckFilter}
                                    checked={groupId.includes(i.id)}
                                />
                                {i.group_name}
                            </label>
                        ))
                    }
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
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                </div>
            </div>
        </div>
    )
}
export default ModalMember