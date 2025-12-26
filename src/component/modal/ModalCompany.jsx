import React from 'react'
import TextInput from '../form/TextInput'
import UploadFile from '../form/UploadFile'

const ModalCompany = ({ form, setForm, onChange, onSubmit }) => {


    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('my_modal_2').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มข้อมูลบริษัทประกัน</h3>
                    <UploadFile
                        form={form}
                        setForm={setForm}
                    />
                    <TextInput
                        width='w-sm'
                        title='ชื่อบริษัท'
                        name='namecompany'
                        type='text'
                        placeholder='ชื่อบริษัท'
                        onChange={onChange}
                        value={form.namecompany}
                    />
                    <TextInput
                        width='w-sm'
                        title='รหัส'
                        name='code'
                        type='text'
                        placeholder='กรอกรหัส'
                        onChange={onChange}
                        value={form.code}
                    />
                    <TextInput
                        width='w-sm'
                        title='เบอร์โทรศัพท์'
                        name='phone'
                        type='text'
                        placeholder='เบอร์โทรศัพท์'
                        onChange={onChange}
                        value={form.phone}
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

export default ModalCompany