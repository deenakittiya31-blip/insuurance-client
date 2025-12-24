import React from 'react'
import TextInput from '../form/TextInput';

const EditTypeInsur = ({ isOpen, onClose, onChange, onSubmit, value }) => {
    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt">เพิ่มข้อมูลประเภทประกัน</h3>
                <TextInput
                    width='w-sm'
                    title='ประเภทประกัน'
                    name='nameType'
                    type='text'
                    placeholder='กรอกประเภทของประกัน เช่น ชั้น 1...'
                    onChange={onChange}
                    value={value.nameType}
                />
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm">รายละเอียด</legend>
                    <textarea
                        name='description'
                        onChange={onChange}
                        value={value.description}
                        className="textarea h-24 w-full" placeholder="รายละเอียด...">
                    </textarea>
                </fieldset>
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}

export default EditTypeInsur