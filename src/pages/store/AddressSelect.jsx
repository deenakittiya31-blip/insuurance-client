import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { listAddress } from "../../service/member/address"
import TabBackward from "../../component/mobile/TabBackward"

const AddressSelect = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [address, setAddress] = useState([])
    const { fromCheckout, orderId, currentAddressId } = location.state || {}
    // ผูก radio กับ state นี้
    const [selectedAddressId, setSelectedAddressId] = useState(currentAddressId || null)

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await listAddress()
                setAddress(res.data.data)

                // ถ้าไม่มี currentAddressId ให้ใช้ is_default
                if (!currentAddressId) {
                    const def = res.data.data.find(a => a.is_default)
                    if (def) setSelectedAddressId(def.id)
                }
            } catch (err) {
                console.log(err)
            }
        }

        fetchAddress();
    }, [])

    const handleSelect = (id) => {
        setSelectedAddressId(id)  // เปลี่ยน radio ก่อน
        if (fromCheckout) {
            navigate(`/store/order/checkout/${orderId}`, {
                state: { selectedAddressId: id }
            })
        }
    }

    return (
        <div>
            <TabBackward linkTo={`/store/order/checkout/${orderId}`} title='เลือกที่อยู่' />
            <div className="p-5 font-prompt space-y-3">
                {address.map(i => (
                    <div key={i.id} onClick={() => handleSelect(i.id)}
                        className="card cursor-pointer w-full bg-base-100 card-xs">
                        <div className="card-body">
                            <div className="flex gap-3 items-start">
                                <input
                                    type="radio"
                                    name="default_address"
                                    className="radio radio-sm radio-success"
                                    checked={selectedAddressId === i.id}
                                    onChange={() => handleSelect(i.id)}
                                />
                                <div className="w-full">
                                    <div className="space-y-1">
                                        <h2 className="card-title text-text-primary">{i.full_name} <span className="font-normal text-gray-400 text-xs">| {i.phone}</span></h2>
                                        <p className="text-gray-400">{i.address_line}</p>
                                        <p className="text-gray-400">ตำบล{i.subdistrict
                                        } อำเภอ{i.district} จังหวัด{i.province} {i.
                                            zipcode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddressSelect