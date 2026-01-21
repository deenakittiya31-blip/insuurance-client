import { useState } from "react"
import Title from "../component/form/Title"
import { listMember, sendImageToMember } from "../service/member"
import { useEffect } from "react"
import TableMember from "../component/table/TableMember"
import UploadImageLine from "../component/form/UploadImageLine"
import toast from "react-hot-toast"

const Home = () => {
    const [member, setMember] = useState([])
    const [memberSelected, setMemberSelected] = useState([])
    const [form, setForm] = useState({})

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
        const inCheck = e.target.value //ค่าที่โดนเช็ค

        //ประการอาร์เรย์ว่าง โดยเก็บข้อมูลจาก memberSelected
        const inState = [...memberSelected]

        //ค้นหาตำแหน่ง index ของ inState ถ้าไม่เจอจะรีเทิร์นออกมาเป็น -1
        const findIndex = inState.indexOf(inCheck)

        //ถ้าได้ -1 ให้เพิ่มตัว inCheck เข้าไปใน inState
        if (findIndex === -1) {
            inState.push(inCheck)
        } else {
            //ถ้าโดนเช็คแล้วให้ลบออกทีละ 1
            inState.splice(findIndex, 1)
        }

        setMemberSelected(inState)
    }
    console.log(memberSelected)
    console.log(form)

    const sendMessage = async () => {
        try {
            if (!form.image_url) {
                toast('กรุณาเลือกรูป')
                return
            }
            if (memberSelected.length === 0) {
                toast('กรุณาเลือกลูกค้า')
                return
            }

            const res = await sendImageToMember(memberSelected, form.image_url)
            toast.success(res.data.msg)
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
                <button className="px-7 btn bg-main font-medium font-prompt text-base text-white">ส่ง</button>
            </div>
            <div className='bg-white rounded-2xl p-5'>
                <TableMember
                    data={member}
                    onClick={handleCheck}
                />
            </div>
        </div>
    )
}
export default Home