import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../layout/Layout'
import UsageCar from '../pages/car/UsageCar'
import GroupCar from '../pages/car/GroupCar'
import CarModel from '../pages/car/CarModel'
import CarBrand from '../pages/car/CarBrand'
import InsurCompany from '../pages/insur/InsurCompany'
import InsurTypes from '../pages/insur/InsurTypes'
import LoginLine from '../pages/auth/LoginLine'
import CompulsoryCar from '../pages/car/CompulsoryCar'
import InsurPackage from '../pages/insur/InsurPackage'
import ProtectRoute from './ProtectRoute'
import Forbidden from './Forbidden'
import Cartype from '../pages/car/Cartype'
import CarYear from '../pages/car/CarYear'
import CustomModel from '../pages/custom_page/CustomModel'
import CustomModelDetail from '../pages/custom_page/CustomModelDetail'
import MemberPage from '../pages/MemberPage'
import MemberRegister from '../pages/auth/MemberRegister'
import PackageProduct from '../pages/PackageProduct'
import PinListCompare from '../pages/compare/PinListCompare'
import QuotationList from '../pages/compare/QuotationList'
import QuotationDetail from '../pages/compare/QuotationDetail'
import Quotaion from '../pages/compare/Quotaion'
import Setting from '../pages/Setting'
import Compare from '../pages/insur/Compare'
import DashBoard from '../pages/dashboard/DashBoard'
import AddPackage from '../pages/insur/AddPackage'
import EditPackage from '../pages/insur/EditPackage'
import GroupMember from '../pages/member/GroupMember'
import AddPremium from '../pages/insur/AddPremium'
import InsurPremium from '../pages/insur/InsurPremium'

const Approutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='member-register' element={<MemberRegister />} />
                <Route path='line' element={<LoginLine />} />
                <Route path='forbidden' element={<Forbidden />} />
                <Route path='package-product' element={<PackageProduct />} />

                <Route
                    path='/app'
                    element={
                        <ProtectRoute allowRoles={['admin', 'staff']} >
                            <Layout />
                        </ProtectRoute>
                    }>
                    <Route index element={<DashBoard />} />
                    <Route path='member' element={<MemberPage />} />
                    <Route path='member-group' element={<GroupMember />} />
                    <Route path='pin-compare' element={<PinListCompare />} />
                    <Route path='quotationlist' element={<QuotationList />} />
                    <Route path='quotation/:q_id' element={<Quotaion />} />
                    <Route path='compare-detail/:q_id' element={<QuotationDetail />} />
                    <Route path='compare/:q_id' element={<Compare />} />
                    <Route path='setting' element={<Setting />} />
                    <Route path='custommodel' element={<CustomModel />} />
                    <Route path='custommodel-detail/:id' element={<CustomModelDetail />} />
                    <Route path='package' element={<InsurPackage />} />
                    <Route path='addpackage' element={<AddPackage />} />
                    <Route path='editpackage/:id' element={<EditPackage />} />
                    <Route path='insurpremium' element={<InsurPremium />} />
                    <Route path='add-premium' element={<AddPremium />} />

                    {/*admin only */}
                    <Route
                        element={
                            <ProtectRoute allowRoles={['admin']}>
                                <Outlet />
                            </ProtectRoute>
                        }
                    >
                        <Route path='insurance-company' element={<InsurCompany />} />
                        <Route path='cartype' element={<Cartype />} />
                        <Route path='caryear' element={<CarYear />} />
                        <Route path='usagecar' element={<UsageCar />} />
                        <Route path='groupcar' element={<GroupCar />} />
                        <Route path='compulsorycar' element={<CompulsoryCar />} />
                        <Route path='carmodel' element={<CarModel />} />
                        <Route path='carbrand' element={<CarBrand />} />
                        <Route path='insurtypes' element={<InsurTypes />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Approutes