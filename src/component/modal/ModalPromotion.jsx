import React from 'react'
import TextArea from '../form/TextArea'
import UploadFile from '../form/UploadFile'

const ModalPromotion = ({ form, setForm, onSubmit, onChange }) => {
    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('modalpromotion').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="modalpromotion" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มโปรโมชั่น</h3>
                    <UploadFile
                        form={form}
                        setForm={setForm}
                    />
                    {/* <TextInput
                        width='w-sm'
                        title='ชื่อโปรโมชั่น'
                        name='promotion_name'
                        type='text'
                        placeholder='ชื่อโปรโมชั่น...'
                        onChange={onChange}
                        value={form.promotion_name}
                    /> */}
                    <TextArea
                        title='ชื่อโปรโมชั่น'
                        name='promotion_name'
                        type='text'
                        placeholder='ชื่อโปรโมชั่น...'
                        onChange={onChange}
                        value={form.promotion_name}
                    />
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('modalpromotion').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default ModalPromotion