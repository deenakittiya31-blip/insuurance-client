import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../layout/Layout'
import UsageCar from '../pages/car/UsageCar'
import GroupCar from '../pages/car/GroupCar'
import CarModel from '../pages/car/CarModel'
import CarBrand from '../pages/car/CarBrand'
import InsurCompany from '../pages/insur/InsurCompany'
import InsurPremuim from '../pages/insur/InsurPremuim'
import InsurTypes from '../pages/insur/InsurTypes'
import LoginLine from '../pages/auth/LoginLine'
import CompulsoryCar from '../pages/car/CompulsoryCar'
import InsurPackage from '../pages/insur/InsurPackage'
import ProtectRoute from './ProtectRoute'
import Forbidden from './Forbidden'
import Cartype from '../pages/car/Cartype'
import CarYear from '../pages/car/CarYear'
import Quotaion from '../pages/insur/Quotaion'
import Compare from '../pages/insur/Compare'
import Setting from '../pages/Setting'
import CustomModel from '../pages/custom_page/CustomModel'
import CustomModelDetail from '../pages/custom_page/CustomModelDetail'

const Approutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='line' element={<LoginLine />} />
                <Route path='forbidden' element={<Forbidden />} />

                <Route
                    path='/admin'
                    element={
                        <ProtectRoute allowRoles={['admin']} >
                            <Layout />
                        </ProtectRoute>
                    }>
                    <Route index element={<InsurCompany />} />
                    <Route path='cartype' element={<Cartype />} />
                    <Route path='caryear' element={<CarYear />} />
                    <Route path='usagecar' element={<UsageCar />} />
                    <Route path='groupcar' element={<GroupCar />} />
                    <Route path='compulsorycar' element={<CompulsoryCar />} />
                    <Route path='carmodel' element={<CarModel />} />
                    <Route path='carbrand' element={<CarBrand />} />
                    <Route path='insurpremuim' element={<InsurPremuim />} />
                    <Route path='insurtypes' element={<InsurTypes />} />
                    <Route path='package' element={<InsurPackage />} />
                    <Route path='quotation/:q_id' element={<Quotaion />} />
                    <Route path='compare/:q_id' element={<Compare />} />
                    <Route path='setting' element={<Setting />} />
                    <Route path='custommodel' element={<CustomModel />} />
                    <Route path='custommodel-detail/:id' element={<CustomModelDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Approutes