import React, { useEffect } from 'react'
import Select from '../form/Select'
import TextInput from '../form/TextInput'
import useActionStore from '../../store/action-store'

const EditCompulsory = ({ isOpen, onClose, onChange, onSubmit, value }) => {
    const carType = useActionStore((s) => s.cartype)
    const getCarType = useActionStore((s) => s.getCarType)

    useEffect(() => {
        getCarType();
    }, [])

    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt">เพิ่มข้อมูล แพ็กเกจ</h3>
                <Select
                    text='ประเภทรถ'
                    data={carType}
                    value={value.car_type_id}
                    name='car_type_id'
                    onChange={onChange}
                    valueKey='id'
                    labelKey='type'
                />
                <TextInput
                    width='w-sm'
                    title='ราคา'
                    name='price'
                    type='text'
                    placeholder='กรอกราคา'
                    onChange={onChange}
                    value={value.price}
                />
                <TextInput
                    width='w-sm'
                    title='รายละเอียด'
                    name='coverage_detail'
                    type='text'
                    placeholder='กรอกรายละเอียด'
                    onChange={onChange}
                    value={value.coverage_detail}
                />
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}

export default EditCompulsory