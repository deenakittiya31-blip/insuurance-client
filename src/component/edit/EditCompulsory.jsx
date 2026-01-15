import React, { useEffect } from 'react'
import Select from '../form/Select'
import TextInput from '../form/TextInput'
import useActionStore from '../../store/action-store'

const EditCompulsory = ({ isOpen, onClose, onChange, onSubmit, value }) => {
    const carType = useActionStore((s) => s.cartype)
    const getCarTypeSelect = useActionStore((s) => s.getCarTypeSelect)

    useEffect(() => {
        getCarTypeSelect();
    }, [])

    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt text-text-primary">เพิ่มข้อมูล พ.ร.บ. รถยนต์</h3>
                <Select
                    text='ประเภทรถยนต์'
                    data={carType}
                    value={value.car_type_id}
                    name='car_type_id'
                    onChange={onChange}
                    valueKey='id'
                    labelKey='type'
                />
                <div className="grid grid-cols-2 gap-5 items-end">
                    <TextInput
                        width='w-auto'
                        title='รหัส'
                        name='code'
                        type='text'
                        placeholder='กรอกรหัส'
                        onChange={onChange}
                        value={value.code}
                    />
                    <TextInput
                        width='w-auto'
                        title='สุทธิ'
                        name='net_price'
                        type='number'
                        placeholder='กรอกสุทธิ...'
                        onChange={onChange}
                        value={value.net_price}
                    />
                    <TextInput
                        width='w-auto'
                        title='vat'
                        name='vat'
                        type='text'
                        placeholder='vat...'
                        onChange={onChange}
                        value={value.vat}
                    />
                    <TextInput
                        width='w-auto'
                        title='อากร'
                        name='stamp'
                        type='number'
                        placeholder='กรอกอากร...'
                        onChange={onChange}
                        value={value.stamp}
                    />
                    <TextInput
                        width='w-auto'
                        title='รวม'
                        name='total'
                        type='number'
                        placeholder='กรอกรวม...'
                        onChange={onChange}
                        value={value.total}
                    />
                    <TextInput
                        width='w-auto'
                        title='รายละเอียด'
                        name='detail'
                        type='text'
                        placeholder='กรอกรายละเอียด'
                        onChange={onChange}
                        value={value.detail}
                    />
                </div>
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}

export default EditCompulsory