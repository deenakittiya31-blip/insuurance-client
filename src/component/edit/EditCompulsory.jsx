import React, { useEffect } from 'react'
import Select from '../form/Select'
import TextInput from '../form/TextInput'
import { useState } from 'react'
import { listUsageTypeSelect } from '../../service/car/CarUsage'
import TextArea from '../form/TextArea'

const EditCompulsory = ({ isOpen, onClose, onChange, onSubmit, form }) => {
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
    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt text-text-primary">เพิ่มข้อมูล พ.ร.บ. รถยนต์</h3>
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
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}

export default EditCompulsory