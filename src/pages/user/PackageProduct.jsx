import { useEffect, useState } from "react";
import { listCarYearSelect } from "../../service/car/CarYear";
import { listByCarModel } from "../../service/car/CarModel";
import useActionStore from "../../store/action-store";
import ModalCarMember from "../../component/modal/ModalCarMember";
import { LuListFilter } from "react-icons/lu";
import { createPremiumToCompareMember, searchPremiumMember } from "../../service/insurance/PremiumInsur";
import CardProduct from '../../component/card/CardProduct'
import { GoSortAsc, GoSortDesc } from "react-icons/go"
import CardCarData from "../../component/card/CardCarData";
import CardFilterPopup from "../../component/card/CardFilterPopup";
import CardFilter from "../../component/card/CardFilter";
import CardPremiumSelect from "../../component/card/CardPremiumSelect";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePremium } from "../../context/PremiumContext";
import useInsureAuth from "../../store/auth-store";
import NavbarMobile from '../../component/header/NavbarMobile'
import { IoMdArrowDown } from "react-icons/io";
import Car from '../../assets/car1.png'

const initialStateFilter = {
    insurance_type_id: '',
    insurance_company: [],
    car_usage_type_id: '',
    repair_type: ''
}

const PackageProduct = () => {
    const navigate = useNavigate()
    const [premium, setPremium] = useState([])
    const { premiumSelected, setPremiumSelected } = usePremium();
    const [pmToCompare, setPmToCompare] = useState([])
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
    const { typeInsur, getTypeInsurSelect, carbrand, getCarBrandSelect, company, getCompanySelect, getUsageTypeSelectMember, carUsageType } = useActionStore()
    const [isOpen, setIsOpen] = useState(false)
    const [isFilter, setIsFilter] = useState(false)
    const [savedCar, setSavedCar] = useState(null)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getTypeInsurSelect();
        getCarBrandSelect();
        getCarYear();
        getCompanySelect();
        fetchPremiumSearch();
        getUsageTypeSelectMember();
    }, [])

    useEffect(() => {
        console.log('pmToCompare', pmToCompare)
    }, [pmToCompare])

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

    //รับ param ได้ มี default เป็น filter
    const fetchPremiumSearch = async (filterData = filter) => {
        setLoading(true)
        try {
            const res = await searchPremiumMember(filterData);
            setPremium(res.data.data)
            setTotal(res.data.total)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
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
            setPremium([])
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

    const clearFilter = () => {
        setFilter(initialStateFilter)
        fetchPremiumSearch(initialStateFilter)
        closeFilter()
    }

    const addPremiumToState = (e) => {
        //1 รับค่า index ที่เลือก
        const indexPremium = parseInt(e.target.value)

        //2 หาข้อมูลจากรายการทั้งหมด
        const selectedPremium = premium.find(
            item => item.index_premium === indexPremium
        )

        if (!selectedPremium) return

        const isSelected = premiumSelected.some(
            item => item.index_premium === indexPremium
        )

        // ถ้าเอาออก
        if (isSelected) {
            setPremiumSelected(prev =>
                prev.filter(item => item.index_premium !== indexPremium)
            )

            setPmToCompare(prev =>
                prev.filter(item => item.index_premium !== indexPremium)
            )
            return
        }

        //ถ้าเกิน 3
        if (premiumSelected.length >= 3) {
            toast.error('เลือกได้สูงสุด 3 รายการเท่านั้น')
            return
        }

        //ข้อมูลใน UI
        setPremiumSelected(prev => [
            ...prev,
            {
                index_premium: selectedPremium.index_premium,
                total_premium: selectedPremium.total_premium,
                repair_type: selectedPremium.repair_type,
                insurance_type: selectedPremium.nametype,
                insurance_company: selectedPremium.namecompany,
                logo_url_company: selectedPremium.logo_url,
            }
        ])

        //ข้อมูลส่ง Backend data
        setPmToCompare(prev => {
            const exist = prev.some(
                item => item.index_premium === indexPremium
            )
            if (exist) return prev

            return [
                ...prev,
                {
                    index_premium: selectedPremium.index_premium,
                    index_company: selectedPremium.index_company,
                    index_package: selectedPremium.index_package,
                }
            ]
        })
    }

    const handleSubmitPremiumSelected = async () => {
        try {
            const res = await createPremiumToCompareMember({
                ...carData,
                import_by: 'member',
                premiums: pmToCompare
            })

            navigate(`/store/compare-insurance/${res.data.compare_id}`)
            setPmToCompare([])
            setPremiumSelected([])
        } catch (err) {
            console.log(err)
            toast.error('สร้างใบเปรียบเทียบไม่ได้')
        }
    }

    console.log(premiumSelected)
    return (
        <div>
            <NavbarMobile />
            <div className="p-5 flex flex-col gap-5 font-prompt">
                <div className="flex items-center w-full bg-main rounded-md p-5">
                    <div className="w-45">
                        <span className="text-rotate text-lg font-semibold text-white tracking-wide leading-loose">
                            <span className="justify-items-start">
                                <span>📑 เบี้ยประกันภัย</span>
                                <span>🚐 รถยนต์</span>
                            </span>
                        </span>
                        <p className="font-nomal text-white text-[10px] tracking-wide">เริ่มต้นการค้นหาเบี้ยประกันภัยรถยนต์ที่เหมาะกับตัวคุณ</p>
                        <button className="btn btn-xs mt-3">
                            <IoMdArrowDown />
                            เริ่มเลย
                        </button>
                    </div>
                    <div className="w-full flex justify-end">
                        <div className="w-25 rounded-md overflow-clip">
                            <img src={Car} className="w-full h-full object-cover" />
                        </div>
                    </div>

                </div>
                <div className="space-y-5 md:flex gap-5">
                    <div className="space-y-5">
                        <CardCarData
                            savedCar={savedCar}
                            form={carData}
                            onChange={handleOnChange}
                            carModel={carModel}
                            carbrand={carbrand}
                            caryear={year}
                            onSubmit={handleSubmit}
                        />
                        <div className="md:hidden">
                            <div className="flex justify-between bg-white border-gray-300/25 border p-3 rounded-md text-text-primary">
                                <p className="font-semibold text-sm">ตัวกรองข้อมูล</p>
                                <LuListFilter onClick={() => setIsFilter(true)} />
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <CardFilter
                                typeInsur={typeInsur}
                                company={company}
                                onChange={handleOnChangeFilter}
                                form={filter}
                                onSubmit={handleSubmitFilter}
                                onClear={clearFilter}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-baseline-last text-text-primary">
                            <h1 className="font-semibold text-sm">ผลลัพธ์ {total} รายการ</h1>
                            <button
                                onClick={handleSortPremium}
                                className="p-2 rounded-md bg-white font-semibold text-sm text-text-primary flex gap-1 justify-center items-center transition-all duration-300"
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
                        {
                            loading ? (
                                <div className="flex justify-center items-center min-h-50">
                                    <span className="loading loading-spinner text-main"></span>
                                </div>
                            ) : premium.length === 0 ? (
                                <div className="text-center py-10">
                                    ไม่มีข้อมูล
                                </div>
                            ) : (
                                <div className="grid justify-items-stretch lg:grid-cols-2 gap-5">
                                    {premium.map((i) => (
                                        <div key={i.index_premium}>
                                            <CardProduct
                                                data={i}
                                                onChange={addPremiumToState}
                                                checked={premiumSelected.some(p => p.index_premium === i.index_premium)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )
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
                <CardFilterPopup
                    isOpen={isFilter}
                    typeInsur={typeInsur}
                    company={company}
                    carUsage={carUsageType}
                    onChange={handleOnChangeFilter}
                    form={filter}
                    onClose={closeFilter}
                    onSubmit={handleSubmitFilter}
                    onClear={clearFilter}
                />
                <CardPremiumSelect
                    premiumSelect={premiumSelected}
                    onSubmit={handleSubmitPremiumSelected}
                    onClear={() => {
                        setPremiumSelected([])
                        setPmToCompare([])
                    }}
                />
            </div >
        </div>
    )
}
export default PackageProduct