import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Title from "../../component/form/Title"
import { listByCarModel } from "../../service/car/CarModel";
import useActionStore from "../../store/action-store";
import { listCarYearSelect } from "../../service/car/CarYear";
import Select from "../../component/form/Select";
import SelectSearch from "../../component/form/SelectSearch";
import SelectPerPage from "../../component/form/SelectPerPage";
import SearchBox from "../../component/quotation_about/SearchBox";
import TableSelectPremium from "../../component/table/TableSelectPremium"
import toast from "react-hot-toast";
import { createPremiumToCompare, searchPremiumToCompare } from "../../service/insurance/PremiumInsur";
import TextInput from "../../component/form/TextInput";
import CardPremium from "../../component/card/CardPremium";
import useInsureAuth from "../../store/auth-store";

const initialStateSearch = {
    insurance_type_id: '',
    car_type_id: '',
    car_usage_id: ''
}

const initialStateCompare = {
    to_name: '',
    details: '',
    car_brand_id: '',
    car_model_id: '',
    car_year_id: '',
    car_usage_id: '',
    sub_car_model: ''
}

const SearchPremium = () => {
    const user = useInsureAuth((s) => s.user)
    const { typeInsur, getTypeInsurSelect, carbrand, getCarBrandSelect, carUsage, getCarUsageSelect, cartype, getCarTypeSelect } = useActionStore()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [year, setYear] = useState([])
    const [carModel, setCarModel] = useState([])
    const [search, setSearch] = useState(initialStateSearch)
    const [compare, setCompare] = useState(initialStateCompare)
    const [premiumSelected, setPremiumSelected] = useState([])
    const [premiumData, setPremiumData] = useState([])

    useEffect(() => {
        getTypeInsurSelect();
        getCarBrandSelect();
        getCarUsageSelect();
        getCarTypeSelect();
        getCarYear();
    }, [])

    const fetchCarModels = async (brandId) => {
        try {
            const res = await listByCarModel(brandId)
            setCarModel(res.data.data)
        } catch (err) {
            console.log(err)
            setCarModel([])
        }
    }

    const getCarYear = async () => {
        try {
            const res = await listCarYearSelect();
            setYear(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleOnChangeCompare = (e) => {
        const { name, value } = e.target

        setCompare(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleOnChangeSearch = (e) => {
        const { name, value } = e.target

        setSearch(prev => ({
            ...prev,
            [name]: Number(value)
        }))

        if (name === 'car_usage_id' && value) {
            setCompare(prev => ({
                ...prev,
                car_usage_id: Number(value)
            }))
        }
    }

    const hdlSelectChange = async (value) => {
        setCompare(prev => ({
            ...prev,
            car_brand_id: value,
            car_model_id: ''
        }))

        if (value) {
            await fetchCarModels(value) // ส่ง value ไปเลย ไม่ใช้จาก state
        } else {
            setCarModel([]) // ถ้า clear ให้เคลียร์ car_model ด้วย
        }
    }

    console.log(compare)
    // console.log(search)

    const handleSubmitSearch = async (e) => {
        e.preventDefault()

        try {
            const res = await searchPremiumToCompare(search)
            setPremiumData(res.data.data)
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message)
            setPremiumData([])
        }
    }

    const handleClearSearch = () => {
        setSearch(initialStateSearch)
        setPremiumData([])
    }

    const handleOpenFormKeyIn = () => {
        navigate('/app/quotationlist')
        document.getElementById('modalcomparekeyin').showModal()
    }

    const addPremiumToState = (e) => {
        const indexPremium = parseInt(e.target.value)

        setPremiumSelected((prev) => {
            //ตรวจสอบว่ามีอยู่แล้วหรือไม่
            const isExist = prev.some(item => item.index_premium === indexPremium)

            if (isExist) {
                //ถ้ามีลบออก
                return prev.filter(item => item.index_premium !== indexPremium)
            } else {
                //ตรวจสอบจำนวนก่อนเพิ่ม
                if (prev.length >= 3) {
                    toast.error('เลือกได้สูงสุด 3 รายการเท่านั้น')
                    return prev
                }

                //ถ้ายังไม่มีให้เพิ่มเข้าไป
                //หาจาก premiumData
                const selectedPremium = premiumData.find(item => item.index_premium === indexPremium)

                return [...prev, selectedPremium]
            }
        })
    }

    // ฟังก์ชันตรวจสอบว่า checkbox ถูกเลือกหรือไม่
    const isChecked = (indexPremium) => {
        return premiumSelected.some(item => item.index_premium === indexPremium)
    }

    //ลบออกจาก state
    const deletePremiuminState = (indexPremium) => {
        setPremiumSelected(prev => prev.filter(item => item.index_premium !== indexPremium))
    }

    const handleCreateQuotation = async (e) => {
        e.preventDefault()
        if (!compare.to_name || !compare.car_brand_id || !compare.car_model_id || !compare.car_usage_id) {
            return toast.error('กรุณากรอกข้อมูลด้านบนให้ครบ')
        }

        if (premiumSelected.length < 3) {
            return toast.error('กรุณาเลือกแพ็กเกจให้ครบ 3 รายการ')
        }

        setLoading(true)

        try {
            const res = await createPremiumToCompare({
                ...compare,
                offer_id: user.user_id,
                import_by: 'package',
                premiums: premiumSelected
            })

            toast.success(res.data.msg)

            setCompare(initialStateCompare)
            setPremiumSelected([])

            navigate('/app/quotationlist')

        } catch (err) {
            console.error('Error:', err)

            const errorMessage = err.response?.data?.message || 'เกิดข้อผิดพลาด'
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col gap-3 h-auto p-5'>
            <Title
                title='ค้นหาเบี้ยประกัน'
            />
            {/* section 1 */}
            <div className="grid auto-rows-[minmax(100px,auto)] gap-3">
                {/* box search */}
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-5 font-prompt text-text-primary">
                    <form className="grid grid-cols-2 gap-3 items-end-safe">
                        <TextInput
                            width='w-auto'
                            title='ถึง'
                            name='to_name'
                            type='text'
                            placeholder='ถึง...'
                            onChange={handleOnChangeCompare}
                            value={compare.to_name}
                        />
                        <TextInput
                            width='w-auto'
                            title='ทะเบียน'
                            name='details'
                            type='text'
                            placeholder='กรอกรายละเอียดทะเบียน...'
                            onChange={handleOnChangeCompare}
                            value={compare.details}
                        />
                        <SelectSearch
                            options={carbrand}
                            placeholder="ยี่ห้อรถยนต์"
                            value={compare.car_brand_id}
                            onChange={hdlSelectChange}
                        />
                        <Select
                            text='รุ่นรถยนต์'
                            data={carModel}
                            name='car_model_id'
                            value={compare.car_model_id}
                            onChange={handleOnChangeCompare}
                            valueKey='id'
                            labelKey='name'
                        />
                        <TextInput
                            width='w-auto'
                            title='รุ่นย่อยรถยนต์'
                            name='sub_car_model'
                            type='text'
                            placeholder='กรอกรายละเอียด'
                            onChange={handleOnChangeCompare}
                            value={compare.sub_car_model || null}
                        />
                        <fieldset className="fieldset font-prompt text-text-primary p-0">
                            <legend className="fieldset-legend text-sm text-text-primary">ปีรถยนต์</legend>
                            <select
                                name='car_year_id'
                                onChange={handleOnChangeCompare}
                                className="select w-full"
                                value={compare.car_year_id}
                            >
                                <option value="" disabled={true}>โปรดเลือก</option>
                                {
                                    year.map((i) => (
                                        <option
                                            key={i.id}
                                            value={i.id}
                                        >
                                            {i.year_be}/{i.year_ad}
                                        </option>
                                    ))
                                }
                            </select>
                        </fieldset>
                    </form>
                    <form onSubmit={handleSubmitSearch} className="grid gap-5">
                        <Select
                            text='ประเภทประกัน'
                            data={typeInsur}
                            name='insurance_type_id'
                            value={search.insurance_type_id}
                            onChange={handleOnChangeSearch}
                            valueKey='id'
                            labelKey='nametype'
                        />
                        <div>
                            <p className="font-semibold text-sm text-text-primary mb-1">ประเภทรถยนต์</p>
                            <div className="flex flex-wrap items-center gap-3">
                                {
                                    cartype.map((i) => (
                                        <label key={i.id} className="font-normal text-sm flex gap-3 items-center">
                                            <input
                                                type="radio"
                                                name='car_type_id'
                                                value={i.id}
                                                onChange={handleOnChangeSearch}
                                                checked={search.car_type_id === i.id}
                                                className="radio radio-xs radio-success" />
                                            {i.type}
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-text-primary mb-1">ประเภทการใช้งาน</p>
                            <div className="flex flex-wrap items-center gap-3">
                                {
                                    carUsage.map((i) => (
                                        <label key={i.id} className="font-normal text-sm flex gap-3 items-center">
                                            <input
                                                type="radio"
                                                name='car_usage_id'
                                                value={i.id}
                                                onChange={handleOnChangeSearch}
                                                checked={search.car_usage_id === i.id}
                                                className="radio radio-xs radio-success" />
                                            {i.usage_name}
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <button type="submit" className="btn btn-info text-white">ค้นหา</button>
                            <button onClick={handleClearSearch} type="button" className="btn btn-warning text-white">ล้างข้อมูล</button>
                            <button onClick={handleOpenFormKeyIn} type="button" className="btn btn-error text-white">แบบฟอร์มปล่าว</button>
                            <Link to='/app/quotationlist'>
                                <button type="button" className="w-full btn btn-success text-white">ใบเสนอราคา</button>
                            </Link>
                            <Link to='/app/pin-compare'>
                                <button type="button" className="w-full btn btn-secondary text-white">ใบเสนอราคาที่ใช้บ่อย</button>
                            </Link>
                        </div>
                    </form >
                </div>
                {/* box selected product */}
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-5 font-prompt text-text-primary">
                    <div className="flex justify-between">
                        <p className="text-sm text-text-primary my-3">จำนวนรายการปัจจุบัน {premiumSelected.length} รายการ</p>
                        <button type="submit" onClick={handleCreateQuotation} className="btn btn-neutral">{loading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                กำลังสร้าง...
                            </>
                        ) : (
                            'สร้างใบเสนอราคา'
                        )}</button>
                    </div>

                    <div className="flex gap-5">
                        {
                            premiumSelected?.map((i) => (
                                <CardPremium key={i.index_premium} data={i} onDelete={deletePremiuminState} />
                            ))
                        }
                    </div>
                </div>
                {/* section 2 package table*/}
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 font-prompt text-text-primary">
                    <div className="bg-info rounded-xl p-2 w-full flex justify-between">
                        <div className="inline-flex items-center gap-2">
                            <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></circle><path d="m12,17v-5.5c0-.276-.224-.5-.5-.5h-1.5" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></path><circle cx="12" cy="7.25" r="1.25" fill="currentColor" strokeWidth="2"></circle></g></svg>
                            <p className="text-xs">ติ๊กเลือกแล้วกด "เพิ่มที่เลือก" เพิ่มได้อีก {3 - premiumSelected.length} / 3 (ตอนนี้มี {premiumSelected.length})</p>
                        </div>
                        <div>
                            <button onClick={() => setPremiumSelected([])} className="btn btn-xs rounded-lg btn-error text-xs">ลบทั้งหมด</button>
                        </div>
                    </div>
                    {/* table package */}
                    <div className="flex justify-between items-end">
                        <SelectPerPage />
                        <SearchBox
                            placeholder='ค้นหาแพ็คเกจ...'
                        />
                    </div>
                    <div>
                        <TableSelectPremium
                            data={premiumData}
                            isChecked={isChecked}
                            onChange={addPremiumToState}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}
export default SearchPremium