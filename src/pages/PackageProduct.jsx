import { listPromotionSelect } from "../service/insurance/promotion";
import { useEffect, useState } from "react";
import { FaCar, FaEdit } from "react-icons/fa";
import { listCarYearSelect } from "../service/car/CarYear";
import { listByCarModel } from "../service/car/CarModel";
import useActionStore from "../store/action-store";
import ModalCarMember from "../component/modal/ModalCarMember";
import { LuListFilter } from "react-icons/lu";
import CardFilter from "../component/card/CardFilter";
import { searchPremiumMember } from "../service/insurance/PremiumInsur";
import CardProduct from '../component/card/CardProduct'
import { GoSortAsc, GoSortDesc } from "react-icons/go"

const initialStateFilter = {
    insurance_type_id: '',
    insurance_company: [],
    repair_type: ''
}

const PackageProduct = () => {
    const [premium, setPremium] = useState([])
    const [promotion, setPromotion] = useState([])
    const [filter, setFilter] = useState(initialStateFilter)
    const [sortOrder, setSortOrder] = useState("asc")
    const [carData, setCarData] = useState({
        car_brand_id: '',
        car_model_id: '',
        car_year_id: '',
        car_usage_id: '',
        sub_car_model: ''
    })
    const [year, setYear] = useState([])
    const [carModel, setCarModel] = useState([])
    const { typeInsur, getTypeInsurSelect, carbrand, getCarBrandSelect, company, getCompanySelect } = useActionStore()
    const [isOpen, setIsOpen] = useState(false)
    const [isFilter, setIsFilter] = useState(false)
    const [savedCar, setSavedCar] = useState(null)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        getTypeInsurSelect();
        getCarBrandSelect();
        getCarYear();
        getCompanySelect();
        fetchPremiumSearch();
        getPromotion();
    }, [])

    const handleOnChange = async (e) => {
        const { name, value } = e.target

        setCarData(prev => ({
            ...prev,
            [name]: value
        }))

        if (name === 'car_brand_id') {
            await fetchCarModels(value)
        }
    }

    const handleOnChangeFilter = (e) => {
        const { name, value, type, checked } = e.target

        if (type === 'checkbox' && name === 'insurance_company') {
            setFilter(prev => ({
                ...prev,
                insurance_company: checked
                    ? [...prev.insurance_company, value]
                    : prev.insurance_company.filter(id => id !== value)
            }))
        } else {
            setFilter(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

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


    const getPromotion = async () => {
        try {
            const res = await listPromotionSelect();
            setPromotion(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPremiumSearch = async () => {
        try {
            const res = await searchPremiumMember(filter);
            setPremium(res.data.data)
            setTotal(res.data.total)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // หาชื่อจาก id ที่เลือก
        const brandName = carbrand.find(b => b.id == carData.car_brand_id)?.name || ''
        const modelName = carModel.find(m => m.id == carData.car_model_id)?.name || ''
        const yearData = year.find(y => y.id == carData.car_year_id)

        setSavedCar({
            brand: brandName,
            model: modelName,
            subModel: carData.sub_car_model,
            year: yearData ? `${yearData.year_be}/${yearData.year_ad}` : ''
        })

        setIsOpen(false)
    }

    const closeFilter = () => {
        setIsFilter(false)
    }

    const handleSubmitFilter = async (e) => {
        e.preventDefault()
        try {
            const res = await searchPremiumMember(filter);
            setPremium(res.data.data)
            setTotal(res.data.total)
            closeFilter()
        } catch (err) {
            console.log(err)
        }

    }

    const handleSortPremium = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc"

        const sorted = [...premium].sort((a, b) => {
            const priceA = parseFloat(a.selling_price)
            const priceB = parseFloat(b.selling_price)

            return newOrder === "asc"
                ? priceA - priceB
                : priceB - priceA
        })

        setPremium(sorted)
        setSortOrder(newOrder)
    }

    console.log(premium)
    return (
        <div className="flex flex-col gap-5 font-prompt">
            {/* promotion section */}
            <div>
                <p className="font-semibold text-text-primary text-sm">โปรโมชั่น</p>
                <div className="flex gap-2 items-center  overflow-x-scroll">
                    {promotion.map((i) => (
                        <div key={i.id} className="w-19.5 h-19.5 shrink-0">
                            <img
                                src={i.logo_url}
                                alt={i.promotion_name}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white border-gray-300/25 border p-3 rounded-md text-text-primary">
                <div className="flex gap-3 justify-between items-center mb-3">
                    <div className="flex gap-3 items-center">
                        <button className="w-8 h-8 p-1 rounded-full bg-main text-white flex justify-center items-center"><FaCar /></button>
                        <p className="font-semibold text-sm">ข้อมูลรถของคุณ</p>
                    </div>
                    <button onClick={() => setIsOpen(true)} className="p-2 rounded-md bg-warning text-xs text-black flex gap-1 justify-center items-center"><FaEdit /> แก้ไขข้อมูล</button>
                </div>
                <p className="text-xs">
                    {savedCar
                        ? `${savedCar.brand} / ${savedCar.model} / ${savedCar.subModel} / ${savedCar.year}`
                        : 'ยังไม่มีข้อมูลรถ กรุณากรอกข้อมูล'
                    }
                </p>
            </div>
            <div className="flex justify-between bg-white border-gray-300/25 border p-3 rounded-md text-text-primary">
                <p className="font-semibold text-sm">ตัวกรองข้อมูล</p>
                <LuListFilter onClick={() => setIsFilter(true)} />
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-baseline-last">
                    <h1 className="font-semibold text-sm">ผลลัพธ์ <span className="text-main">{total} รายการ</span></h1>
                    <button
                        onClick={handleSortPremium}
                        className="p-2 rounded-md bg-white font-semibold text-sm text-black flex gap-1 justify-center items-center transition-all duration-300"
                    >
                        {sortOrder === "asc" ? (
                            <>
                                <GoSortAsc size={20} />
                                ราคาจาก น้อย-มาก
                            </>
                        ) : (
                            <>
                                <GoSortDesc size={20} />
                                ราคาจาก มาก-น้อย
                            </>
                        )}
                    </button>
                </div>
                <div className="grid justify-items-stretch lg:grid-cols-2 gap-5">
                    {
                        premium.map((i, idx) => (
                            <div key={idx} className="w-auto">
                                <CardProduct data={i} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <ModalCarMember
                isOpen={isOpen}
                form={carData}
                onChange={handleOnChange}
                onClose={() => setIsOpen(false)}
                carModel={carModel}
                carbrand={carbrand}
                caryear={year}
                onSubmit={handleSubmit}
            />
            <CardFilter
                isOpen={isFilter}
                typeInsur={typeInsur}
                company={company}
                onChange={handleOnChangeFilter}
                form={filter}
                onClose={closeFilter}
                onSubmit={handleSubmitFilter}
                onClear={() => setFilter(initialStateFilter)}
            />
        </div>
    )
}
export default PackageProduct