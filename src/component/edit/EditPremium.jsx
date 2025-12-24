import React, { useEffect } from 'react'
import useActionStore from '../../store/action-store'
import Select from '../form/Select'
import TextInput from '../form/TextInput'

const EditPremium = ({ isOpen, onClose, onchange, onSubmit, value }) => {
    const packageSelect = useActionStore((s) => s.packageSelect)
    const getPackageSelect = useActionStore((s) => s.getPackageSelect)
    const carUsage = useActionStore((s) => s.carUsage)
    const getCarUsage = useActionStore((s) => s.getCarUsage)

    useEffect(() => {
        getPackageSelect();
        getCarUsage();
    }, [])

    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt">เพิ่มข้อมูล แพ็กเกจ</h3>
                <Select
                    text='ชื่อแพ็กเกจ'
                    data={packageSelect}
                    value={value.package_id}
                    name='package_id'
                    onChange={onchange}
                    valueKey='id'
                    labelKey='package_name'
                />
                <Select
                    text='การใช้งาน'
                    data={carUsage}
                    value={value.car_usage_id}
                    name='car_usage_id'
                    onChange={onchange}
                    valueKey='id'
                    labelKey='usage_name'
                />
                <TextInput
                    width='w-sm'
                    title='ปี'
                    name='car_year'
                    type='text'
                    placeholder='กรอกปี'
                    onChange={onchange}
                    value={value.car_year}
                />
                <TextInput
                    width='w-sm'
                    title='ราคาเบี้ยประกัน'
                    name='premium_price'
                    type='number'
                    placeholder='กรอกคุ้มครอง'
                    onChange={onchange}
                    value={value.premium_price}
                />
                <TextInput
                    width='w-sm'
                    title='ราคาค่าคุ้มครอง'
                    name='compulsory_price'
                    type='number'
                    placeholder='กรอกราคาค่าคุ้มครอง'
                    onChange={onchange}
                    value={value.compulsory_price}
                />
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}

export default EditPremium