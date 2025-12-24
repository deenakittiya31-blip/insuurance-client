import React, { useEffect } from 'react'
import Select from '../form/Select'
import useActionStore from '../../store/action-store'
import TextInput from '../form/TextInput'



const ModalPackage = ({ form, onSubmit, onChange }) => {
    const company = useActionStore((s) => s.company)
    const typeInsur = useActionStore((s) => s.typeInsur)
    const getCompany = useActionStore((s) => s.getCompany)
    const getTypeInsur = useActionStore((s) => s.getTypeInsur)

    useEffect(() => {
        getCompany();
        getTypeInsur();
    }, [])

    return (
        <div className='font-prompt'>
            <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_2').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg">เพิ่มข้อมูล แพ็กเกจ</h3>
                    <Select
                        text='ชื่อบริษัท'
                        data={company}
                        name='company_id'
                        value={form.company_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='namecompany'
                    />
                    <Select
                        text='ประเภทของประกัน'
                        data={typeInsur}
                        name='insurance_type_id'
                        value={form.insurance_type_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='nametype'
                    />
                    <TextInput
                        width='w-sm'
                        title='ชื่อแพ็กเกจ'
                        name='package_name'
                        type='text'
                        placeholder='ชื่อแพ็กเกจ'
                        onChange={onChange}
                        value={form.package_name}
                    />
                    <TextInput
                        width='w-sm'
                        title='คุ้มครอง'
                        name='coverage_amount'
                        type='number'
                        placeholder='กรอกคุ้มครอง'
                        onChange={onChange}
                        value={form.coverage_amount}
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

export default ModalPackage