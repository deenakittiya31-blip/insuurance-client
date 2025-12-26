import React from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import TextInput from '../form/TextInput'

const ModalCarModel = ({ form, carbrand, onSubmit, onChange }) => {
    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('my_modal_2').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มรุ่นรถยนต์</h3>
                    <TextInput
                        placeholder='กรอกรุ่นรถยนต์'
                        title='รุ่นรถยนต์'
                        width='w-xs'
                        name='name'
                        type='text'
                        onChange={onChange}
                        value={form.name}
                    />
                    <Select
                        text='ยี่ห้อรถ'
                        data={carbrand}
                        name='brand_id'
                        value={form.brand_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='name'
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

export default ModalCarModel