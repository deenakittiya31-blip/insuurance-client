import React from 'react'
import TextInput from '../form/TextInput';
import Select from '../form/Select';

const EditUser = ({ isOpen, onClose, onChange, onSubmit, form }) => {

    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="max-w-150 p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt text-text-primary">แก้ไขข้อมูลผู้ใช้งานระบบ</h3>
                <div className='grid grid-cols-2 gap-5 items-end'>
                    <TextInput
                        placeholder='กรอกชื่อผู้ใช้งาน...'
                        title='ชื่อผู้ใช้งาน'
                        width='w-full'
                        name='name'
                        type='text'
                        onChange={onChange}
                        value={form.name}
                    />
                    <TextInput
                        placeholder='กรอกชื่อจริง...'
                        title='ชื่อจริง'
                        width='w-full'
                        name='first_name'
                        type='text'
                        onChange={onChange}
                        value={form.first_name}
                    />
                    <TextInput
                        placeholder='กรอกามสกุล...'
                        title='นามสกุล'
                        width='w-full'
                        name='last_name'
                        type='text'
                        onChange={onChange}
                        value={form.last_name}
                    />
                    <TextInput
                        placeholder='กรอกอีเมลล์...'
                        title='อีเมลล์'
                        width='w-full'
                        name='email'
                        type='text'
                        onChange={onChange}
                        value={form.email}
                    />
                    <TextInput
                        placeholder='กรอกเบอร์โทรศัพท์'
                        title='เบอร์โทรศัพท์'
                        width='w-full'
                        name='phone'
                        type='text'
                        onChange={onChange}
                        value={form.phone}
                    />
                    <div>
                        <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>สถานะซ่อม</label>
                        <select
                            name='role'
                            value={form.role}
                            onChange={onChange}
                            className="select font-prompt w-full"
                        >
                            <option value="" disabled={true}>กรุณาเลือกสิทธิ์</option>
                            <option value='admin'>admin</option>
                            <option value='staff'>staff</option>
                        </select>
                    </div>
                </div>
                <div className='modal-action font-prompt'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}

export default EditUser