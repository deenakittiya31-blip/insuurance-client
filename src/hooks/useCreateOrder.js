import { useNavigate } from "react-router-dom"
import { createOrder } from "../service/order/order"
import useInsureAuth from "../store/auth-store"
import toast from "react-hot-toast"

const useCreateOrder = () => {
    const navigate = useNavigate()
    const member = useInsureAuth((m) => m.member)

    const handleCreateOrder = async (packageId, premiumId) => {
        try {
            const res = await createOrder({
                package_id: packageId,
                premium_id: premiumId,
                member_id: member.id
            })
            navigate(`/store/order/checkout/${res.data.order_id}`)
        } catch (err) {
            toast.error('เกิดข้อผิดพลาด')
        }
    }

    return { handleCreateOrder }
}

export default useCreateOrder