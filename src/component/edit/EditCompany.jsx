import React from 'react'
import TextInput from '../form/TextInput'
import UploadFile from '../form/UploadFile';

const EditCompany = ({ isOpen, form, setForm, onSubmit, onChange, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt">เพิ่มข้อมูลบริษัท</h3>
                <UploadFile
                    form={form}
                    setForm={setForm}
                />
                <TextInput
                    width='w-sm'
                    title='ชื่อบริษัท'
                    name='nameCompany'
                    type='text'
                    placeholder='ชื่อบริษัท'
                    onChange={onChange}
                    value={form.nameCompany}
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
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}

export default EditCompany