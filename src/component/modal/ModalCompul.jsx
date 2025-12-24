import React, { useState } from 'react'
import Select from '../form/Select'
import useInsureAuth from '../../store/auth-store'
import TextInput from '../form/TextInput'
import toast from 'react-hot-toast'
import { createCompulsory } from '../../service/car/Compulsory'

const ModalCompul = ({ onSuccess }) => {
    const token = useInsureAuth((s) => s.token)
    const carType = useInsureAuth((s) => s.cartype)
    const [form, setForm] = useState({
        car_type_id: '',
        price: '',
        coverage_detail: ''
    })

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createCompulsory(token, form)
            document.getElementById('my_modal_2').close();
            onSuccess();
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    return (
        <div className='font-prompt'>
            <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_2').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="my_modal_2" className="modal">
                <form method="post" className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg">เพิ่มข้อมูล พ.ร.บ. รถ</h3>
                    <Select
                        text='ประเภทรถ'
                        data={carType}
                        value={form.car_type_id}
                        onChange={(e) => setForm({ ...form, car_type_id: e.target.value })}
                        valueKey='id'
                        labelKey='type'
                    />
                    <TextInput
                        width='w-sm'
                        title='ราคา'
                        name='price'
                        type='number'
                        placeholder='กรอกราคา'
                        onChange={hdlOnChange}
                        value={form.price}
                    />
                    <TextInput
                        width='w-sm'
                        title='รายละเอียด'
                        name='coverage_detail'
                        type='text'
                        placeholder='กรอกรายละเอียด'
                        onChange={hdlOnChange}
                        value={form.coverage_detail}
                    />
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('my_modal_2').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary" onClick={hdlSubmit}>บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default ModalCompul