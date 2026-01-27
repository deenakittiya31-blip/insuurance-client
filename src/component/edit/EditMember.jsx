import TextArea from "../form/TextArea";
import TextInput from "../form/TextInput";

const EditMember = ({ isOpen, form, onSubmit, onChange, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt text-text-primary">แก้ไขข้อมูลลูกค้า</h3>
                <TextInput
                    title='ชื่อ'
                    name='first_name'
                    type='text'
                    placeholder='กรอกชื่อจริง...'
                    onChange={onChange}
                    width='w-70 md:w-sm'
                    value={form.first_name}
                />
                <TextInput
                    title='นามสกุล'
                    name='last_name'
                    type='text'
                    placeholder='กรอกนามสกุล...'
                    onChange={onChange}
                    width='w-70 md:w-sm'
                    value={form.last_name}
                />
                <TextInput
                    title='เบอร์โทรศัพท์'
                    name='phone'
                    type='text'
                    placeholder='กรอกเบอร์โทรศัพท์...'
                    onChange={onChange}
                    width='w-70 md:w-sm'
                    value={form.phone}
                />
                <TextArea
                    title='หมายเหตุ'
                    name='note'
                    type='text'
                    placeholder='กรอกหมายเหตุ...'
                    onChange={onChange}
                    width='w-70 md:w-sm'
                    value={form.note}
                />
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}
export default EditMember