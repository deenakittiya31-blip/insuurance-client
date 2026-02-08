import { useState } from "react"
import TextArea from "../../component/form/TextArea"
import Title from "../../component/form/Title"
import UploadFile from "../../component/form/UploadFile"
import { LuMessageCircle } from "react-icons/lu";

const MessageApi = () => {
    const [form, setForm] = useState({
        text: '',
        logo: '',
        logo_public_id: ''
    })
    return (
        <div className='flex flex-col gap-5 h-auto p-5 font-prompt'>
            <div className='flex flex-col gap-3 bg-white rounded-2xl p-5'>
                <div className='flex items-center justify-between'>
                    <Title
                        title='ส่งข้อความ'
                    />
                </div>
                <form className="grid lg:grid-cols-3 gap-5">
                    <div className="col-span-2">
                        <TextArea
                            title='ข้อความ'
                            name='text'
                            typ='text'
                            // onChange
                            // value
                            placeholder='ใส่ข้อความที่ต้องการส่ง...'
                        />
                    </div>
                    <div className="flex flex-col gap-5 items-end">
                        <UploadFile form={form} setForm={setForm} />
                        <button type="subbmit" className="btn btn-accent text-white w-full">
                            <LuMessageCircle /> ส่งข้อความ
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default MessageApi