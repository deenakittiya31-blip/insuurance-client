import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/header/Header'
import SidebarNew from '../component/sidebar/SidebarNew'

const Layout = () => {
    return (
        <div className='h-screen flex flex-col pb-5'>
            <Header />
            <div className='flex flex-1 px-5 overflow-hidden'>
                <SidebarNew />
                <main className='flex-1 rounded-2xl bg-[#F5F1EE] border border-slate-50 overflow-y-auto'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout