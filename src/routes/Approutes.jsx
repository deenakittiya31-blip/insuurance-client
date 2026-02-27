import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Layout from '../layout/Layout'
import UsageCar from '../pages/car/UsageCar'
import GroupCar from '../pages/car/GroupCar'
import CarModel from '../pages/car/CarModel'
import CarBrand from '../pages/car/CarBrand'
import InsurCompany from '../pages/insur/InsurCompany'
import InsurTypes from '../pages/insur/InsurTypes'
import CompulsoryCar from '../pages/car/CompulsoryCar'
import InsurPackage from '../pages/insur/InsurPackage'
import ProtectRoute from './ProtectRoute'
import Forbidden from './Forbidden'
import Cartype from '../pages/car/Cartype'
import CarYear from '../pages/car/CarYear'
import CustomModel from '../pages/custom_page/CustomModel'
import CustomModelDetail from '../pages/custom_page/CustomModelDetail'
import MemberRegister from '../pages/auth/MemberRegister'
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
import EditPremium from '../pages/insur/EditPremium'
import MemberPage from '../pages/member/MemberPage'
import MessageApi from '../pages/member/MessageApi'
import TagPage from '../pages/member/TagPage'
import SearchPremium from '../pages/insur/SearchPremium'
import Promotion from '../pages/insur/Promotion'
import ProfileUser from '../pages/ProfileUser'
import Users from '../pages/Users'
import LayoutMember from '../layout/LayoutMember'
import Line from '../pages/auth/Line'
import { PremiumProvider } from '../context/PremiumContext'
import CompareList from '../pages/store/CompareList'
import CompareInsure from '../pages/store/CompareInsure'
import PackageProduct from '../pages/store/PackageProduct'
import Address from '../pages/store/Address'
import TrackParcel from '../pages/store/TrackParcel'
import HistoryOrder from '../pages/store/HistoryOrder'
import PolicyManage from '../pages/consent/PolicyPage'
import PolicyView from '../pages/consent/PolicyView'
import MemberLogin from '../pages/auth/MemberLogin'
import DiscountLevel from '../pages/insur/DiscountLevel'


const Approutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path='member-register' element={<MemberRegister />} />
                <Route path='member-login' element={<MemberLogin />} />
                <Route path='forbidden' element={<Forbidden />} />
                <Route path='/policy/:type' element={<PolicyView />} />
                <Route path='liff' element={<Line />} />


                <Route
                    path='/store'
                    element={
                        <PremiumProvider>
                            <LayoutMember />
                        </PremiumProvider>
                    }>
                    <Route index element={<PackageProduct />} />
                    <Route path='compare-insurance/:id' element={<CompareInsure />} />
                    <Route path='compare-insurance' element={<CompareList />} />
                    <Route path='address' element={<Address />} />
                    <Route path='trackparcel' element={<TrackParcel />} />
                    <Route path='history' element={<HistoryOrder />} />
                </Route>

                <Route
                    path='/app'
                    element={
                        <ProtectRoute allowRoles={['admin', 'staff']} >
                            <Layout />
                        </ProtectRoute>
                    }>
                    <Route index element={<DashBoard />} />
                    <Route path='member' element={<MemberPage />} />
                    <Route path='message-api' element={<MessageApi />} />
                    <Route path='member-group' element={<GroupMember />} />
                    <Route path='member-tag' element={<TagPage />} />
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
                    <Route path='edit-premium/:id' element={<EditPremium />} />
                    <Route path='search-premium' element={<SearchPremium />} />
                    <Route path='profileUser' element={<ProfileUser />} />

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
                        <Route path='promotion' element={<Promotion />} />
                        <Route path='discount-level' element={<DiscountLevel />} />
                        <Route path='users' element={<Users />} />
                        <Route path='policy' element={<PolicyManage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Approutes