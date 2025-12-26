import React from 'react'
import TextInput from '../form/TextInput';
import Select from '../form/Select';

const EditCarType = ({ isOpen, carUsage, onClose, onChange, onSubmit, value }) => {

    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt">เพิ่มประเภทรถยนต์</h3>
                <TextInput
                    width='w-sm'
                    title='ประเภทรถยนต์'
                    name='type'
                    type='text'
                    placeholder='กรอกประเภทรถยนต์'
                    onChange={onChange}
                    value={value.type}
                />
                <TextInput
                    width='w-sm'
                    title='รหัสการใช้งาน'
                    name='code'
                    type='text'
                    placeholder='กรอกรหัสการใช้งาน'
                    onChange={onChange}
                    value={value.code}
                />
                <Select
                    text='ประเภทการใช้งานรถ'
                    data={carUsage}
                    name='car_usage_id'
                    value={value.car_usage_id}
                    onChange={onChange}
                    valueKey='id'
                    labelKey='usage_name'
                />
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}

export default EditCarType