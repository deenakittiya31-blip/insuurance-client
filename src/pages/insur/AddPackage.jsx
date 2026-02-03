import Title from '../../component/form/Title'
import TextInput from '../../component/form/TextInput'
import TextArea from '../../component/form/TextArea'
import useActionStore from '../../store/action-store';
import Select from '../../component/form/Select';
import { useEffect, useState } from 'react';
import { listPayment } from '../../service/payment';
import SelectFormBrand from '../../component/select/SelectFormBrand';
import SelectFormUsage from '../../component/select/SelectFormUsage';
import { listUsageTypeSelect } from '../../service/car/CarUsage';
import SelectFormCompulsory from '../../component/select/SelectFormCompulsory';

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
    car_brand_id: [],
    car_model_id: '',
    car_type_id: '',
    compulsory_id: '',
    tp_person: '',
    tp_person_accident: '',
    tp_property: '',
    flood_cover: '',
    damage_deductible: '',
    personal_accident: '',
    medical_expense: '',
    bail_bond: '',
    seat_count: '',
    discount_percent: '',
    discount_amount: '',
    payment_id: '',
}

const AddPackage = () => {
    const { company, getCompanySelect, typeInsur, getTypeInsurSelect, carbrand, getCarBrandSelect, getCarTypeSelect, getCarModelSelect } = useActionStore();
    const [payment, setPayment] = useState([])
    const [form, setForm] = useState(initialState)
    const [carUsageType, setCarUsageType] = useState([])

    useEffect(() => {
        getCompanySelect();
        getTypeInsurSelect();
        getCarBrandSelect();
        getCarTypeSelect();
        getPayment();
        getCarUsageType();
    }, [])

    const getPayment = async () => {
        try {
            const res = await listPayment()
            setPayment(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getCarUsageType = async () => {
        try {
            const res = await listUsageTypeSelect();
            setCarUsageType(res.data.data)
        } catch (error) {
            console.log(error)
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
            <form className='bg-white rounded-2xl p-5 flex flex-col gap-5 font-prompt text-text-primary'>
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
                                onChange={handleOnChange}
                                value={form.package_name}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>ระยะเวลาเริ่มต้น</label>
                                <input
                                    type="date"
                                    className="input"
                                    name='start_date'
                                    onChange={handleOnChange}
                                    value={form.start_date}
                                />
                            </div>
                            <div>
                                <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>ระยะเวลาสิ้นสุด</label>
                                <input
                                    type="date"
                                    className="input"
                                    name='end_date'
                                    onChange={handleOnChange}
                                    value={form.end_date}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>สถานะซ่อม</label>
                                <select
                                    name='repair_type'
                                    value={form.repair_type}
                                    onChange={handleOnChange}
                                    className="select font-prompt"
                                >
                                    <option disabled={true}>กรุณาเลือกสถานะซ่อม</option>
                                    <option value='ซ่อมอู่'>ซ่อมอู่</option>
                                    <option value='อู่ประกัน'>อู่ประกัน</option>
                                </select>
                            </div>
                            <div>
                                <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>สถานะ</label>
                                <select
                                    name='is_active'
                                    value={form.is_active}
                                    onChange={handleOnChange}
                                    className="select font-prompt"
                                >
                                    <option value={true}>เปิด</option>
                                    <option value={false}>ปิด</option>
                                </select>
                            </div>
                        </div>
                        <TextArea
                            title='เงื่อนไข : เครื่องยนต์ / รถยนต์'
                            name='engine_size'
                            typ='text'
                            value={form.engine_size}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
                <div>
                    <h1 className='title'>ประกันภัย</h1>
                    <div className='grid gap-3'>
                        <Select
                            text='ชื่อบริษัท'
                            data={company}
                            name='insurance_company_id'
                            value={form.insurance_company_id}
                            onChange={handleOnChange}
                            valueKey='id'
                            labelKey='namecompany'
                        />
                        <div className='grid grid-cols-2 items-center gap-3'>
                            <Select
                                text='ประเภทประกัน'
                                data={typeInsur}
                                name='insurance_type_id'
                                value={form.insurance_type_id}
                                onChange={handleOnChange}
                                valueKey='id'
                                labelKey='nametype'
                            />
                            <div className='font-prompt'>
                                <legend className="fieldset-legend text-text-primary  text-sm ">โปรโมชัน</legend>
                                <select
                                    name='promotion'
                                    value={form.promotion}
                                    onChange={handleOnChange}
                                    className="select"
                                >
                                    <option disabled={true}>กรุณาเลือกโปรโมชัน</option>
                                    <option value='ซื้อ 2 แถม  1'>ซื้อ 2 แถม  1</option>
                                    <option value='เคลมไวในชั่วพริบตา'>เคลมไวในชั่วพริบตา</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h1 className='title'>เงื่อนไข</h1>
                        <div className='grid lg:grid-cols-2 gap-5'>
                            <SelectFormBrand
                                data={carbrand}
                                value={form.car_brand_id}
                                onChange={handleOnChange}
                                name="car_brand_id"
                            />
                            <SelectFormUsage
                                data={carUsageType}
                                value={form.car_type_id}
                                onChange={handleOnChange}
                                name="car_type_id"
                            />
                            <SelectFormCompulsory
                                data={carUsageType}
                                value={form.compulsory_id}
                                onChange={handleOnChange}
                                name="compulsory_id"
                            />

                            {/* <Select
                                text='รุ่นรถยนต์'
                                data={carmodel}
                                name='car_model_id'
                                value={form.car_model_id || null}
                                onChange={handleOnChange}
                                valueKey='id'
                                labelKey='name'
                            />*/}
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='title'>ความรับผิดต่อบุคคลภายนอก</h1>
                    <div className='grid grid-cols-2 gap-3'>
                        <TextInput
                            width='w-full'
                            name='tp_person'
                            title='บาดเจ็บ เสียชีวิต(ต่อคน)'
                            type='text'
                            onChange={handleOnChange}
                            value={form.tp_person}
                        />
                        <TextInput
                            width='w-full'
                            name='tp_person_accident'
                            title='บาดเจ็บ เสียชีวิตสูงสุด(ต่อคร้ัง)'
                            type='text'
                            onChange={handleOnChange}
                            value={form.tp_person_accident}
                        />
                        <div className='col-span-2'>
                            <TextInput
                                width='w-full'
                                name='tp_property'
                                title='ความรับผิดต่อทรัพย์สิน'
                                type='text'
                                onChange={handleOnChange}
                                value={form.tp_property}
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
                            name='flood_cover'
                            title='คุ้มครองน้ำท่วม'
                            type='text'
                            onChange={handleOnChange}
                            value={form.flood_cover}
                        />
                        <TextInput
                            width='w-full'
                            name='damage_deductible'
                            title='ค่าเสียหายส่วนแรก'
                            type='text'
                            onChange={handleOnChange}
                            value={form.damage_deductible}
                        />
                    </div>
                </div>
                <div>
                    <h1 className='title'>ความคุ้มครองตามเอกสารแนบท้าย
                    </h1>
                    <div className='grid grid-cols-2 gap-3'>
                        <TextInput
                            width='w-full'
                            name='personal_accident'
                            title='อุบัติเหตุส่วนบุคคล'
                            type='text'
                            onChange={handleOnChange}
                            value={form.personal_accident}
                        />
                        <TextInput
                            width='w-full'
                            name='medical_expense'
                            title='ค่ารักษาพยาบาล'
                            type='text'
                            onChange={handleOnChange}
                            value={form.medical_expense}
                        />
                        <TextInput
                            width='w-full'
                            name='bail_bond'
                            title='ประกันตัวผู้ขับขี่'
                            type='text'
                            onChange={handleOnChange}
                            value={form.bail_bond}
                        />
                        <TextInput
                            width='w-full'
                            name='seat_count'
                            title='จำนวนที่นั่ง'
                            type='text'
                            onChange={handleOnChange}
                            value={form.seat_count}
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
                                    <input
                                        type="checkbox"
                                        name="payment_id"
                                        onChange={handleOnChange}
                                        value={i.id} />
                                    {i.name_payment}
                                </label>
                            ))
                        }
                        <TextInput
                            width='w-full'
                            name='discount_percent'
                            title='ส่วนลดเปอร์เซนต์ ชำระเต็มจำนวน'
                            type='text'
                            placeholder='ส่วนลด %'
                            onChange={handleOnChange}
                            value={form.discount_percent}
                        />
                        <TextInput
                            width='w-full'
                            name='discount_amount'
                            title='ส่วนลดจำนวนเงิน ชำระเต็มจำนวน'
                            type='text'
                            placeholder='ส่วนลดจำนวนเงิน'
                            onChange={handleOnChange}
                            value={form.discount_amount}
                        />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <button type="submit" className="btn bg-main px-15 text-white">บันทึก</button>
                </div>
            </form>
        </div>
    )
}
export default AddPackage