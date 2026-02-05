import React, { useEffect, useState } from 'react'
import TextInput from '../form/TextInput'
import Select from '../form/Select'
import useActionStore from '../../store/action-store'
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

const ModalPremium = ({ form, onSubmit, onChange }) => {
    const { packageSelect, getPackageSelect } = useActionStore();
    const [premiums, setPremiums] = useState([
        {
            premium_name: '',
            repair_start: '',
            repair_end: '',
            year_start: '',
            year_end: '',
            fire_theft: '',
            total_premium: '',
            net_premium: '',
            sell_price: ''
        }
    ])

    useEffect(() => {
        getPackageSelect();
    }, [])

    const addFormPremium = () => {
        setPremiums(prev => ([
            ...prev,
            {
                premium_name: '',
                repair_start: '',
                repair_end: '',
                year_start: '',
                year_end: '',
                fire_theft: '',
                total_premium: '',
                net_premium: '',
                sell_price: ''
            }
        ]))
    }

    //ลบฟอร์มรายอัน
    // const removeFormPremium = (index) => {
    //     setPremiums(prev => prev.filter((_, i) => i !== index))
    // }

    const removeFormPremium = () => {
        setPremiums(prev => {
            if (prev.length === 1) return prev   // กันไม่ให้ลบจนหมด
            return prev.slice(0, -1)
        })
    }

    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('modalpremium').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="modalpremium" className="modal">
                <form onSubmit={onSubmit} className="modal-box lg:max-w-2xl flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">สร้างข้อมูลเบี้ยประกัน</h3>
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
                    <TextInput
                        width='w-sm'
                        title='ส่วนลด'
                        name='discount'
                        type='text'
                        placeholder='0%'
                        onChange={onChange}
                        value={form.discount}
                    />
                    <div className='flex gap-3'>
                        <button type='button' onClick={addFormPremium} className='btn btn-sm btn-success text-white'><FaCirclePlus /> เพิ่มแบบฟอร์ม </button>
                        <button
                            type="button"
                            onClick={removeFormPremium}
                            className="btn btn-sm btn-error text-white"
                        >
                            <FaCircleMinus /> ลบแบบฟอร์ม
                        </button>
                    </div>
                    <div className='w-full h-px bg-border' />
                    <div className='flex flex-col gap-5 h-60 overflow-y-auto'>
                        {
                            premiums.map((item, idx) => (
                                <div className='w-full rounded-md shadow border border-border/30 text-text-primary'>
                                    <div className='p-3'>
                                        <h2 className='font-semibold text-sm'>แบบฟอร์มสร้างเบี้ยประกันภัย ({idx + 1})</h2>
                                    </div>
                                    <div className='w-full h-px bg-border/30' />
                                    <div className='grid grid-cols-4 gap-3 p-3'>
                                        <p className='font-semibold text-sm'>ชื่อเบี้ยประกัน</p>
                                        <div className='col-span-3'>
                                            <input
                                                type='text'
                                                name='premium_name'
                                                placeholder='กำหนดชื่อเบี้ยประกัน'
                                                onChange={onChange}
                                                value={item.premium_name}
                                                className='input w-full'
                                            />
                                        </div>
                                        <p className='font-semibold text-sm'>ทุนซ่อมเริ่มต้น</p>
                                        <input
                                            type='text'
                                            name='premium_name'
                                            placeholder='ทุนซ่อมเริ่มต้น'
                                            onChange={onChange}
                                            value={item.premium_name}
                                            className='input flex-1'
                                        />
                                        <p className='font-semibold text-sm'>ทุนซ่อมสูงสุด</p>
                                        <input
                                            type='text'
                                            name='premium_name'
                                            placeholder='ทุนซ่อมสูงสุด'
                                            onChange={onChange}
                                            value={item.premium_name}
                                            className='input flex-1'
                                        />
                                        <p className='font-semibold text-sm'>ช่วงปี</p>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type='text'
                                                name='premium_name'
                                                placeholder='เริ่มต้น'
                                                onChange={onChange}
                                                value={item.premium_name}
                                                className='input flex-1'
                                            />
                                            <span className='font-semibold text-xs'>ถึง</span>
                                            <input
                                                type='text'
                                                name='premium_name'
                                                placeholder='สูงสุด'
                                                onChange={onChange}
                                                value={item.premium_name}
                                                className='input flex-1'
                                            />
                                        </div>
                                        <p className='font-semibold text-sm'>สูญหาย ไฟไหม้</p>
                                        <input
                                            type='text'
                                            name='premium_name'
                                            placeholder='ทุนสูญหาย ไฟไหม้'
                                            onChange={onChange}
                                            value={item.premium_name}
                                            className='input flex-1'
                                        />
                                        <div className='col-span-4 my-2 w-full h-px bg-border/30' />
                                        <p className='font-semibold text-sm'>เบี้ยรวม</p>
                                        <input
                                            type='number'
                                            name='premium_name'
                                            placeholder='0.00'
                                            onChange={onChange}
                                            value={item.premium_name}
                                            className='input flex-1'
                                        />
                                        <p className='font-semibold text-sm'>เบี้ยสุทธิ</p>
                                        <input
                                            type='number'
                                            name='premium_name'
                                            placeholder='0.00'
                                            onChange={onChange}
                                            value={item.premium_name}
                                            className='input flex-1'
                                        />
                                        <div className='col-span-4 grid grid-cols-subgrid gap-4'>
                                            <div class="col-start-3"><p className='font-semibold text-sm'>ราคาขาย</p></div>
                                            <div class="col-start-4">
                                                <input
                                                    type='number'
                                                    name='premium_name'
                                                    placeholder='0.00'
                                                    onChange={onChange}
                                                    value={item.premium_name}
                                                    className='input flex-1'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex justify-end gap-3'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('modalpremium').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div >
    )
}

export default ModalPremium