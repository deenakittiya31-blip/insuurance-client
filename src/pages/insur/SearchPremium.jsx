import { useEffect, useState } from "react";
import Title from "../../component/form/Title"
import { listByCarModel } from "../../service/car/CarModel";
import useActionStore from "../../store/action-store";
import { listCarYearSelect } from "../../service/car/CarYear";
import Select from "../../component/form/Select";
import SelectSearch from "../../component/form/SelectSearch";
import { GoInfo } from "react-icons/go";
import SelectPerPage from "../../component/form/SelectPerPage";
import SearchBox from "../../component/quotation_about/SearchBox";
import TableSelectPackage from "../../component/table/TableSelectPackage";

const initialStateSearch = {
    insurance_type_id: '',
    car_type_id: '',
    car_usage_id: ''
}

const initialStateCompare = {
    car_brand_id: '',
    car_model_id: '',
    car_year_id: ''
}

const SearchPremium = () => {
    const { typeInsur, getTypeInsurSelect, carbrand, getCarBrandSelect, carUsage, getCarUsageSelect, cartype, getCarTypeSelect } = useActionStore();
    const [year, setYear] = useState([])
    const [carModel, setCarModel] = useState([])
    const [search, setSearch] = useState(initialStateSearch)
    const [compare, setCompare] = useState(initialStateCompare)
    const [packageSelected, setPackageSelected] = useState([])

    useEffect(() => {
        getTypeInsurSelect();
        getCarBrandSelect();
        getCarUsageSelect();
        getCarTypeSelect();
        getCarYear();
    }, [])

    const fetchCarModels = async () => {
        try {
            const res = await listByCarModel(compare.car_brand_id)
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
            [name]: Number(value)
        }))
    }
    const handleOnChangeSearch = (e) => {
        const { name, value } = e.target

        setSearch(prev => ({
            ...prev,
            [name]: Number(value)
        }))
    }

    const hdlSelectChange = async (value) => {
        setCompare(prev => ({
            ...prev,
            car_brand_id: value
        }))

        await fetchCarModels(value)
    }

    // console.log(compare)
    console.log(search)
    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <Title
                title='ค้นหาเบี้ยประกัน'
            />
            {/* section 1 */}
            <div className="grid lg:grid-cols-2 gap-3">
                {/* box search */}
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-5 font-prompt text-text-primary">
                    <div className="grid grid-cols-2 gap-x-3 items-end-safe">
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
                            value={compare.car_model_id || null}
                            onChange={handleOnChangeCompare}
                            valueKey='id'
                            labelKey='name'
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
                    </div>
                    <form className="grid gap-3">
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
                        <div className="grid gap-3">
                            <button className="btn btn-info text-white">ค้นหา</button>
                            <button className="btn btn-warning text-white">ล้างข้อมูล</button>
                            <button className="btn btn-error text-white">แบบฟอร์มปล่าว</button>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="btn btn-success text-white">ใบเสนอราคา</button>
                                <button className="btn btn-secondary text-white">ใบเสนอราคาที่ใช้บ่อย</button>
                            </div>
                        </div>
                    </form >
                </div>
                {/* box selected product */}
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-5 font-prompt text-text-primary">
                    <p className="text-sm text-text-primary my-3">จำนวนรายการปัจจุบัน 0 รายการ</p>
                    {
                        packageSelected?.map((i, idx) => (
                            <span key={idx}>{i}</span>
                        ))
                    }
                </div>
            </div>
            {/* section 2 package table*/}
            <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 font-prompt text-text-primary">
                <div class="bg-info rounded-xl p-2 w-full flex justify-between">
                    <div className="inline-flex items-center gap-2">
                        <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></circle><path d="m12,17v-5.5c0-.276-.224-.5-.5-.5h-1.5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></path><circle cx="12" cy="7.25" r="1.25" fill="currentColor" stroke-width="2"></circle></g></svg>
                        <p className="text-xs">ติ๊กเลือกแล้วกด "เพิ่มที่เลือก" เพิ่มได้อีก 3 / 3 (ตอนนี้มี 0)</p>
                    </div>
                    <div className="space-x-2">
                        <button className="btn btn-xs btn-success text-xs">เพิ่ม (0)</button>
                        <button className="btn btn-xs btn-error text-xs">ลบทั้งหมด</button>
                    </div>
                </div>
                {/* table package */}
                <div className="flex justify-between">
                    <SelectPerPage />
                    <SearchBox
                        placeholder='ค้นหาแพ็คเกจ...'
                    />
                </div>
                <div>
                    <TableSelectPackage />
                </div>
            </div>
        </div >
    )
}
export default SearchPremium