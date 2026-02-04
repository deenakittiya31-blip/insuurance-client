import { useEffect, useState } from "react"
import { createGroup, deleteGroup, listGroup, updateGroup } from "../../service/member/group_member"
import Title from "../../component/form/Title"
import toast from "react-hot-toast"
import TextInput from "../../component/form/TextInput"
import Swal from "sweetalert2"

const GroupMember = () => {
    const [group, setGroup] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [group_name, setGroupName] = useState('')

    useEffect(() => {
        fetchGroupMember();
    }, [])

    const fetchGroupMember = async () => {
        try {
            const res = await listGroup()
            setGroup(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateGroup = async (e) => {
        e.preventDefault()
        if (!group_name.trim()) {
            return toast('กรุณากรอกชื่อกลุ่ม')
        }

        try {
            const res = await createGroup(group_name)
            toast.success(res.data.msg)
            setGroupName('')
            fetchGroupMember()
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
        try {
            const res = await deleteGroup(id)
            toast.success(res.data.msg)
            fetchGroupMember()
        } catch (err) {
            console.log(err)
            toast.error('ลบกลุ่มไม่สำเร็จ')
        }
    }

    const startEdit = (item) => {
        setEditingId(item.id)
        setGroupName(item.group_name)
    }

    const cancelEdit = () => {
        setEditingId(null)
        setGroupName('')
    }

    const updateGroupName = async (id, value) => {
        if (!value.trim()) return cancelEdit()

        try {
            const res = await updateGroup(id, value)
            cancelEdit()
            toast.success(res.data.msg)
            fetchGroupMember()
        } catch (err) {
            console.log(err)
            toast.error('แก้ไขกลุ่มไม่สำเร็จ')
        }
    }
    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='กลุ่มลูกค้า'
                />
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <form onSubmit={handleCreateGroup} className='flex justify-end items-baseline-last gap-3'>
                    <div className="">
                        <TextInput
                            value={group_name}
                            placeholder='กรอกข้อมูลชื่อกลุ่ม...'
                            width='w-40 lg:w-xs'
                            name='group_name'
                            type='text'
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn bg-main px-5 rounded-md text-white font-semibold">บันทึก</button>
                </form>
                <div className="overflow-x-auto font-prompt">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='font-medium text-neutral-400'>ลำดับ</th>
                                <th className='font-medium text-neutral-400'>ประเภท</th>
                                <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                group?.map((i, idx) => (
                                    <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                        <td>{idx + 1}</td>
                                        <td>
                                            {editingId === i.id ? (
                                                <input
                                                    autoFocus
                                                    value={group_name}
                                                    onChange={(e) => setGroupName(e.target.value)}
                                                    onBlur={(e) => updateGroupName(i.id, e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault()
                                                            updateGroupName(i.id, e.target.value)
                                                        }
                                                        if (e.key === 'Escape') cancelEdit()
                                                    }}
                                                    className="p-2 border rounded focus:outline-none bg-white"
                                                />
                                            ) : (
                                                <span
                                                    className="cursor-pointer"
                                                >
                                                    {i.group_name}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <div className='flex gap-5 justify-center'>
                                                <button onClick={() => startEdit(i)} className="btn btn-sm btn-soft btn-warning">แก้ไข</button>
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
        </div>
    )
}
export default GroupMember