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
import { readPackageEdit, updatePackage } from '../../service/insurance/PackageInsur';
import { useNavigate, useParams } from 'react-router-dom';
import { listPromotionSelect } from '../../service/insurance/promotion';
import InstallmentSetting from '../../component/payment/InstallmentSetting';

const initialState = {
    package_name: '',
    start_date: '',
    end_date: '',
    repair_type: '',
    is_active: '',
    engine_size: '',
    insurance_company: '',
    insurance_type: '',
    promotion_id: '',
    car_brand_id: [],
    car_model_id: [],
    car_usage_type_id: [],
    compulsory_id: [],
    thirdparty_injury_death_per_person: '',
    thirdparty_injury_death_per_accident: '',
    thirdparty_property: '',
    flood_cover: '',
    car_own_damage_deductible: '',
    car_own_damage: '',
    additional_personal_permanent_driver_cover: '',
    additional_medical_expense_cover: '',
    additional_bail_bond: '',
    additional_personal_permanent_driver_number: '',
    payments: [],
}

const EditPackage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { company, getCompanySelect, typeInsur, getTypeInsurSelect, carbrand, getCarBrandSelect, getCarTypeSelect } = useActionStore();
    const [payment, setPayment] = useState([])
    const [form, setForm] = useState(initialState)
    const [carUsageType, setCarUsageType] = useState([])
    const [compusory, setCompusory] = useState([])
    const [carModel, setCarModel] = useState([])
    const [promotion, setPromotion] = useState([])

    useEffect(() => {
        getCompanySelect();
        getTypeInsurSelect();
        getCarBrandSelect();
        getCarTypeSelect();
        getPayment();
        getCarUsageType();
        getCompulsory();
        fetchPackageDetail();
        getPromotion();
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

    const fetchPackageDetail = async () => {
        try {
            const res = await readPackageEdit(id)
            setForm(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

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

    const getPromotion = async () => {
        try {
            const res = await listPromotionSelect();
            setPromotion(res.data.data)
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

    const handleUpdatePackage = async (e) => {
        e.preventDefault()
        console.log(form)
        try {
            const res = await updatePackage(id, form)
            setForm(initialState)
            toast.success('แก้ไขแพ็กเกจสำเร็จ')
            navigate('/app/package')
        } catch (err) {
            console.log(err)
            toast.error('แก้ไขแพ็กเกจไม่สำเร็จ')
        }
    }

    const selectedCompany = company.find(
        c => String(c.id) === String(form.insurance_company)
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
                title='แก้ไขแพ็กเกจ'
                subtitle='กรุณากรอกข้อมูลให้ครบ'
            />
            <form onSubmit={handleUpdatePackage} className='bg-white rounded-2xl p-5 flex flex-col gap-15 font-prompt text-text-primary'>
                <div>
                    <div className='flex justify-between'>
                        <h1 className='title text-main'>แพ็กเกจ</h1>
                        <button type="submit" className="btn btn-sm btn-neutral px-10">บันทึก</button>
                    </div>
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
                                    value={form.start_date ? new Date(form.start_date).toISOString().split('T')[0] : ''}
                                />
                            </div>
                            <div>
                                <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>ระยะเวลาสิ้นสุด</label>
                                <input
                                    type="date"
                                    className="input"
                                    name='end_date'
                                    onChange={handleOnChange}
                                    value={form.end_date ? new Date(form.end_date).toISOString().split('T')[0] : ''}
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
                                    name='insurance_company'
                                    value={form.insurance_company}
                                    onChange={handleOnChange}
                                    valueKey='id'
                                    labelKey='namecompany'
                                />
                            </div>
                        </div>
                        <Select
                            text='ประเภทประกัน'
                            data={typeInsur}
                            name='insurance_type'
                            value={form.insurance_type}
                            onChange={handleOnChange}
                            valueKey='id'
                            labelKey='nametype'
                        />
                        <Select
                            text='โปรโมชั่น'
                            data={promotion}
                            name='promotion_id'
                            value={form.promotion_id}
                            onChange={handleOnChange}
                            valueKey='id'
                            labelKey='promotion_name'
                        />
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
                                name='thirdparty_injury_death_per_person'
                                title='บาดเจ็บ เสียชีวิต(ต่อคน)'
                                type='number'
                                onChange={handleOnChange}
                                value={form.thirdparty_injury_death_per_person}
                            />
                            <TextInput
                                width='w-full'
                                name='thirdparty_injury_death_per_accident'
                                title='บาดเจ็บ เสียชีวิตสูงสุด(ต่อคร้ัง)'
                                type='number'
                                onChange={handleOnChange}
                                value={form.thirdparty_injury_death_per_accident}
                            />
                            <TextInput
                                width='w-full'
                                name='thirdparty_property'
                                title='ความรับผิดต่อทรัพย์สิน'
                                type='number'
                                onChange={handleOnChange}
                                value={form.thirdparty_property}
                            />
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
                                    name='car_own_damage_deductible'
                                    title='ค่าเสียหายส่วนแรก'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.car_own_damage_deductible}
                                />
                                <TextInput
                                    width='w-full'
                                    name='car_own_damage'
                                    title='ความเสียหายต่อรถยนต์'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.car_own_damage}
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className='font-semibold mb-3'>ความคุ้มครองตามเอกสารแนบท้าย
                            </h2>
                            <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
                                <TextInput
                                    width='w-full'
                                    name='additional_personal_permanent_driver_cover'
                                    title='อุบัติเหตุส่วนบุคคล'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.additional_personal_permanent_driver_cover}
                                />
                                <TextInput
                                    width='w-full'
                                    name='additional_medical_expense_cover'
                                    title='ค่ารักษาพยาบาล'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.additional_medical_expense_cover}
                                />
                                <TextInput
                                    width='w-full'
                                    name='additional_bail_bond'
                                    title='ประกันตัวผู้ขับขี่'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.additional_bail_bond}
                                />
                                <TextInput
                                    width='w-full'
                                    name='additional_personal_permanent_driver_number'
                                    title='จำนวนที่นั่ง'
                                    type='number'
                                    onChange={handleOnChange}
                                    value={form.additional_personal_permanent_driver_number}
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
                                <div className="grid grid-cols-2 gap-3">
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
                                    <TextInput
                                        title="ค่าธรรมเนียม (%)"
                                        type='number'
                                        value={form.payments.find(p => p.payment_method_id === 3)?.charge || ''}
                                        onChange={e => updatePaymentField(3, 'charge', e.target.value)}
                                    />
                                    <div className="col-span-2">
                                        <InstallmentSetting
                                            value={{
                                                min: form.payments.find(p => p.payment_method_id === 3)?.installment_min ?? '',
                                                max: form.payments.find(p => p.payment_method_id === 3)?.installment_max ?? '',
                                            }}
                                            onChange={({ min, max }) => {
                                                updatePaymentField(3, 'installment_min', min)
                                                updatePaymentField(3, 'installment_max', max)
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        {hasPayment(4) && (
                            <>
                                <h2 className="font-semibold">ผ่อนบัตรเครดิต</h2>
                                <div className="grid grid-cols-2 gap-3">
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
                                    <TextInput
                                        title="จำนวนงวด"
                                        type="number"
                                        value={
                                            form.payments.find(p => p.payment_method_id === 4)
                                                ?.installment_min || ''
                                        }
                                        onChange={e =>
                                            updatePaymentField(4, 'installment_min', e.target.value)
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </form >
        </div >
    )
}
export default EditPackage