import React from 'react'
import Select from '../form/Select'
import TextInput from '../form/TextInput'

const ModalCarType = ({ form, carUsage, onSubmit, onChange }) => {
    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('my_modal_2').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg">เพิ่มประเภทรถยนต์</h3>
                    <TextInput
                        width='w-sm'
                        title='ประเภทรถยนต์'
                        name='type'
                        type='text'
                        placeholder='กรอกประเภทรถยนต์'
                        onChange={onChange}
                        value={form.type}
                    />
                    <TextInput
                        width='w-sm'
                        title='รหัสการใช้งาน'
                        name='code'
                        type='text'
                        placeholder='กรอกรหัสการใช้งาน'
                        onChange={onChange}
                        value={form.code}
                    />
                    <Select
                        text='ประเภทการใช้งานรถ'
                        data={carUsage}
                        name='car_usage_id'
                        value={form.car_usage_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='usage_name'
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

export default ModalCarType