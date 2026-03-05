import TabBackward from "../../component/mobile/TabBackward"
import CardOrder from "../../component/card/CardOrder"
import { useEffect, useState } from "react"
import { deleteOrder, getHistoryOrder } from "../../service/order/order"
import useInsureAuth from "../../store/auth-store"
import toast from "react-hot-toast"
import Swal from "sweetalert2"

const HistoryOrder = () => {
  const { token, member } = useInsureAuth()
  const [order, setOrder] = useState([])

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getHistoryOrder()
        setOrder(res.data.data)
      } catch (err) {
        console.log(err)
        setOrder([])
      }
    }

    fetchOrder()
  }, [member?.id])

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "คุณแน่ใจ ?",
      text: "ต้องการจะลบจริง ๆ ใช่ไหม?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "#E5E4E2",
      confirmButtonColor: "#d33",
      confirmButtonText: "ลบ",
      cancelButtonText: 'ยกเลิก'
    })

    if (!result.isConfirmed) return

    setOrder(prev => prev.filter(o => o.id !== id))

    try {
      const res = await deleteOrder(id)
      toast.success(res.data.message)
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
    }
  }
  return (
    <div>
      <TabBackward
        linkTo='/store'
        title='คำสั่งซื้อ'
      />
      <div className="p-5 font-prompt space-y-3">

        {
          order.map((i) => (
            <CardOrder
              key={i.id}
              data={i}
              onDelete={handleDelete}
            />
          ))
        }
      </div>
    </div>
  )
}
export default HistoryOrder