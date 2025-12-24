import React from 'react'
import Select from '../form/Select'
import TextInput from '../form/TextInput'
import useInsureAuth from '../../store/auth-store'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

const ModalEditCompul = ({ defaultForm, onSuccess, onClose }) => {
    const carType = useInsureAuth((s) => s.cartype)
    const dialogRef = useRef(null)
    const [form, setForm] = useState({
        car_type_id: '',
        price: '',
        coverage_detail: ''
    })

    // 🔥 sync props → state
    useEffect(() => {
        if (defaultForm) {
            setForm(defaultForm)
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
        // console.log('open modal')
    }, [defaultForm])

    const hdlClose = () => {
        dialogRef.current?.close()
        onClose() // เรียก callback เพื่อ clear defaultForm
    }

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // console.log(form)
    return (
        <dialog ref={dialogRef} className="modal font-prompt">
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
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </dialog>
    )
}

export default ModalEditCompul