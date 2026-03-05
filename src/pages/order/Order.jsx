import { useState } from "react"
import SelectPerPage from "../../component/form/SelectPerPage"
import Title from "../../component/form/Title"
import SearchBox from "../../component/quotation_about/SearchBox"
import TableOrder from "../../component/table/TableOrder"
import { useEffect } from "react"
import { changeStatusOrder, listOrder, updateTrackingOrder } from "../../service/order/order"
import toast from "react-hot-toast"

const Order = () => {
    const [order, setOrder] = useState([])
    const [pagination, setPagination] = useState({})
    const [textSearch, setTextSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'DESC' });

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(textSearch)
        }, 300)

        return () => clearTimeout(delay)
    }, [textSearch])

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await listOrder({
                    page,
                    limit: perPage,
                    sortKey: sortConfig.key,
                    sortDirection: sortConfig.direction,
                    search: debouncedSearch
                })
                setOrder(res.data.data)
                setPagination(res.data.pagination)
            } catch (err) {
                console.log(err)
                setOrder([])
            }
        }

        fetchOrder();
    }, [page, perPage, sortConfig, debouncedSearch])

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value))
        setPage(1)
    }


    const handleSort = (keyName) => {
        let direction = 'ASC';

        if (sortConfig.key === keyName && sortConfig.direction === 'ASC') {
            direction = 'DESC';
        }

        setSortConfig({ key: keyName, direction });
    }

    const handleUpdateStatus = async (id, statusOrder) => {
        setOrder(prev => prev.map(i =>
            i.id === id
                ? { ...i, status: statusOrder }
                : i
        ))
        try {
            const res = await changeStatusOrder(id, statusOrder)
            toast.success(res.data.msg)
        } catch (err) {
            console.log('Error response:', err.response)
            toast.error('อัปเดตสถานะไม่สำเร็จ')
        }
    }

    const handleUpdateTracking = async (id, tracking) => {
        setOrder(prev => prev.map(i =>
            i.id === id
                ? { ...i, tracking_order_id: tracking }
                : i
        ))

        try {
            const res = await updateTrackingOrder(id, tracking)
            toast.success(res.data.msg)
        } catch (err) {
            console.log('Error response:', err.response)
            toast.error('เพิ่มเลขพัสดุไม่สำเร็จ')
        }
    }
    return (
        <div className='flex flex-col gap-5 h-auto p-5'>
            <Title
                title='คำสั่งซื้อ'
            />
            <div className='bg-white rounded-2xl p-5'>
                <div className="flex justify-end items-baseline-last gap-3">
                    <SearchBox
                        width='w-sm'
                        placeholder='ค้นหาชื่อ, เบี้ย...'
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                    <SelectPerPage
                        onChange={handlePerPageChange}
                        perPage={perPage}
                    />
                </div>
                <TableOrder
                    data={order}
                    page={page}
                    limit={perPage}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    onUpdateStatus={handleUpdateStatus}
                    onUpdateTracking={handleUpdateTracking}
                />
            </div>
        </div>
    )
}
export default Order