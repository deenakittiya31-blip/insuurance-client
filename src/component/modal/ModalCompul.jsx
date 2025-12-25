import React, { useEffect } from 'react'
import Select from '../form/Select'
import TextInput from '../form/TextInput'
import useActionStore from '../../store/action-store'

const ModalCompul = ({ form, onSubmit, onChange }) => {
    const cartype = useActionStore((s) => s.cartype)
    const getCarType = useActionStore((s) => s.getCarType)

    useEffect(() => {
        getCarType();
    }, [])

    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('my_modal_2').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg">เพิ่มข้อมูล พ.ร.บ. รถ</h3>
                    <Select
                        text='ประเภทรถ'
                        data={cartype}
                        value={form.car_type_id}
                        name='car_type_id'
                        onChange={onChange}
                        valueKey='id'
                        labelKey='type'
                    />
                    <TextInput
                        width='w-sm'
                        title='ราคา'
                        name='price'
                        type='number'
                        placeholder='กรอกราคา'
                        onChange={onChange}
                        value={form.price}
                    />
                    <TextInput
                        width='w-sm'
                        title='รายละเอียด'
                        name='coverage_detail'
                        type='text'
                        placeholder='กรอกรายละเอียด'
                        onChange={onChange}
                        value={form.coverage_detail}
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

export default ModalCompul