import React from 'react'
import TextInput from '../form/TextInput';

const EditYear = ({ isOpen, onClose, onChange, onSubmit, form }) => {
    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt text-text-primary">เพิ่มยี่ห้อของรถ</h3>
                <TextInput
                    width='w-sm'
                    title='ปี พ.ศ.'
                    name='year_be'
                    type='text'
                    placeholder='กรอกปี'
                    onChange={onChange}
                    value={form.year_be}
                />
                <TextInput
                    width='w-sm'
                    title='ปี ค.ศ.'
                    name='year_ad'
                    type='text'
                    placeholder='กรอกปี'
                    onChange={onChange}
                    value={form.year_ad}
                />
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                </div>
            </form>
        </div>
    )
}

export default EditYear