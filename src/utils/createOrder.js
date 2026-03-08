import { useNavigate } from "react-router-dom"
import { createOrder } from "../service/order/order"
const navigate = useNavigate()

export const handleCreteOrder = async (packageId, premiumId) => {
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