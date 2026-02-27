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
import GroupLevelDiscount from '../../component/addpackage/GroupLevelDiscount';
import { listSelectGroup } from '../../service/member/group_member';
import PackageInfoSection from '../../component/addpackage/PackageInfoSection';
import InsuranceInfoSection from '../../component/addpackage/InsuranceInfoSection ';
import CarConditionSection from '../../component/addpackage/CarConditionSection';
import CoverageSection from '../../component/addpackage/CoverageSection';
import PaymentSection from '../../component/addpackage/PaymentSection';

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
    const [group, setGroup] = useState([])

    useEffect(() => {
        const init = async () => {
            getCompanySelect();
            getTypeInsurSelect();
            getCarBrandSelect();
            getCarTypeSelect();
            getPayment();
            getCarUsageType();
            getCompulsory();
            getPromotion();

            // รอให้ได้ข้อมูลทั้งสองก่อนค่อย merge
            const [packageRes, groupRes] = await Promise.all([
                readPackageEdit(id),
                listSelectGroup()
            ])

            setGroup(groupRes.data.data)

            const packageGroups = packageRes.data.data.groups // [] หรือมีข้อมูล
            setForm({
                ...packageRes.data.data,
                groups: groupRes.data.data.map(g => {
                    const existing = packageGroups.find(pg => pg.group_code === g.group_code)
                    return {
                        group_code: g.group_code,
                        discount_percent: existing?.discount_percent || 0
                    }
                })
            })
        }

        init()
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

    // const fetchPackageDetail = async () => {
    //     try {
    //         const res = await readPackageEdit(id)
    //         setForm(res.data.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    console.log(form)

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

    // const getGroup = async () => {
    //     try {
    //         const res = await listSelectGroup()
    //         const allGroups = res.data.data
    //         setGroup(allGroups)

    //         setForm(prev => ({
    //             ...prev,
    //             groups: allGroups.map(g => {
    //                 // หาว่า package นี้มีส่วนลดของ group นี้ไหม
    //                 const existing = res.data.data.find(pg => pg.group_id === g.id)
    //                 return {
    //                     group_id: g.id,
    //                     discount_percent: existing?.discount_percent || 0
    //                 }
    //             })
    //         }))
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

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
                title='แก้ไขแพ็กเกจ'
                subtitle='กรุณากรอกข้อมูลให้ครบ'
            />
            <form onSubmit={handleUpdatePackage} className='bg-white rounded-2xl p-5 flex flex-col gap-15 font-prompt text-text-primary'>
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
export default EditPackage