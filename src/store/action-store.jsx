import { create } from 'zustand';
import { listCompanySelect } from '../service/insurance/CompanyInsur';
import { listTypeSelect } from '../service/insurance/TypeInsur';
import { listPackageSelect } from '../service/insurance/PackageInsur';
import { listCarUsageSelect } from '../service/car/CarUsage';
import { listCarType } from '../service/car/CarType';

const useActionStore = create((set) => ({
    company: [],
    typeInsur: [],
    packageSelect: [],
    carUsage: [],
    cartype: [],
    getCarType: async () => {
        try {
            const res = await listCarType()
            set({ cartype: res.data.data })
        } catch (err) {
            console.log(err)
        }
    },
    getCompany: async () => {
        try {
            const res = await listCompanySelect()
            set({ company: res.data.data })
        } catch (err) {
            console.log(err)
        }
    },
    getTypeInsur: async () => {
        try {
            const res = await listTypeSelect()
            set({ typeInsur: res.data.data })
        } catch (err) {
            console.log(err)
        }
    },
    getPackageSelect: async () => {
        try {
            const res = await listPackageSelect()
            set({ packageSelect: res.data.data })
        } catch (err) {
            console.log(err)
        }
    },
    getCarUsage: async () => {
        try {
            const res = await listCarUsageSelect()
            set({ carUsage: res.data.data })
        } catch (err) {
            console.log(err)
        }
    },
}))

export default useActionStore