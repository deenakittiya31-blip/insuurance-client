import React from 'react'
import TextInput from '../form/TextInput'
import UploadFile from '../form/UploadFile'

const ModalBank = ({ form, setForm, onSubmit, onChange }) => {
    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('modalbank').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="modalbank" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มธนาคาร</h3>
                    <UploadFile
                        form={form}
                        setForm={setForm}
                    />
                    <TextInput
                        width='w-sm'
                        title='ชื่อธนาคาร'
                        name='bank_name'
                        type='text'
                        placeholder='ชื่อธนาคาร...'
                        onChange={onChange}
                        value={form.bank_name}
                    />
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('modalbank').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default ModalBank