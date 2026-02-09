import { useState } from "react"
import Select from "../form/Select"
import { addMembers, listTagSelect } from "../../service/member/tag"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { listForMessage, searchMember } from "../../service/member"
import TableMember from "../table/TableMember"
import { listSelectGroup } from "../../service/member/group_member"
import SearchBox from "../quotation_about/SearchBox"

const ModalAddTagMember = () => {
    const [form, setForm] = useState({ tag_id: '' })
    const [tag, setTag] = useState([])
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });
    const [groupId, setGroupId] = useState([])
    const [member, setMember] = useState([])
    const [memberSelected, setMemberSelected] = useState([])
    const [groupData, setGroupData] = useState([])
    const [textSearch, setTextSearch] = useState('')

    useEffect(() => {
        if (textSearch) {
            handleSearchMember()
        } else {
            fetchTag()
            getGroup()
            getMember(sortConfig.key, sortConfig.direction, groupId)
        }

    }, [sortConfig, groupId, textSearch])

    const fetchTag = async () => {
        try {
            const res = await listTagSelect()
            setTag(res.data.data)
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

    const getGroup = async () => {
        try {
            const res = await listSelectGroup()
            setGroupData(res.data.data)
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

    const handlOnChange = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = {
                ...form,
                members: memberSelected
            }
            console.log(payload)
            const res = await addMembers(payload)
            handleClose()
            document.getElementById('modalAddTag').close()
            toast.success(res.data.msg)

        } catch (err) {
            console.log(err)
            toast.error('สร้างไม่สำเร็จ')
        }
    }

    const handleClose = () => {
        setForm({ tag_id: '' })
        setMemberSelected([])
        setGroupId([])
        setTextSearch('')
        document.getElementById('modalAddTag').close()
    }
    return (
        <div className='font-prompt'>
            <button className="btn btn-soft btn-success" onClick={() => document.getElementById('modalAddTag').showModal()}>เพิ่มสมาชิก</button>
            <dialog id="modalAddTag" className="modal">
                <form onSubmit={handleSubmit} className="modal-box max-w-3xl flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มสมาชิกเข้าป้ายกำกับ</h3>
                    <Select
                        text='ป้ายกำกับ'
                        data={tag}
                        name='tag_id'
                        value={form.tag_id}
                        onChange={handlOnChange}
                        valueKey='id'
                        labelKey='tag_name'
                    />
                    <SearchBox
                        width='w-full'
                        placeholder='ค้นหาชื่อ, นามสกุล, เบอร์โทร...'
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                    <div className="flex gap-3 justify-end">
                        {
                            groupData.map((i) => (
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
                    <div className='flex justify-end gap-3'>
                        <button type='button' className="btn btn-soft btn-error" onClick={handleClose}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}
export default ModalAddTagMember