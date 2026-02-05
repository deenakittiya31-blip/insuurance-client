import TextInput from "../form/TextInput"
import UploadFile from "../form/UploadFile"

const ModalMember = ({ form, setForm, onSubmit, onChange }) => {
    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('modalgroupmember').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="modalgroupmember" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มข้อมูลกลุ่ม</h3>
                    <TextInput
                        width='w-sm'
                        title='ชื่อกลุ่ม'
                        name='group_name'
                        type='text'
                        placeholder='ชื่อกลุ่ม...'
                        onChange={onChange}
                        value={form.group_name}
                    />
                    <UploadFile
                        form={form}
                        setForm={setForm}
                    />
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('modalgroupmember').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}
export default ModalMember