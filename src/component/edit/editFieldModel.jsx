import TextArea from "../form/TextArea";
import TextInput from "../form/TextInput";

const editFieldModel = ({ isOpen, onClose, onChange, onSubmit, value }) => {
    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20 font-prompt'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt text-text-primary">แก้ไขฟิลด์ดึงข้อมูล</h3>
                <TextInput
                    width='w-sm'
                    title='ชื่อฟิลด์'
                    name='key_name'
                    type='text'
                    placeholder='เช่น quotation_number'
                    onChange={onChange}
                    value={value.key_name}
                />
                <TextArea
                    title='คำอธิบาย'
                    name='description'
                    type='text'
                    placeholder='เช่น เลขที่ใบกำกับภาษี'
                    onChange={onChange}
                    value={value.description}
                />
                <TextInput
                    width='w-sm'
                    title='ตัวอย่าง'
                    name='example_value'
                    type='text'
                    placeholder='เช่น Q20260100001'
                    onChange={onChange}
                    value={value.example_value}
                />
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}
export default editFieldModel   