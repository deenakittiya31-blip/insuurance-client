import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../component/sidebar/SideBar'
import Header from '../component/header/Header'
import SidebarNew from '../component/sidebar/SidebarNew'

const Layout = () => {
    return (
        <div className='flex h-screen bg-white overflow-hidden'>
            <SidebarNew />
            <div className='flex flex-col flex-1 px-5 pb-5 overflow-hidden'>
                <Header />
                <main className='flex-1 h-auto rounded-2xl bg-[#F5F1EE] border border-slate-50 overflow-y-auto'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout