import { useState } from "react"
import TextArea from "../../component/form/TextArea"
import Title from "../../component/form/Title"
import UploadFile from "../../component/form/UploadFile"
import { LuMessageCircle } from "react-icons/lu";
import SearchBox from "../../component/quotation_about/SearchBox";
import TableMember from "../../component/table/TableMember";
import { useEffect } from "react";
import { listForMessage, searchMember } from "../../service/member";
import { listGroup } from "../../service/member/group_member";
import ButtonSendMessage from "../../component/quotation_about/ButtonSendMessage";
import { sendMessage } from "../../service/member/messageApi";
import toast from "react-hot-toast";

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
            <div className='flex flex-col gap-3 bg-white rounded-2xl p-5'>
                <div className='flex items-center justify-between'>
                    <Title
                        title='ส่งข้อความ'
                    />
                </div>
                <form onSubmit={handleSubmitMessage} className="grid lg:grid-cols-3 gap-5">
                    <div className="col-span-2">
                        <TextArea
                            title='ข้อความ'
                            name='text'
                            typ='text'
                            onChange={handleOnChange}
                            value={form.text}
                            placeholder='ใส่ข้อความที่ต้องการส่ง...'
                        />
                    </div>
                    <div className="flex flex-col gap-5 items-end">
                        <UploadFile form={form} setForm={setForm} />
                        <ButtonSendMessage
                            loading={loading}
                            type='submit'
                        />
                    </div>
                </form>
                <div className="flex-1">
                    <SearchBox
                        width='w-full'
                        placeholder='ค้นหาชื่อ, นามสกุล, เบอร์โทร...'
                        onChange={(e) => setTextSearch(e.target.value)} />
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
            </div>
        </div>
    )
}
export default MessageApi