import Title from '../../component/form/Title'
import TextInput from '../../component/form/TextInput'
import TextArea from '../../component/form/TextArea'
import useActionStore from '../../store/action-store';
import Select from '../../component/form/Select';
import { useEffect, useState } from 'react';
import SelectSearch from '../../component/form/SelectSearch';
import { listPayment } from '../../service/payment';
import { useSearchParams } from 'react-router-dom';

const initialState = {
    package_name: '',
    start_date: '',
    end_date: '',
    repair_type: '',
    is_active: '',
    engine_size: '',
    insurance_company_id: '',
    insurance_type_id: '',
    promotion: '',
    car_brand_id: '',
    car_model_id: '',
    car_type_id: '',
    car_sub_type: '',
    tp_person: '',
    tp_person_accident: '',
    tp_property: '',
    flood_cover: '',
    damage_deductible: '',
    personal_accident: '',
    medical_expense: '',
    bail_bond: '',
    discount_percent: '',
    discount_amount: '',
    payment_id: '',
}

const AddPackage = () => {
    const { company, getCompanySelect, typeInsur, getTypeInsurSelect, carbrand, getCarBrandSelect, cartype, getCarTypeSelect, carmodel, getCarModelSelect } = useActionStore();
    const [payment, setPayment] = useState([])
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        getCompanySelect();
        getTypeInsurSelect();
        getCarBrandSelect();
        getCarTypeSelect();
        getPayment();
    }, [])

    const getPayment = async () => {
        try {
            const res = await listPayment()
            setPayment(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSelectChange = async (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'car_brand_id' && { car_model_id: '' })
        }))

        if (name === 'car_brand_id') {
            await getCarModelSelect(value)
        }
    }

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <Title
                title='เพิ่มแพ็กเกจ'
                subtitle='กรุณากรอกข้อมูลให้ครบ'
            />
            <form className='grid grid-cols-2 gap-3 font-prompt text-text-primary'>
                <div className='bg-white rounded-2xl p-5 flex flex-col gap-5'>
                    <div>
                        <h1 className='title'>แพ็กเกจ</h1>
                        <div className='grid gap-3'>
                            <div>
                                <TextInput
                                    width='w-full'
                                    name='package_name'
                                    title='ชื่อแพ็กเกจ'
                                    type='text'
                                    placeholder='กรอกชื่อแพ็กเกจ...'
                                //   onChange
                                //   value
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-3'>
                                <div>
                                    <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>ระยะเวลาเริ่มต้น</label>
                                    <input type="date" className="input" />
                                </div>
                                <div>
                                    <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>ระยะเวลาสิ้นสุด</label>
                                    <input type="date" className="input" />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-3'>
                                <div>
                                    <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>สถานะซ่อม</label>
                                    <select defaultValue="กรุณาเลือกสถานะซ่อม" className="select font-prompt">
                                        <option disabled={true}>กรุณาเลือกสถานะซ่อม</option>
                                        <option value='ซ่อมอู่'>ซ่อมอู่</option>
                                        <option value='อู่ประกัน'>อู่ประกัน</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>สถานะ</label>
                                    <select defaultValue={true} className="select font-prompt">
                                        <option value={true}>เปิด</option>
                                        <option value={false}>ปิด</option>
                                    </select>
                                </div>
                            </div>
                            <TextArea
                                title='เงื่อนไข : เครื่องยนต์ / รถยนต์'
                                name='engine_size'
                                typ='text'
                            // onChange
                            // value
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className='title'>ประกันภัย</h1>
                        <div className='grid gap-3'>
                            <Select
                                text='ชื่อบริษัท'
                                data={company}
                                name='company_id'
                                // value={form.company_id}
                                // onChange={onChange}
                                valueKey='id'
                                labelKey='namecompany'
                            />
                            <div className='grid grid-cols-2 items-center gap-3'>
                                <Select
                                    text='ประเภทประกัน'
                                    data={typeInsur}
                                    name='insur_type_id'
                                    // value={form.insur_type_id}
                                    // onChange={onChange}
                                    valueKey='id'
                                    labelKey='nametype'
                                />
                                <div className='font-prompt'>
                                    <legend className="fieldset-legend text-text-primary  text-sm ">โปรโมชัน</legend>
                                    <select defaultValue="กรุณาเลือกสถานะซ่อม" className="select">
                                        <option disabled={true}>กรุณาเลือกโปรโมชัน</option>
                                        <option value='ซ่อมอู่'>ซ่อมอู่</option>
                                        <option value='อู่ประกัน'>อู่ประกัน</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className='title'>เงื่อนไข</h1>
                        <div className='grid gap-3'>
                            <div className='grid grid-cols-2 items-end gap-3'>
                                <SelectSearch
                                    options={carbrand}
                                    placeholder="ยี่ห้อรถยนต์"
                                // value={form.car_brand_id}
                                // onChange={(value) => onChangeSelect('car_brand_id', value)}
                                />
                                <Select
                                    text='รุ่นรถยนต์'
                                    data={carmodel}
                                    name='car_model_id'
                                    // value={form.car_model_id || null}
                                    // onChange={onChange}
                                    valueKey='id'
                                    labelKey='name'
                                />
                            </div>
                            <div className='grid grid-cols-2 items-end gap-3'>
                                <Select
                                    text='ประเภทรถยนต์'
                                    data={cartype}
                                    // value={value.car_type_id}
                                    name='car_type_id'
                                    // onChange={onChange}
                                    valueKey='id'
                                    labelKey='type'
                                />
                                <div className='font-prompt'>
                                    <legend className="fieldset-legend text-text-primary  text-sm ">ขนาดเครื่องยนต์</legend>
                                    <select defaultValue="กรุณาเลือกสถานะซ่อม" className="select">
                                        <option disabled={true}>กรุณาเลือก</option>
                                        <option value='ซ่อมอู่'>ไม่เกิน 75 cc (610A)</option>
                                        <option value='ซ่อมอู่'>ไม่เกิน 75 cc ถึง 125 cc (610B)</option>
                                        <option value='ซ่อมอู่'>ไม่เกิน 125 cc ถึง 150 cc (610C)</option>
                                        <option value='ซ่อมอู่'>เกิน 150 cc (610D)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-2xl p-5 flex flex-col gap-5'>
                    <div>
                        <h1 className='title'>ความรับผิดต่อบุคคลภายนอก</h1>
                        <div className='grid grid-cols-2 gap-3'>
                            <TextInput
                                width='w-full'
                                name='package_name'
                                title='บาดเจ็บ เสียชีวิต(ต่อคน)'
                                type='text'
                            //   onChange
                            //   value
                            />
                            <TextInput
                                width='w-full'
                                name='package_name'
                                title='บาดเจ็บ เสียชีวิตสูงสุด(ต่อคร้ัง)'
                                type='text'
                            //   onChange
                            //   value
                            />
                            <div className='col-span-2'>
                                <TextInput
                                    width='w-full'
                                    name='package_name'
                                    title='ความรับผิดต่อทรัพย์สิน'
                                    type='text'
                                //   onChange
                                //   value
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className='title'>ความรับผิดต่อรถเอาประกันภัย
                        </h1>
                        <div className='grid grid-cols-2 gap-3'>
                            <TextInput
                                width='w-full'
                                name='package_name'
                                title='คุ้มครองน้ำท่วม'
                                type='text'
                            //   onChange
                            //   value
                            />
                            <TextInput
                                width='w-full'
                                name='package_name'
                                title='ค่าเสียหายส่วนแรก'
                                type='text'
                            //   onChange
                            //   value
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className='title'>ความคุ้มครองตามเอกสารแนบท้าย
                        </h1>
                        <div className='grid grid-cols-2 gap-3'>
                            <TextInput
                                width='w-full'
                                name='package_name'
                                title='อุบัติเหตุส่วนบุคคล'
                                type='text'
                            //   onChange
                            //   value
                            />
                            <TextInput
                                width='w-full'
                                name='package_name'
                                title='ค่ารักษาพยาบาล'
                                type='text'
                            //   onChange
                            //   value
                            />
                            <TextInput
                                width='w-full'
                                name='package_name'
                                title='ประกันตัวผู้ขับขี่'
                                type='text'
                            //   onChange
                            //   value
                            />
                            <TextInput
                                width='w-full'
                                name='package_name'
                                title='จำนวนที่นั่ง'
                                type='text'
                            //   onChange
                            //   value
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className='title'>วิธีการชำระเงิน
                        </h1>
                        <div className='grid grid-cols-2 gap-3'>
                            {
                                payment.map((i) => (
                                    <label key={i.id} className='flex items-center gap-3 text-sm'>
                                        <input type="checkbox" name="subscribe" value={i.id} />
                                        {i.name_payment}
                                    </label>
                                ))
                            }
                            <TextInput
                                width='w-full'
                                name='package_name'
                                title='ส่วนลดเปอร์เซนต์ ชำระเต็มจำนวน'
                                type='text'
                                placeholder='ส่วนลด %'
                            //   onChange
                            //   value
                            />
                            <TextInput
                                width='w-full'
                                name='package_name'
                                title='ส่วนลดจำนวนเงิน ชำระเต็มจำนวน'
                                type='text'
                                placeholder='ส่วนลดจำนวนเงิน'
                            //   onChange
                            //   value
                            />
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button type="submit" className="btn bg-main px-15 text-white">บันทึก</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AddPackage