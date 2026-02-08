import { useEffect, useState } from "react"
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6"
import Title from "../../component/form/Title"
import toast from "react-hot-toast"
import useActionStore from "../../store/action-store"
import Select from "../../component/form/Select"
import TextInput from "../../component/form/TextInput"
import { createPremium } from "../../service/insurance/PremiumInsur"
import { useNavigate } from "react-router-dom"

const premiumInitial = {
    premium_name: '',
    repair_fund_int: '',
    repair_fund_max: '',
    start_year: '',
    max_year: '',
    car_lost_fire: '',
    total_premium: '',
    net_income: '',
    selling_price: ''
}

const AddPremium = () => {
    const navigate = useNavigate()
    const [form, setFrom] = useState({
        package_id: '',
        premium_discount: '',
        premiums: [premiumInitial]
    })
    const { packageSelect, getPackageSelect } = useActionStore()

    useEffect(() => {
        getPackageSelect();
    }, [])

    const handleOnChange = (index, e) => {
        const { name, value } = e.target

        setFrom(prev => {
            //คัดลอกค่าเดิมของ premium ไว้
            const discount = parseFloat(prev.premium_discount) || 0
            const premiums = [...prev.premiums]
            premiums[index] = {
                ...premiums[index],
                [name]: value
            }

            // คำนวณราคาขายอัตโนมัติ
            if (name === 'total_premium') {
                const premium = parseFloat(premiums[index].total_premium) || 0
                const net_total = premium * 0.9309

                premiums[index].net_income = net_total.toFixed(2)
                premiums[index].selling_price = (premium - (net_total * (discount / 100))).toFixed(2)
            }

            return { ...prev, premiums }
        })
    }

    const handleChangeHead = (e) => {
        const { name, value } = e.target

        setFrom(prev => {
            const updated = {
                ...prev,
                [name]: value
            }

            // ถ้าเปลี่ยน premium_discount ให้คำนวณ selling_price ทุกตัวใหม่
            if (name === 'premium_discount') {
                const discount = parseFloat(value) || 0

                updated.premiums = prev.premiums.map(item => {
                    if (item.total_premium && item.net_income) {
                        const premium = parseFloat(item.total_premium) || 0
                        const netIncome = parseFloat(item.net_income) || 0

                        return {
                            ...item,
                            selling_price: (premium - (netIncome * (discount / 100))).toFixed(2)
                        }
                    }
                    return item
                })
            }

            return updated
        })
    }

    const addFormPremium = () => {
        setFrom(prev => ({
            ...prev,
            premiums: [
                ...prev.premiums,
                { ...premiumInitial } // clone ใหม่ทุกครั้ง
            ]
        }))
    }

    const removeFormPremium = (index) => {
        if (form.premiums.length <= 1) {
            return toast.error('ไม่สามารถลบแบบฟอร์มนี้ได้')
        }

        //เก็บข้อมูลตำแหน่งที่ไม่เท่ากับ index ที่ส่งเข้ามา
        setFrom(prev => ({
            ...prev,
            premiums: prev.premiums.filter((_, i) => i !== index)
        }))
    }

    const handleCreatePremium = async (e) => {
        e.preventDefault()
        if (!form.package_id) {
            return toast.error('กรุณาเลือกแพ็กเกจ')
        }

        const hasEmptyPremiumName = form.premiums.some(
            p => !p.premium_name.trim()
        )

        if (hasEmptyPremiumName) {
            return toast.error('กรุณากรอกชื่อเบี้ยประกันให้ครบทุกฟอร์ม')
        }

        console.log('ข้อมูลพร้อมส่ง', form)

        try {
            const res = await createPremium(form)
            toast.success(res.data.msg)
            navigate('/app/insurpremium')
        } catch (err) {
            console.log(err)
            toast.error('เกิดข้อผิดพลาดไม่สามารถสร้างเบี้ยได้')
        }
    }

    console.log(packageSelect)
    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <Title
                title='สร้างเบี้ยประกัน'
                subtitle='กรุณากรอกข้อมูลให้ครบ'
            />
            <form onSubmit={handleCreatePremium} className="bg-white rounded-2xl p-5 flex flex-col gap-5 font-prompt text-text-primary">
                <div className='flex justify-between'>
                    <h1 className='font-semibold text-lg text-accent'>สร้างข้อมูลเบี้ยประกัน</h1>
                    <button type="submit" className="btn btn-sm btn-neutral px-10">บันทึก</button>
                </div>
                <div className="grid grid-cols-2 gap-3 items-end">
                    <fieldset className="fieldset font-prompt text-text-primary p-0">
                        <legend className="fieldset-legend text-sm text-text-primary">ชื่อแพ็กเกจ</legend>
                        <select
                            name='package_id'
                            onChange={handleChangeHead}
                            className="select w-full"
                            value={form.package_id}
                        >
                            <option value="" disabled={true}>โปรดเลือก</option>
                            {
                                packageSelect.map((i) => (
                                    <option
                                        key={i.id}
                                        value={i.id}
                                    >
                                        {i.package_id} / {i.package_name}
                                    </option>
                                ))
                            }
                        </select>
                    </fieldset>
                    <TextInput
                        width='w-full'
                        title='ส่วนลด'
                        name='premium_discount'
                        type='text'
                        placeholder='0%'
                        onChange={handleChangeHead}
                        value={form.premium_discount}
                    />
                </div>
                <div className='flex gap-3'>
                    <button type='button' onClick={addFormPremium} className='btn btn-sm btn-accent text-white'><FaCirclePlus /> เพิ่มแบบฟอร์ม </button>
                </div>
                <div className='w-full h-px bg-border' />
                <div className='grid lg:grid-cols-2 gap-5'>
                    {
                        form.premiums?.map((item, idx) => (
                            <div key={idx} className='w-full rounded-md shadow border border-border/30 text-text-primary'>
                                <div className='flex justify-between p-3'>
                                    <h2 className='font-semibold text-sm'>แบบฟอร์มสร้างเบี้ยประกันภัย ({idx + 1})</h2>
                                    <button
                                        type="button"
                                        onClick={() => removeFormPremium(idx)}
                                        className="btn btn-sm btn-error text-white"
                                    >
                                        <FaCircleMinus /> ลบแบบฟอร์ม
                                    </button>
                                </div>
                                <div className='w-full h-px bg-border/30' />
                                <div className='grid grid-cols-4 gap-3 p-3'>
                                    <p className='font-semibold text-sm'>ชื่อเบี้ยประกัน</p>
                                    <div className='col-span-3'>
                                        <input
                                            type='text'
                                            name='premium_name'
                                            placeholder='กำหนดชื่อเบี้ยประกัน'
                                            onChange={(e) => handleOnChange(idx, e)}
                                            value={item.premium_name}
                                            className='input w-full'
                                        />
                                    </div>
                                    <p className='font-semibold text-sm'>ทุนซ่อมเริ่มต้น</p>
                                    <input
                                        type='text'
                                        name='repair_fund_int'
                                        placeholder='ทุนซ่อมเริ่มต้น'
                                        onChange={(e) => handleOnChange(idx, e)}
                                        value={item.repair_fund_int}
                                        className='input flex-1'
                                    />
                                    <p className='font-semibold text-sm'>ทุนซ่อมสูงสุด</p>
                                    <input
                                        type='text'
                                        name='repair_fund_max'
                                        placeholder='ทุนซ่อมสูงสุด'
                                        onChange={(e) => handleOnChange(idx, e)}
                                        value={item.repair_fund_max}
                                        className='input flex-1'
                                    />
                                    <p className='font-semibold text-sm'>ช่วงปี</p>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type='text'
                                            name='start_year'
                                            placeholder='เริ่มต้น'
                                            onChange={(e) => handleOnChange(idx, e)}
                                            value={item.start_year}
                                            className='input flex-1'
                                        />
                                        <span className='font-semibold text-xs'>ถึง</span>
                                        <input
                                            type='text'
                                            name='max_year'
                                            placeholder='สูงสุด'
                                            onChange={(e) => handleOnChange(idx, e)}
                                            value={item.max_year}
                                            className='input flex-1'
                                        />
                                    </div>
                                    <p className='font-semibold text-sm'>สูญหาย ไฟไหม้</p>
                                    <input
                                        type='text'
                                        name='car_lost_fire'
                                        placeholder='ทุนสูญหาย ไฟไหม้'
                                        onChange={(e) => handleOnChange(idx, e)}
                                        value={item.car_lost_fire}
                                        className='input flex-1'
                                    />
                                    <div className='col-span-4 my-2 w-full h-px bg-border/30' />
                                    <p className='font-semibold text-sm'>เบี้ยรวม</p>
                                    <input
                                        type='number'
                                        name='total_premium'
                                        placeholder='0.00'
                                        onChange={(e) => handleOnChange(idx, e)}
                                        value={item.total_premium}
                                        className='input flex-1'
                                    />
                                    <p className='font-semibold text-sm'>เบี้ยสุทธิ</p>
                                    <input
                                        type='number'
                                        name='net_income'
                                        placeholder='0.00'
                                        onChange={(e) => handleOnChange(idx, e)}
                                        value={item.net_income}
                                        className='input flex-1'
                                    />
                                    <div className='col-span-4 grid grid-cols-subgrid gap-4'>
                                        <div className="col-start-3"><p className='font-semibold text-sm'>ราคาขาย</p></div>
                                        <div className="col-start-4">
                                            <input
                                                type='number'
                                                name='selling_price'
                                                placeholder='0.00'
                                                value={item.selling_price || 0}
                                                className='input flex-1'
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </form>
        </div >
    )
}
export default AddPremium