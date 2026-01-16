import React, { useEffect } from 'react'
import { TiArrowRightOutline } from "react-icons/ti";
import TextInput from '../form/TextInput'
import useActionStore from '../../store/action-store'

const ModalCompul = ({ form, onSubmit, onChange }) => {
    const cartype = useActionStore((s) => s.cartype)
    const getCarTypeSelect = useActionStore((s) => s.getCarTypeSelect)

    useEffect(() => {
        getCarTypeSelect();
    }, [])

    console.log(cartype)

    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('modalcompul').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="modalcompul" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มข้อมูล พ.ร.บ. รถ</h3>
                    <fieldset className="fieldset font-prompt text-text-primary p-0">
                        <legend className="fieldset-legend text-sm text-text-primary">ประเภทรถยนต์</legend>
                        <select
                            name='car_type_id'
                            onChange={onChange}
                            className="select w-full"
                            value={form.car_type_id}
                        >
                            <option value="" disabled={true}>โปรดเลือก</option>
                            {
                                cartype.map((i) => (
                                    <option
                                        key={i.id}
                                        value={i.id}
                                    >
                                        {i.type} <TiArrowRightOutline color='#FD7E14'/> {i.usage}
                                    </option>
                                ))
                            }
                        </select>
                    </fieldset>
                    <div className="grid grid-cols-2 gap-5 items-end">
                        <TextInput
                            width='w-auto'
                            title='รหัส'
                            name='code'
                            type='text'
                            placeholder='กรอกรหัส'
                            onChange={onChange}
                            value={form.code}
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
                        <TextInput
                            width='w-auto'
                            title='รายละเอียด'
                            name='detail'
                            type='text'
                            placeholder='กรอกรายละเอียด'
                            onChange={onChange}
                            value={form.detail}
                        />
                    </div>
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('modalcompul').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default ModalCompul