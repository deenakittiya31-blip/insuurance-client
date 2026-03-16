import { useState } from 'react'
import toast from 'react-hot-toast'
import { listByCarModel } from '../service/car/CarModel'
import { copyCompare, getDetailCompare } from '../service/compare'

const initialState = {
    to_name: '',
    details: '',
    car_brand_id: '',
    car_model_id: '',
    car_year_id: '',
    car_usage_id: '',
    sub_car_model: ''
}

export const useCompareForm = ({ user, setCarModel, getQuotationList }) => {
    const [openCopy, setOpenCopy] = useState(false)
    const [form, setForm] = useState(initialState)
    const [compareId, setCompareId] = useState(null)

    const fetchCarModels = async (brandId) => {
        try {
            const res = await listByCarModel(brandId)
            setCarModel(res.data.data)
        } catch (err) {
            console.log(err)
            setCarModel([])
        }
    }

    const openModalCopy = async (id) => {
        setOpenCopy(true)
        setCompareId(id)
        try {
            const res = await getDetailCompare(id)
            const { to_name, details, car_brand_id, car_model_id, car_year_id, car_usage_id, sub_car_model } = res.data.data

            setForm({ to_name, details, car_brand_id, car_model_id, car_year_id, car_usage_id, sub_car_model })

            if (car_brand_id) fetchCarModels(car_brand_id)

        } catch (err) {
            console.log(err)
        }
    }

    const closeFormCopy = () => {
        setOpenCopy(false)
        setForm(initialState)
        setCompareId(null)
    }

    const handleOnChange = async (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (name === 'car_brand_id') await fetchCarModels(value)
    }

    const handleCopyCompare = async (e) => {
        e.preventDefault()
        try {
            const res = await copyCompare({
                ...form,
                offer_id: user.user_id,
                import_by: 'key-in',
                qIdOld: compareId
            })
            closeFormCopy()
            toast(`${res.data.msg} รหัสใบเสนอราคาที่ ${res.data.qIdNew}`, { duration: 3000 })
            getQuotationList()
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    return {
        openCopy,
        form,
        compareId,
        openModalCopy,
        closeFormCopy,
        handleOnChange,
        handleCopyCompare
    }
}