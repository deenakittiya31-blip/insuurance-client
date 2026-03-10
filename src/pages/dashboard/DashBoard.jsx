import { useEffect } from "react"
import { useState } from "react"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, XAxis, AreaChart, Area, YAxis, CartesianGrid } from 'recharts'
import { dashboard } from "../../service/dashboard"
import Title from "../../component/form/Title"
import { dateFormat } from "../../utils/dateformat"
import { TbCurrencyBaht, TbInvoice } from "react-icons/tb";
import { FiCheckSquare } from "react-icons/fi";
import { LuPackageOpen } from "react-icons/lu";
import { LuPackageCheck } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";

const DashBoard = () => {
    const [customers, setCustomers] = useState({})
    const [sales, setSales] = useState([])
    const [updatedAt, setUpdatedAt] = useState('')
    const [monthly, setMonthly] = useState([])
    const [revenue, setRevenue] = useState({})

    const COLORS = ['#7C73E6', '#ada7fc']
    const pieData = [
        { name: 'เพื่อนในไลน์', value: customers.friends || 0 },
        { name: 'ลงทะเบียนแล้ว', value: customers.registered || 0 },
    ]

    const chartData = monthly.map(m => ({
        name: m.month,
        ยอดขาย: m.total_selling_price
    }))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dashboard()
                const data = res.data
                setCustomers(data.customers)
                setSales(data.sales)
                setUpdatedAt(data.updatedAt)
                setMonthly(data.monthly_sales)
                setRevenue(data.revenue)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData();
    }, [])

    console.log(monthly)
    console.log(revenue)

    const getCount = (status) => sales.find(s => s.status === status)?.count || 0
    return (
        <div className='flex flex-col gap-5 h-auto p-5 font-prompt text-text-primary'>
            <div className='flex items-center justify-between'>
                <Title
                    title='Dashboard'
                    subtitle={dateFormat(updatedAt)}
                />
            </div>
            <div className="flex gap-5">
                <div className="flex-1 space-y-5">
                    <div className="grid grid-cols-4 gap-5 w-full" >
                        <div className='bg-white rounded-xl p-5 flex flex-col gap-3 h-full'>
                            <div className="flex justify-between items-center">
                                <p className="font-medium text-sm tracking-wide">ออเดอร์</p>
                                <TbInvoice size={25} />
                            </div>
                            <div className="flex-1 flex items-center justify-start">
                                <p className="font-bold text-4xl text-main">{sales.reduce((sum, s) => sum + s.count, 0)} </p>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl p-5 flex flex-col w-full h-full'>
                            <div className="flex justify-between items-center">
                                <p className="font-medium text-sm tracking-wide">สั่งซื้อสำเร็จ</p>
                                <FiCheckSquare size={25} />
                            </div>
                            <div className="flex-1 flex items-baseline-last justify-start">
                                <p className="font-bold text-3xl text-main">{getCount('สั่งซื้อสำเร็จ')}</p>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl p-5 flex flex-col h-full'>
                            <div className="flex justify-between items-center">
                                <p className="font-medium text-sm tracking-wide">กำลังจัดส่ง</p>
                                <LuPackageOpen size={25} />
                            </div>
                            <div className="flex-1 flex items-baseline-last justify-start">
                                <p className="font-bold text-3xl text-main">{getCount('กำลังจัดส่ง')}</p>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl p-5 flex flex-col w-full h-full'>
                            <div className="flex justify-between items-center">
                                <p className="font-medium text-sm tracking-wide">จัดส่งสำเร็จ</p>
                                <LuPackageCheck size={25} />
                            </div>
                            <div className="flex-1 flex items-baseline-last justify-start">
                                <p className="font-bold text-3xl text-main">{getCount('จัดส่งเรียบร้อยแล้ว')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className='bg-white rounded-xl p-5 flex flex-col w-full h-full'>
                            <div className="flex gap-3 items-center">
                                <TbCurrencyBaht size={35} />
                                <p className="font-medium text-lg tracking-wide">รายได้ทั้งหมด</p>

                            </div>
                            <div className="flex-1 flex items-center justify-start mt-2">
                                <p className="font-bold text-2xl">{revenue.total_all_time?.toLocaleString()} ฿</p>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl p-5 flex flex-col w-full h-full'>
                            <div className="flex gap-5 items-center">
                                <IoWalletOutline size={35} />
                                <p className="font-medium text-lg tracking-wide">รายได้เดือนนี้</p>
                            </div>
                            <div className="flex-1 flex items-center justify-start mt-2">
                                <p className="font-bold text-2xl">{revenue.total_this_month?.toLocaleString()} ฿</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-xl p-5 flex flex-col gap-3 h-full'>
                    <div className="flex justify-between items-baseline-last">
                        <p className="font-medium text-sm tracking-wide">สัดส่วนลูกค้า</p>
                        <p className="font-medium text-sm tracking-wide">มีทั้งหมด {customers.total || 0} คน</p>
                    </div>
                    <PieChart width={250} height={170}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}   // ลดจาก 60
                            outerRadius={65}   // ลดจาก 90
                            paddingAngle={4}
                            dataKey="value"
                        >
                            {pieData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} คน`} />
                        <Legend />
                    </PieChart>
                </div>
            </div>
            <div className='bg-white rounded-xl p-5 flex flex-col gap-3 h-full'>
                <div className="flex justify-between">
                    <p className="font-medium text-sm tracking-wide">ยอดขายรายเดือน</p>
                    <p className="font-medium text-sm tracking-wide">ประจำปี {new Date().getFullYear() + 543}</p>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7C73E6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#7C73E6" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: '#9CA3AF' }}
                            tickFormatter={(value) => {
                                const [year, month] = value.split('-')
                                const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
                                    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
                                return monthNames[parseInt(month) - 1]
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: '#9CA3AF' }}
                            tickFormatter={(value) => value.toLocaleString()}
                        />
                        <Tooltip
                            formatter={(value) => [`${value.toLocaleString()} ฿`, 'ยอดขาย']}
                            labelFormatter={(label) => {
                                const [year, month] = label.split('-')
                                const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
                                    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
                                return `${monthNames[parseInt(month) - 1]} ${year}`
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="ยอดขาย"
                            stroke="#7C73E6"
                            strokeWidth={2}
                            fill="url(#colorSales)"
                            dot={{ r: 4, fill: '#fff', stroke: '#7C73E6', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#7C73E6' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
export default DashBoard