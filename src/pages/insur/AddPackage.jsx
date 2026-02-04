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
import { listCompulPackage } from '../../service/car/Compulsory';
import { listByCarModel } from '../../service/car/CarModel';
import SelectFormModel from '../../component/select/SelectFormModel';
import toast from 'react-hot-toast';
import { createPackage } from '../../service/insurance/PackageInsur';
import { useNavigate } from 'react-router-dom';

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
    car_model_id: [],
    car_usage_type_id: [],
    compulsory_id: [],
    tp_person: '',
    tp_person_accident: '',
    tp_property: '',
    flood_cover: '',
    damage_deductible: '',
    personal_accident: '',
    medical_expense: '',
    bail_bond: '',
    seat_count: '',
    payments: [],
}

const AddPackage = () => {
    const navigate = useNavigate()
    const { company, getCompanySelect, typeInsur, getTypeInsurSelect, carbrand, getCarBrandSelect, getCarTypeSelect } = useActionStore();
    const [payment, setPayment] = useState([])
    const [form, setForm] = useState(initialState)
    const [carUsageType, setCarUsageType] = useState([])
    const [compusory, setCompusory] = useState([])
    const [carModel, setCarModel] = useState([])

    useEffect(() => {
        getCompanySelect();
        getTypeInsurSelect();
        getCarBrandSelect();
        getCarTypeSelect();
        getPayment();
        getCarUsageType();
        getCompulsory();
    }, [])

    useEffect(() => {
        if (form.car_brand_id && form.car_brand_id.length > 0) {
            fetchCarModels()
        } else {
            setCarModel([])
            // reset car_model_id ด้วย
            setForm(prev => ({
                ...prev,
                car_model_id: []
            }))
        }
    }, [form.car_brand_id])

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

    const getCompulsory = async () => {
        try {
            const res = await listCompulPackage();
            setCompusory(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCarModels = async () => {
        try {
            const res = await listByCarModel(form.car_brand_id)
            setCarModel(res.data.data)
        } catch (err) {
            console.log(err)
            setCarModel([])
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmitPackage = async (e) => {
        e.preventDefault()
        console.log(form)
        try {
            const res = await createPackage(form)
            setForm(initialState)
            toast.success('สร้างแพ็กเกจสำเร็จ')
            navigate('/app/package')
        } catch (err) {
            console.log(err)
            toast.error('สร้างแพ็กเกจไม่สำเร็จ')
        }
    }

    const selectedCompany = company.find(
        c => String(c.id) === String(form.insurance_company_id)
    )

    const handlePaymentToggle = (paymentId, checked) => {
        if (checked) {
            // เพิ่ม payment
            setForm(prev => ({
                ...prev,
                payments: [
                    ...prev.payments,
                    {
                        payment_method_id: paymentId,
                        discount_percent: 0,
                        discount_amount: 0,
                        first_payment_amount: null
                    }
                ]
            }))
        } else {
            // เอาออก
            setForm(prev => ({
                ...prev,
                payments: prev.payments.filter(
                    p => p.payment_method_id !== paymentId
                )
            }))
        }
    }

    const updatePaymentField = (id, field, value) => {
        setForm(prev => ({
            ...prev,
            payments: prev.payments.map(p =>
                p.payment_method_id === id
                    ? { ...p, [field]: value }
                    : p
            )
        }))
    }

    const hasPayment = (id) =>
        form.payments.some(p => p.payment_method_id === id)

    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <Title
                title='เพิ่มแพ็กเกจ'
                subtitle='กรุณากรอกข้อมูลให้ครบ'
            />
            <form onSubmit={handleSubmitPackage} className='bg-white rounded-2xl p-5 flex flex-col gap-15 font-prompt text-text-primary'>
                <div>
                    <h1 className='title text-main'>แพ็กเกจ</h1>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='col-span-2'>
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
                        <div className='grid lg:grid-cols-2 gap-3'>
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
                        <div className='grid lg:grid-cols-2 gap-3'>
                            <div>
                                <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>สถานะซ่อม</label>
                                <select
                                    name='repair_type'
                                    value={form.repair_type}
                                    onChange={handleOnChange}
                                    className="select font-prompt"
                                >
                                    <option value="" disabled={true}>กรุณาเลือกสถานะซ่อม</option>
                                    <option value='ซ่อมอู่'>ซ่อมอู่</option>
                                    <option value='ซ่อมห้าง'>ซ่อมห้าง</option>
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
                                    <option value="" disabled={true}>กรุณาเลือกสถานะ</option>
                                    <option value={true}>เปิด</option>
                                    <option value={false}>ปิด</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <TextArea
                                title='เงื่อนไข : เครื่องยนต์ / รถยนต์'
                                name='engine_size'
                                typ='text'
                                value={form.engine_size}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='title text-main'>ประกันภัย</h1>
                    <div className='grid grid-cols-3 gap-3'>
                        <div className='flex gap-5 items-end'>
                            {selectedCompany?.logo_url && (
                                <div className="avatar">
                                    <div className="w-14 rounded">
                                        <img src={selectedCompany.logo_url} className="object-contain" />
                                    </div>
                                </div>
                            )}
                            <div className='flex-1'>
                                <Select
                                    text='ชื่อบริษัท'
                                    data={company}
                                    name='insurance_company_id'
                                    value={form.insurance_company_id}
                                    onChange={handleOnChange}
                                    valueKey='id'
                                    labelKey='namecompany'
                                />
                            </div>
                        </div>
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
                                className="select w-full"
                            >
                                <option value="" disabled={true}>กรุณาเลือกโปรโมชัน</option>
                                <option value='ซื้อ 2 แถม  1'>ซื้อ 2 แถม  1</option>
                                <option value='เคลมไวในชั่วพริบตา'>เคลมไวในชั่วพริบตา</option>
                            </select>
                        </div>
                    </div>
                    <div className='mt-15'>
                        <h1 className='title'>เงื่อนไข</h1>
                        <div className='grid lg:grid-cols-2 gap-5'>
                            <SelectFormBrand
                                data={carbrand}
                                value={form.car_brand_id}
                                onChange={handleOnChange}
                                name="car_brand_id"
                            />
                            <SelectFormModel
                                data={carModel}
                                value={form.car_model_id}
                                onChange={handleOnChange}
                                name="car_model_id"
                            />
                            <SelectFormUsage
                                data={carUsageType}
                                value={form.car_usage_type_id}
                                onChange={handleOnChange}
                                name="car_usage_type_id"
                            />
                            <SelectFormCompulsory
                                data={compusory}
                                value={form.compulsory_id}
                                onChange={handleOnChange}
                                name="compulsory_id"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='title text-center '>ความคุ้มครองกรมธรรณ์</h1>
                    <div className='flex flex-col gap-5'>
                        <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
                            <div className='col-span-2'>
                                <h2 className='font-semibold'>ความรับผิดต่อบุคคลภายนอก</h2>
                            </div>
                            <TextInput
                                width='w-full'
                                name='tp_person'
                                title='บาดเจ็บ เสียชีวิต(ต่อคน)'
                                type='number'
                                onChange={handleOnChange}
                                value={form.tp_person}
                            />
                            <TextInput
                                width='w-full'
                                name='tp_person_accident'
                                title='บาดเจ็บ เสียชีวิตสูงสุด(ต่อคร้ัง)'
                                type='number'
                                onChange={handleOnChange}
                                value={form.tp_person_accident}
                            />
                            <div className='col-span-2'>
                                <TextInput
                                    width='w-full'
                                    name='tp_property'
                                    title='ความรับผิดต่อทรัพย์สิน'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.tp_property}
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className='font-semibold mb-3'>ความรับผิดต่อรถเอาประกันภัย
                            </h2>
                            <div className='grid grid-cols-2 gap-3'>
                                <TextInput
                                    width='w-full'
                                    name='flood_cover'
                                    title='คุ้มครองน้ำท่วม'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.flood_cover}
                                />
                                <TextInput
                                    width='w-full'
                                    name='damage_deductible'
                                    title='ค่าเสียหายส่วนแรก'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.damage_deductible}
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className='font-semibold mb-3'>ความคุ้มครองตามเอกสารแนบท้าย
                            </h2>
                            <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
                                <TextInput
                                    width='w-full'
                                    name='personal_accident'
                                    title='อุบัติเหตุส่วนบุคคล'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.personal_accident}
                                />
                                <TextInput
                                    width='w-full'
                                    name='medical_expense'
                                    title='ค่ารักษาพยาบาล'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.medical_expense}
                                />
                                <TextInput
                                    width='w-full'
                                    name='bail_bond'
                                    title='ประกันตัวผู้ขับขี่'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.bail_bond}
                                />
                                <TextInput
                                    width='w-full'
                                    name='seat_count'
                                    title='จำนวนที่นั่ง'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.seat_count}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='title'>วิธีการชำระเงิน</h1>
                    <div className='grid gap-5'>
                        <div className='grid grid-cols-2 gap-3'>
                            {
                                payment.map((i) => (
                                    <label key={i.id} className='flex items-center gap-3 text-sm'>
                                        <input
                                            type="checkbox"
                                            checked={hasPayment(i.id)}
                                            onChange={e =>
                                                handlePaymentToggle(i.id, e.target.checked)
                                            }
                                        />
                                        {i.name_payment}
                                    </label>
                                ))
                            }
                        </div>
                        {hasPayment(1) && (
                            <>
                                <h2 className="font-semibold">ชำระด้วยเงินสด</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <TextInput
                                        name="discount_percent"
                                        title="ส่วนลดเปอร์เซนต์ ชำระเต็มจำนวน"
                                        type='number'
                                        value={
                                            form.payments.find(p => p.payment_method_id === 1)
                                                ?.discount_percent || ''
                                        }
                                        onChange={e =>
                                            updatePaymentField(1, 'discount_percent', e.target.value)
                                        }
                                    />
                                    <TextInput
                                        name="discount_amount"
                                        title="ส่วนลดจำนวนเงิน ชำระเต็มจำนวน"
                                        type='number'
                                        value={
                                            form.payments.find(p => p.payment_method_id === 1)
                                                ?.discount_amount || ''
                                        }
                                        onChange={e =>
                                            updatePaymentField(1, 'discount_amount', e.target.value)
                                        }
                                    />
                                </div>
                            </>
                        )}
                        {hasPayment(2) && (
                            <>
                                <h2 className="font-semibold">ชำระด้วยบัตรเครดิตครั้งเดียว</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <TextInput
                                        name="discount_percent"
                                        title="ส่วนลดเปอร์เซนต์ ชำระเต็มจำนวน"
                                        type='number'
                                        value={
                                            form.payments.find(p => p.payment_method_id === 2)
                                                ?.discount_percent || ''
                                        }
                                        onChange={e =>
                                            updatePaymentField(2, 'discount_percent', e.target.value)
                                        }
                                    />
                                    <TextInput
                                        name="discount_amount"
                                        title="ส่วนลดจำนวนเงิน ชำระเต็มจำนวน"
                                        type='number'
                                        value={
                                            form.payments.find(p => p.payment_method_id === 2)
                                                ?.discount_amount || ''
                                        }
                                        onChange={e =>
                                            updatePaymentField(2, 'discount_amount', e.target.value)
                                        }
                                    />
                                </div>
                            </>
                        )}
                        {hasPayment(3) && (
                            <>
                                <h2 className="font-semibold">ผ่อนเงินสด</h2>
                                <div className="grid grid-cols-3 gap-3">
                                    <TextInput
                                        title="เงินงวดแรก"
                                        type='number'
                                        value={
                                            form.payments.find(p => p.payment_method_id === 3)
                                                ?.first_payment_amount || ''
                                        }
                                        onChange={e =>
                                            updatePaymentField(3, 'first_payment_amount', e.target.value)
                                        }
                                    />
                                    <TextInput
                                        title="ส่วนลดเปอร์เซนต์ ผ่อน"
                                        type='number'
                                        value={
                                            form.payments.find(p => p.payment_method_id === 3)
                                                ?.discount_percent || ''
                                        }
                                        onChange={e =>
                                            updatePaymentField(3, 'discount_percent', e.target.value)
                                        }
                                    />
                                    <TextInput
                                        title="ส่วนลดจำนวนเงิน ผ่อน"
                                        type='number'
                                        value={
                                            form.payments.find(p => p.payment_method_id === 3)
                                                ?.discount_amount || ''
                                        }
                                        onChange={e =>
                                            updatePaymentField(3, 'discount_amount', e.target.value)
                                        }
                                    />
                                </div>
                            </>
                        )}
                        {hasPayment(4) && (
                            <>
                                <h2 className="font-semibold">ผ่อนบัตรเครดิต</h2>
                                <div className="grid grid-cols-3 gap-3">
                                    <TextInput
                                        title="เงินงวดแรก"
                                        type='number'
                                        value={
                                            form.payments.find(p => p.payment_method_id === 4)
                                                ?.first_payment_amount || ''
                                        }
                                        onChange={e =>
                                            updatePaymentField(4, 'first_payment_amount', e.target.value)
                                        }
                                    />
                                    <TextInput
                                        title="ส่วนลดเปอร์เซนต์ ผ่อน"
                                        type='number'
                                        value={
                                            form.payments.find(p => p.payment_method_id === 4)
                                                ?.discount_percent || ''
                                        }
                                        onChange={e =>
                                            updatePaymentField(4, 'discount_percent', e.target.value)
                                        }
                                    />
                                    <TextInput
                                        title="ส่วนลดจำนวนเงิน ผ่อน"
                                        type='number'
                                        value={
                                            form.payments.find(p => p.payment_method_id === 4)
                                                ?.discount_amount || ''
                                        }
                                        onChange={e =>
                                            updatePaymentField(4, 'discount_amount', e.target.value)
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className='flex justify-end'>
                    <button type="submit" className="btn bg-main px-15 text-white">บันทึก</button>
                </div>
            </form >
        </div >
    )
}
export default AddPackage