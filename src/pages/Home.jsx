import { useState } from "react"
import Title from "../component/form/Title"
import { listMember, sendDocumentToMember } from "../service/member"
import { useEffect } from "react"
import TableMember from "../component/table/TableMember"
import UploadImageLine from "../component/form/UploadImageLine"
import toast from "react-hot-toast"

const Home = () => {
    const [member, setMember] = useState([])
    const [memberSelected, setMemberSelected] = useState([])
    const [form, setForm] = useState({
        file_url: '',
        file_public_id: '',
        file_type: '',
    })

    useEffect(() => {
        getMember()
    }, [])

    const getMember = async () => {
        try {
            const res = await listMember()
            setMember(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    const handleCheck = (e) => {
        const userId = e.target.value //ค่าที่โดนเช็ค

        setMemberSelected((prev) =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        )
    }
    console.log(memberSelected)
    console.log(form)

    const sendMessage = async () => {
        try {
            if (!form.file_url) {
                toast('กรุณาเลือกรูป')
                return
            }
            if (memberSelected.length === 0) {
                toast('กรุณาเลือกลูกค้า')
                return
            }

            const res = await sendDocumentToMember(
                memberSelected,
                form.file_url,
                form.file_type
            )

            toast.success(res.data.msg)
            setMemberSelected([])
            setForm({
                file_url: '',
                file_public_id: '',
                file_type: ''
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <div className='flex items-center justify-between'>
                <Title
                    title='ข้อมูลลูกค้า'
                />
            </div>
            <div className="flex items-baseline-last">
                <UploadImageLine
                    form={form}
                    setForm={setForm}
                />
                <button onClick={sendMessage} className="px-7 btn bg-main font-medium font-prompt text-base text-white">ส่ง</button>
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <TableMember
                    data={member}
                    onChange={handleCheck}
                    selected={memberSelected}
                />
            </div>
        </div>
    )
}
export default Home