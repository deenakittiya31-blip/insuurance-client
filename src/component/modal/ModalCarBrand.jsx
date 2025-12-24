import React from 'react'
import TextInput from '../form/TextInput'
import UploadFile from '../form/UploadFile'

const ModalCarBrand = ({ form, setForm, onSubmit, onChange }) => {
    return (
        <div className='font-prompt'>
            <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_2').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg">เพิ่มยี่ห้อของรถ</h3>
                    <TextInput
                        width='w-sm'
                        title='ชื่อยี่ห้อ'
                        name='name'
                        type='text'
                        placeholder='ชื่อยี่ห้อ...'
                        onChange={onChange}
                        value={form.name}
                    />
                    <UploadFile
                        form={form}
                        setForm={setForm}
                    />
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('my_modal_2').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default ModalCarBrand