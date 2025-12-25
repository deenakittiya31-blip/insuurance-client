import React, { useEffect } from 'react'
import TextInput from '../form/TextInput'
import Select from '../form/Select'
import useActionStore from '../../store/action-store'

const ModalPremium = ({ form, onSubmit, onChange }) => {
    const packageSelect = useActionStore((s) => s.packageSelect)
    const carUsage = useActionStore((s) => s.carUsage)
    const getPackageSelect = useActionStore((s) => s.getPackageSelect)
    const getCarUsage = useActionStore((s) => s.getCarUsage)

    useEffect(() => {
        getPackageSelect();
        getCarUsage();
    }, [])

    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('my_modal_2').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg">เพิ่มข้อมูล แพ็กเกจ</h3>
                    <Select
                        text='ชื่อแพ็กเกจ'
                        data={packageSelect}
                        name='package_id'
                        value={form.package_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='package_name'
                        required
                    />
                    <Select
                        text='การใช้งาน'
                        data={carUsage}
                        name='car_usage_id'
                        value={form.car_usage_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='usage_name'
                        required
                    />
                    <TextInput
                        width='w-sm'
                        title='ปี'
                        name='car_year'
                        type='text'
                        placeholder='กรอกปี'
                        onChange={onChange}
                        value={form.car_year}
                    />
                    <TextInput
                        width='w-sm'
                        title='ราคาเบี้ยประกัน'
                        name='premium_price'
                        type='number'
                        placeholder='กรอกคุ้มครอง'
                        onChange={onChange}
                        value={form.premium_price}
                    />
                    <TextInput
                        width='w-sm'
                        title='ราคาค่าคุ้มครอง'
                        name='compulsory_price'
                        type='number'
                        placeholder='กรอกราคาค่าคุ้มครอง'
                        onChange={onChange}
                        value={form.compulsory_price}
                    />
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('my_modal_2').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div >
    )
}

export default ModalPremium