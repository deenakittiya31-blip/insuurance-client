import React from 'react'
import TextInput from '../form/TextInput'
import Select from '../form/Select'

const ModalUser = ({ form, onSubmit, onChange }) => {
    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('modaluser').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="modaluser" className="modal">
                <form onSubmit={onSubmit} className="modal-box max-w-150 flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มผู้ใช้งานระบบ</h3>
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
                        <TextInput
                            placeholder='กรอกรหัสผ่าน...'
                            title='รหัสผ่าน'
                            width='w-full'
                            name='password'
                            type='text'
                            onChange={onChange}
                            value={form.password}
                        />
                        <div className='col-span-2 flex flex-col'>
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
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('modaluser').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default ModalUser