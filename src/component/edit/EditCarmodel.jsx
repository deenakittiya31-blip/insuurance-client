import React from 'react'
import Input from '../form/Input';
import Select from '../form/Select';
import TextInput from '../form/TextInput';

const EditCarmodel = ({ isOpen, onClose, onChange, onSubmit, value, carbrand }) => {
    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20 font-prompt'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt text-text-primary">แก้ไขรุ่นรถยนต์</h3>
                <TextInput
                    placeholder='กรอกรุ่นรถยนต์'
                    title='รุ่นรถยนต์'
                    width='w-xs'
                    name='name'
                    type='text'
                    onChange={onChange}
                    value={value.name}
                />
                <Select
                    text='ยี่ห้อรถ'
                    data={carbrand}
                    name='brand_id'
                    value={value.brand_id}
                    onChange={onChange}
                    valueKey='id'
                    labelKey='name'
                />
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}

export default EditCarmodel