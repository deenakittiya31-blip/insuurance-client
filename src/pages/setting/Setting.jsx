import { useEffect, useState } from "react"
import TextInput from "../../component/form/TextInput"
import Title from "../../component/form/Title"
import useInsureAuth from "../../store/auth-store"
import toast from "react-hot-toast"
import { getLoginWithSetting, statusLoginWith } from "../../service/auth"
import { geteSecret, updateSecret } from "../../service/setting"

const Setting = () => {
    const token = useInsureAuth((s) => s.token);
    const [loginWith, setLoginWith] = useState([])
    const [seting, setSetting] = useState([])
    const [editId, setEditId] = useState(null)
    const [editValue, setEditValue] = useState('')

    useEffect(() => {
        getStatusLogin()
        fetchSettingSecret()
    }, [])

    const getStatusLogin = async () => {
        try {
            const res = await getLoginWithSetting()
            setLoginWith(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlToggleStatus = async (id, status) => {
        //Optimistic UI
        setLoginWith(prev =>
            prev.map(item =>
                item.id === id ? { ...item, status } : item
            )
        )

        try {
            const res = await statusLoginWith(token, id, status)
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error('อัปเดตไม่สำเร็จ')
            setLoginWith(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, status: !status } : item
                )
            )
        }
    }

    const fetchSettingSecret = async () => {
        try {
            const res = await geteSecret()
            setSetting(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(seting)

    const openEdit = (s) => {
        setEditId(s.id)
        setEditValue(s.secret_config)
    }

    const closeEdit = () => {
        setEditId(null)
        setEditValue('')
    }

    const handleUpdate = async (id) => {
        try {
            const res = await updateSecret(id, editValue)
            setSetting(prev => prev.map(s =>
                s.id === id ? { ...s, secret_config: editValue } : s
            ))
            toast.success(res.data.msg)
            closeEdit()
        } catch (err) {
            console.log(err)
            toast.error('แก้ไขไม่สำเร็จ')
        }
    }

    return (
        <div className='flex flex-col gap-5 p-5'>
            <Title title='การตั้งค่าระบบ' />
            <div className="flex flex-col gap-5 w-full">
                <form >
                    <label className='font-normal font-prompt text-sm capitalize text-gray-400'>ตั้งค่า API</label>
                    <div className="grid grid-cols-2 gap-5 mt-2">
                        {seting.map((s) => (
                            <div key={s.id}>
                                {editId === s.id ? (
                                    <div className="flex flex-col gap-2">
                                        <label className="font-prompt text-sm text-gray-400">{s.key_config}</label>
                                        <textarea
                                            className="textarea textarea-bordered w-full font-inter text-sm"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            rows={3}
                                        />
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                type="button"
                                                className="btn btn-xs font-prompt"
                                                onClick={closeEdit}
                                            >
                                                ยกเลิก
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-xs bg-black text-white font-prompt"
                                                onClick={() => handleUpdate(s.id)}
                                            >
                                                บันทึก
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        <TextInput
                                            title={s.key_config}
                                            font='font-inter'
                                            width='w-auto'
                                            value={s.secret_config}
                                            readOnly
                                        />
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                className="btn btn-xs font-prompt"
                                                onClick={() => openEdit(s)}
                                            >
                                                แก้ไข
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>
                </form>
                <form className="text-text-primary">
                    <label className='font-normal mb-2 font-prompt text-sm capitalize text-gray-400'>ตั้งค่าการล็อกอิน</label>
                    <div className="grid lg:flex gap-5">
                        {
                            loginWith.map((i) => (
                                <fieldset key={i.id} className="fieldset bg-base-100 border-base-300 rounded-box lg:w-64 border p-4">
                                    <legend className="fieldset-legend font-inter text-sm">{i.login_with}</legend>
                                    <label className="label font-prompt">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => hdlToggleStatus(i.id, e.target.checked)}
                                            checked={i.status}
                                            className="toggle" />
                                        {i.status ? 'ปิด' : 'เปิด'}การลงชื่อเข้าใช้ด้วย {i.login_with}
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