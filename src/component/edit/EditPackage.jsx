import React, { useEffect } from 'react'
import TextInput from '../form/TextInput';
import Select from '../form/Select';
import useActionStore from '../../store/action-store';

const EditPackage = ({ isOpen, onClose, onchange, onSubmit, value }) => {
    const company = useActionStore((s) => s.company)
    const typeInsur = useActionStore((s) => s.typeInsur)
    const getCompanySelect = useActionStore((s) => s.getCompanySelect)
    const getTypeInsurSelect = useActionStore((s) => s.getTypeInsurSelect)

    useEffect(() => {
        getCompanySelect();
        getTypeInsurSelect();
    }, [])

    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20 font-prompt'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt text-text-primary">แก้ไขข้อมูลแพ็กเกจ</h3>
                <Select
                    text='ชื่อแพ็กเกจ'
                    data={company}
                    value={value.company_id}
                    name='company_id'
                    onChange={onchange}
                    valueKey='id'
                    labelKey='namecompany'
                />
                <Select
                    text='การใช้งาน'
                    data={typeInsur}
                    value={value.insurance_type_id}
                    name='insurance_type_id'
                    onChange={onchange}
                    valueKey='id'
                    labelKey='nametype'
                />
                <TextInput
                    width='w-sm'
                    title='ชื่อแพ็กเกจ'
                    name='package_name'
                    type='text'
                    placeholder='ชื่อแพ็กเกจ'
                    onChange={onchange}
                    value={value.package_name}
                />
                <TextInput
                    width='w-sm'
                    title='คุ้มครอง'
                    name='coverage_amount'
                    type='number'
                    placeholder='กรอกคุ้มครอง'
                    onChange={onchange}
                    value={value.coverage_amount}
                />
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}

export default EditPackage