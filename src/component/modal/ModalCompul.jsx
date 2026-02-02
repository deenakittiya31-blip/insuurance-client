import React, { useEffect, useState } from 'react'
import TextInput from '../form/TextInput'
import TextArea from '../form/TextArea'
import { listUsageTypeSelect } from '../../service/car/CarUsage'

const ModalCompul = ({ form, onSubmit, onChange }) => {
    const [carUsageType, setCarUsageType] = useState([])

    useEffect(() => {
        getCarUsageType();
    }, [])

    const getCarUsageType = async () => {
        try {
            const res = await listUsageTypeSelect();
            setCarUsageType(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('modalcompul').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="modalcompul" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-lg flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มข้อมูล พ.ร.บ. รถ</h3>
                    <TextInput
                        width='w-auto'
                        title='ชื่อประเภทรถย่อย'
                        name='car_type'
                        type='text'
                        placeholder='กรอกชื่อประเภทรถย่อย...'
                        onChange={onChange}
                        value={form.car_type}
                    />
                    <div className="grid grid-cols-2 gap-5 items-end">
                        <fieldset className="fieldset font-prompt text-text-primary p-0">
                            <legend className="fieldset-legend text-sm text-text-primary">รหัสประเภทหลัก</legend>
                            <select
                                name='car_usage_type_id'
                                onChange={onChange}
                                className="select w-full"
                                value={form.car_usage_type_id}
                            >
                                <option value="" disabled={true}>โปรดเลือก</option>
                                {
                                    carUsageType.map((i) => (
                                        <option
                                            key={i.id}
                                            value={i.id}
                                        >
                                            {i.car_type} ({i.code_usage})
                                        </option>
                                    ))
                                }
                            </select>
                        </fieldset>
                        <TextInput
                            width='w-auto'
                            title='รหัสประเภทย่อย'
                            name='code_sub'
                            type='text'
                            placeholder='กรอกรหัสย่อย...'
                            onChange={onChange}
                            value={form.code_sub}
                        />
                        <TextInput
                            width='w-auto'
                            title='สุทธิ'
                            name='net_price'
                            type='number'
                            placeholder='กรอกสุทธิ...'
                            onChange={onChange}
                            value={form.net_price}
                        />
                        <TextInput
                            width='w-auto'
                            title='vat'
                            name='vat'
                            type='number'
                            placeholder='vat...'
                            onChange={onChange}
                            value={form.vat}
                        />
                        <TextInput
                            width='w-auto'
                            title='อากร'
                            name='stamp'
                            type='number'
                            placeholder='กรอกอากร...'
                            onChange={onChange}
                            value={form.stamp}
                        />
                        <TextInput
                            width='w-auto'
                            title='รวม'
                            name='total'
                            type='number'
                            placeholder='กรอกรวม...'
                            onChange={onChange}
                            value={form.total}
                        />
                    </div>
                    <TextArea
                        width='w-auto'
                        title='รายละเอียด'
                        name='detail'
                        type='text'
                        placeholder='กรอกรายละเอียด'
                        onChange={onChange}
                        value={form.detail}
                    />
                    <div className='flex justify-end gap-3'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('modalcompul').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default ModalCompul