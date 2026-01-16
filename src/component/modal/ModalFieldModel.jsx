import TextArea from "../form/TextArea"
import TextInput from "../form/TextInput"

const ModalFieldModel = ({ value, onSubmit, onChange }) => {
    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('modalfieldmodel').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="modalfieldmodel" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
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
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('modalfieldmodel').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div >
    )
}
export default ModalFieldModel