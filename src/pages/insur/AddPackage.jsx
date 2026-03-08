import Title from '../../component/form/Title'
import useActionStore from '../../store/action-store';
import { useEffect, useState } from 'react';
import { listPayment } from '../../service/payment';
import { listUsageTypeSelect } from '../../service/car/CarUsage';
import { listCompulPackage } from '../../service/car/Compulsory';
import { listByCarModel } from '../../service/car/CarModel';
import toast from 'react-hot-toast';
import { createPackage } from '../../service/insurance/PackageInsur';
import { useNavigate } from 'react-router-dom';
import { listPromotionSelect } from '../../service/insurance/promotion';
import PaymentSection from '../../component/addpackage/PaymentSection';
import CoverageSection from '../../component/addpackage/CoverageSection'
import CarConditionSection from '../../component/addpackage/CarConditionSection'
import PackageInfoSection from '../../component/addpackage/PackageInfoSection'
import InsuranceInfoSection from '../../component/addpackage/InsuranceInfoSection ';
import { listSelectGroup } from '../../service/member/group_member';
import GroupLevelDiscount from '../../component/addpackage/GroupLevelDiscount';
import { listGroupCreditSelect } from '../../service/bank/bankandcardsevice';

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
    groups: []
}

const AddPackage = () => {
    const navigate = useNavigate()
    const { company, getCompanySelect, typeInsur, getTypeInsurSelect, carbrand, getCarBrandSelect, getCarTypeSelect } = useActionStore();
    const [payment, setPayment] = useState([])
    const [form, setForm] = useState(initialState)
    const [carUsageType, setCarUsageType] = useState([])
    const [compusory, setCompusory] = useState([])
    const [carModel, setCarModel] = useState([])
    const [promotion, setPromotion] = useState([])
    const [group, setGroup] = useState([])
    const [creditGroups, setCreditGroups] = useState([])

    useEffect(() => {
        getCompanySelect();
        getTypeInsurSelect();
        getCarBrandSelect();
        getCarTypeSelect();
        getPayment();
        getCarUsageType();
        getCompulsory();
        getPromotion();
        getGroup();
        getCreditGroups();
    }, [])

    useEffect(() => {
        if (form.car_brand_id && form.car_brand_id.length > 0) {
            getCarModels()
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

    const getCreditGroups = async () => {
        try {
            const res = await listGroupCreditSelect()
            setCreditGroups(res.data.data)
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

    const getPromotion = async () => {
        try {
            const res = await listPromotionSelect();
            setPromotion(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCarModels = async () => {
        try {
            const res = await listByCarModel(form.car_brand_id)
            setCarModel(res.data.data)
        } catch (err) {
            console.log(err)
            setCarModel([])
        }
    }

    const getGroup = async () => {
        try {
            const res = await listSelectGroup()
            setGroup(res.data.data)

            setForm(prev => ({
                ...prev,
                groups: res.data.data.map(g => ({
                    group_code: g.group_code, // เช็ค field ให้ตรงกับที่ GroupLevelDiscount ใช้
                    discount_percent: 0
                }))
            }))
        } catch (err) {
            console.log(err)
            setCarModel([])
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setForm(prev => {
            const updated = {
                ...prev,
                [name]: value
            }

            // ถ้าเปลี่ยน start_date ให้คำนวณ end_date อัตโนมัติ
            if (name === 'start_date' && value) {
                const startDate = new Date(value)
                const endDate = new Date(startDate)
                endDate.setFullYear(endDate.getFullYear() + 1)

                // แปลงเป็นรูปแบบ YYYY-MM-DD
                updated.end_date = endDate.toISOString().split('T')[0]
            }

            return updated
        })
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
                        first_payment_amount: null,
                        credit_group_id: null
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

    const updateGroupField = (code, field, value) => {
        setForm(prev => ({
            ...prev,
            groups: prev.groups.map(g =>
                g.group_code === code
                    ? { ...g, [field]: value }
                    : g
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
                <PackageInfoSection
                    form={form}
                    onChange={handleOnChange}
                />
                <div>
                    <InsuranceInfoSection
                        form={form}
                        onChange={handleOnChange}
                        selectedCompany={selectedCompany}
                        promotion={promotion}
                        company={company}
                        typeInsur={typeInsur}
                    />
                    <CarConditionSection
                        form={form}
                        onChange={handleOnChange}
                        compusory={compusory}
                        carUsageType={carUsageType}
                        carModel={carModel}
                        carbrand={carbrand}
                    />
                </div>
                <CoverageSection
                    form={form}
                    onChange={handleOnChange}
                />
                <PaymentSection
                    payment={payment}
                    payments={form.payments}
                    onToggle={handlePaymentToggle}
                    onUpdate={updatePaymentField}
                    hasPayment={hasPayment}
                    creditGroups={creditGroups}
                />
                <GroupLevelDiscount
                    group={group}
                    form={form}
                    onUpdate={updateGroupField}
                    groups={form.groups}
                />
            </form >
        </div >
    )
}
export default AddPackage