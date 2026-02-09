import { useEffect, useState } from "react"
import { createGroup, deleteGroup, listGroup, readGroup, statusGroup, updateGroup } from "../../service/member/group_member"
import Title from "../../component/form/Title"
import toast from "react-hot-toast"
import Swal from "sweetalert2"
import EditGroupMember from "../../component/edit/EditGroupMember"
import ModalGroupMember from "../../component/modal/ModalGroupMember"

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
            toast.success(res.data.msg)
            setForm(intitailState)
            document.getElementById('modalgroupmember').close()
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

        try {
            const res = await updateGroup(idSelect, form)
            closeForm()
            toast.success(res.data.msg)
            fetchGroupMember()
        } catch (err) {
            console.log(err)
            toast.error('แก้ไขกลุ่มไม่สำเร็จ')
        }
    }

    const hdlToggleActive = async (id, currentStatus) => {
        try {
            await statusGroup(id, !currentStatus)
            fetchGroupMember()
            toast.success('อัปเดตสถานะกลุ่มสำเร็จ')
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
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
                <div className='flex justify-end items-baseline-last gap-3'>
                    <ModalGroupMember
                        form={form}
                        setForm={setForm}
                        onChange={handleOnChange}
                        onSubmit={handleCreateGroup}
                    />
                </div>
                <div className="overflow-x-auto font-prompt">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='font-medium text-neutral-400'>ลำดับ</th>
                                <th className='font-medium text-neutral-400'>รูปภาพ</th>
                                <th className='font-medium text-neutral-400'>ประเภท</th>
                                <th className='font-medium text-neutral-400'>สถานะ</th>
                                <th className='font-medium text-neutral-400 text-center'>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                group?.map((i, idx) => (
                                    <tr key={i.id} className='text-text-primary transition duration-300 ease-in hover:bg-neutral-50'>
                                        <td>{idx + 1}</td>
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