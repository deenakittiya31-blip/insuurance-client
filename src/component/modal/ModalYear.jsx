import React from 'react'
import TextInput from '../form/TextInput'

const ModalYear = ({ form, onChange, onSubmit }) => {
    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('my_modal_2').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มข้อมูลปี พ.ศ. และ ค.ศ.</h3>
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
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('my_modal_2').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default ModalYear