import { useEffect, useState } from "react"
import TextInput from "../component/form/TextInput"
import Title from "../component/form/Title"
import useInsureAuth from "../store/auth-store"
import toast from "react-hot-toast"
import { getLoginWith, statusLoginWith } from "../service/auth"

const Setting = () => {
    const token = useInsureAuth((s) => s.token);
    const [loginWith, setLoginWith] = useState([])

    useEffect(() => {
        getStatusLogin()
    }, [])

    const getStatusLogin = async () => {
        try {
            const res = await getLoginWith()
            setLoginWith(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleStatus = async (id, currentStatus) => {
        try {
            const res = await statusLoginWith(token, id, !currentStatus)
            toast.success(res.data.msg)
            getStatusLogin()
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 p-5'>
            <Title title='การตั้งค่าระบบ' />
            <div className="flex flex-col gap-5 w-full">
                <form >
                    <label className='font-normal font-prompt text-sm capitalize text-gray-400'>ตั้งค่าเกี่ยวกับไลน์</label>
                    <div className="flex flex-col gap-5 mt-2">
                        <TextInput
                            title='Line Webhook'
                            font='font-inter'
                            placeholder='กรอก line webhook...'
                            width='w-auto'
                            value='http://webhook.com'
                            readOnly
                        />
                        <TextInput
                            title='Secret Line'
                            font='font-inter'
                            placeholder='กรอก secret line...'
                            width='w-auto'
                            value='dn123456'
                            readOnly
                        />
                    </div>
                    <div className="mt-3 flex justify-end">
                        <button type="submit" className="btn btn-sm bg-black font-prompt text-white">บันทึก</button>
                    </div>
                </form>
                <form className="text-text-primary">
                    <label className='font-normal mb-2 font-prompt text-sm capitalize text-gray-400'>ตั้งค่าการล็อกอิน</label>
                    <div className="flex gap-5">
                        {
                            loginWith.map((i) => (
                                <fieldset key={i.id} className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
                                    <legend className="fieldset-legend font-inter text-sm">Login {i.login_with}</legend>
                                    <label className="label font-prompt">
                                        <input
                                            type="checkbox"
                                            onChange={() => hdlToggleStatus(i.id, i.status)}
                                            checked={i.status}
                                            className="toggle" />
                                        {i.status ? 'เปิด' : 'ปิด'}การลงชื่อเข้าใช้ด้วย {i.login_with}
                                    </label>
                                </fieldset>
                            ))
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Setting