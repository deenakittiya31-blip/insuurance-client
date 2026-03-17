import { useEffect, useState } from "react"
import { confirmOrder, getDetailOrder } from "../../service/order/order"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import CardPremiumList from "../../component/card/CardPremiumList"
import { FaNoteSticky } from "react-icons/fa6"
import { FaLocationDot } from "react-icons/fa6";
import { numberFormat } from "../../utils/numerral"
import { IoIosArrowForward } from "react-icons/io";
import { listAddress } from "../../service/member/address"
import toast from "react-hot-toast"

const Checkout = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [address, setAddress] = useState([])
    const [orderData, setOrderData] = useState(null)
    const [selectedInstallment, setSelectedInstallment] = useState(null)
    const [selectedPaymentId, setSelectedPaymentId] = useState(null)
    const [selectedAddressId, setSelectedAddressId] = useState(null)
    const [selectedBank, setSelectedBank] = useState(null)
    const [selectIns, setSelectedIns] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            const res = await getDetailOrder(id)
            setOrderData(res.data)

            // default เลือกตัวแรก
            if (res.data.payments.length > 0) {
                setSelectedPaymentId(res.data.payments[0].payment_method_id)
            }

            // หา payment_method_id === 3
            const installmentPayment = res.data.payments.find(
                p => p.payment_method_id === 3
            )

            if (installmentPayment) {
                setSelectedInstallment(installmentPayment.installment_min)
            }
        }
        fetchOrder()
    }, [id])

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await listAddress()
                setAddress(res.data.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchAddress();
    }, [])

    // รับค่ากลับจากหน้า address
    const location = useLocation()
    useEffect(() => {
        if (location.state?.selectedAddressId) {
            setSelectedAddressId(location.state.selectedAddressId)
        }
    }, [location.state])

    const selectedAddress = address.find(a => a.id === selectedAddressId)
        || address.find(a => a.is_default)
        || address[0]

    if (!orderData) return <p>Loading...</p>


    const payments = orderData.payments || []
    const info = orderData.info || {}

    console.log(info)


    const selectedPayment = payments.find(
        p => p.payment_method_id === selectedPaymentId
    ) || {}

    // console.log(selectedPayment)

    const calculateDiscountDetail = (payment) => {
        if (!payment) return { levelDiscount: 0, paymentPercentDiscount: 0, paymentAmountDiscount: 0, total: 0 }

        const netTotal = parseFloat(payment.net_total) || 0
        const premium_discount = (parseFloat(info.premium_discount) || 0) / 100
        const level_discount_percent = (parseFloat(payment.group_discount_percent) || 0) / 100
        const payment_discount_percent = (parseFloat(payment.payment_discount_percent) || 0) / 100
        const payment_discount_amount = parseFloat(payment.payment_discount_amount) || 0

        const levelDiscount = netTotal * (premium_discount + level_discount_percent)
        const paymentPercentDiscount = (netTotal * payment_discount_percent) + payment_discount_amount
        // const paymentAmountDiscount = 

        return {
            levelDiscount,
            paymentPercentDiscount,
            // paymentAmountDiscount,
            total: levelDiscount + paymentPercentDiscount
        }
    }

    const discountDetail = calculateDiscountDetail(selectedPayment)

    const finalTotal = selectedPayment?.selling_price_final || 0

    console.log(selectedPayment)

    const handleSubmit = async () => {
        // คำนวณ installment ที่จะส่ง
        const installment = selectedPaymentId === 3
            ? (selectedPayment.installment_min
                ? (selectedInstallment || selectedPayment.installment_min)  // เลือกได้
                : selectedPayment.installment_max)                           // fix
            : selectedPayment.installment_max || null

        const payload = {
            address_id: selectedAddress?.id,
            payment_method_id: selectedPaymentId,
            installment: installment,
            bank_id: selectedPaymentId === 4 ? selectedBank : null,
            credit_installment: selectedPaymentId === 4 ? selectedInstallment : null,
            selling_price: parseInt(finalTotal),
            discount_price: parseInt(discountDetail.total),
            snap_discount_pct: parseInt(selectedPayment.payment_discount_percent || 0),
            snap_discount_amt: parseInt(selectedPayment.payment_discount_amount || 0),
            snap_charge: selectedPayment.charge || 0,
            snap_first_payment: selectedPayment.first_payment_amount || 0,
            snap_group_discount: selectedPayment.group_discount_percent || 0
        }

        try {
            const res = await confirmOrder(id, payload)
            navigate('/store/order')
            toast.success(res.data.msg)
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }


    return (
        <div className="p-5 font-prompt space-y-3">
            <div
                onClick={() => navigate('/store/address-select', {
                    state: {
                        fromCheckout: true,
                        orderId: id,
                        currentAddressId: selectedAddress?.id
                    }
                })}
                className="flex items-center justify-between bg-white text-text-primary border border-border/25 rounded-md p-2 cursor-pointer"
            >
                <div className="flex items-baseline gap-1">
                    <FaLocationDot className="size-3 fill-main" />
                    <div className="flex-1">
                        <p className="flex gap-2 items-baseline-last font-semibold text-sm">{selectedAddress?.full_name} <span className="font-normal text-xs text-gray-400">{selectedAddress?.phone}</span></p>
                        <span className="font-normal text-xs text-gray-400">{selectedAddress?.address_line} {selectedAddress?.subdistrict} {selectedAddress?.district} {selectedAddress?.province} {selectedAddress?.zipcode}</span>
                    </div>
                </div>
                <IoIosArrowForward className="text-gray-400" />
            </div>
            <div className="bg-white border border-border/25 rounded-md p-2">
                <div className="flex items-center gap-1 mb-3">
                    <FaNoteSticky className="size-3 text-text-primary" />
                    <p className="font-semibold text-sm text-text-primary">{info.compare_id ? info.compare_id : '-'}</p>
                </div>
                <CardPremiumList premiums={info} have={false} final={selectedPayment.selling_price_final} />
            </div>
            <div className="bg-white border border-border/25 rounded-md p-2">
                <p className="font-semibold text-sm text-text-primary mb-3">ช่องทางชำระเงิน</p>
                <div className="space-y-3">
                    {payments.map((i, index) => (
                        <details
                            key={i.payment_method_id}
                            className="collapse bg-base-100 border border-base-300 text-text-primary"
                            name={`payment-${i.payment_method_id}`}
                            defaultOpen={index === 0}  // เปิดอันแรกไว้
                        >
                            <summary className="collapse-title font-medium text-sm flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={i.payment_method_id}
                                    name="payment"
                                    className="radio radio-xs"
                                    checked={selectedPaymentId === i.payment_method_id}
                                    onChange={() => setSelectedPaymentId(i.payment_method_id)}
                                />
                                {i.name_payment}
                            </summary>

                            <div className="collapse-content text-xs space-y-1">
                                {i.payment_discount_percent > 0 && (
                                    <div className="flex justify-between">
                                        <div className="space-x-3">
                                            <span className="text-gray-500">ส่วนลดเปอร์เซนต์</span>
                                            <span className="text-main">{i.payment_discount_percent}%</span>
                                        </div>
                                        <span className="text-main">-฿{numberFormat(discountDetail.paymentPercentDiscount)}</span>
                                    </div>
                                )}
                                {i.payment_discount_amount > 0 && (
                                    <div className="flex justify-between">
                                        <div className="space-x-3">
                                            <span className="text-gray-500">ส่วนลดเงินบาท</span>
                                            <span className="text-main">฿{i.payment_discount_amount}</span>
                                        </div>
                                        <span className="text-main">-฿{i.payment_discount_amount}</span>
                                    </div>
                                )}
                                {i.payment_method_id === 3 && (
                                    <>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">งวดแรก</span>
                                            <span>{i.first_payment_amount ? `฿${numberFormat(i.first_payment_amount)}` : '-'}</span>
                                        </div>
                                        {/* แบบ fix งวด */}
                                        {!i.installment_min && i.installment_max && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">จำนวนงวด</span>
                                                <span>{i.installment_max ? `${i.installment_max} งวด` : '-'}</span>
                                            </div>
                                        )}
                                        {/* แบบไม่ fix */}
                                        {(i.installment_min && i.installment_max) && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">จำนวนงวด</span>
                                                    <span>{i.installment_min} - {i.installment_max} งวด</span>
                                                </div>
                                                <fieldset className="fieldset font-prompt text-text-primary p-0">
                                                    <select
                                                        className="select select-sm w-full"
                                                        value={selectedInstallment || i.installment_min}
                                                        onChange={(e) => setSelectedInstallment(Number(e.target.value))}
                                                    >
                                                        {Array.from(
                                                            { length: i.installment_max - i.installment_min + 1 },
                                                            (_, idx) => i.installment_min + idx
                                                        ).map((num) => (
                                                            <option key={num} value={num}>
                                                                {num} งวด
                                                            </option>

                                                        ))}
                                                    </select>
                                                </fieldset>
                                            </>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">ค่าธรรมเนียม</span>
                                            <span className="text-gray-500">{i.charge ? `฿${parseInt(i.charge)}` : '-'}</span>
                                        </div>
                                        {
                                            (i.first_payment_amount && i.charge) && (
                                                <div className="flex justify-between">
                                                    <p className="text-gray-500">ชำระงวดแรก + ค่าธรรมเนียม <span>{`${i.first_payment_amount}+${parseInt(i.charge)}`} = </span></p>
                                                    <span>฿{numberFormat(parseFloat(i.first_payment_amount || 0) + parseInt(i.charge || 0))}</span>
                                                </div>
                                            )
                                        }

                                        <div className="flex justify-between">
                                            {(i.installment_min && i.installment_max) && (
                                                <>
                                                    <p className="text-gray-500">
                                                        งวดที่ {
                                                            i.installment_min === (selectedInstallment || i.installment_min)
                                                                ? i.installment_min
                                                                : `${i.installment_min} - ${selectedInstallment || i.installment_min}`
                                                        } งวดละ
                                                    </p>
                                                    <span className="font-semibold">
                                                        {(() => {
                                                            const installCount = selectedInstallment || i.installment_min
                                                            const firstAndCharge = parseFloat(i.first_payment_amount || 0) + parseInt(i.charge || 0)
                                                            const remaining = parseFloat(i.selling_price_final || 0) - firstAndCharge
                                                            const perInstallment = installCount > 1 ? remaining / (installCount - 1) : remaining
                                                            return `฿${perInstallment}`
                                                        })()}
                                                    </span>
                                                </>
                                            )}

                                        </div>
                                    </>
                                )}
                                {i.payment_method_id === 4 && (
                                    <>
                                        {i.credit_banks?.length > 0 && (
                                            <div className="space-y-2 mt-1">
                                                <p className="text-gray-500 font-medium">ธนาคารที่ร่วมรายการ</p>
                                                {i.credit_banks.map((bank) => (
                                                    <div key={bank.bank_id} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            {bank.logo_url && (
                                                                <img
                                                                    src={bank.logo_url}
                                                                    className="w-6 h-6 object-contain rounded"
                                                                />
                                                            )}
                                                            <span className="text-gray-500">{bank.bank_name}</span>
                                                        </div>
                                                        <span className="text-gray-500">
                                                            {bank.installments.map(ins => ins.installment_month).join(', ')} เดือน
                                                        </span>
                                                    </div>
                                                ))}
                                                {/* ลูกค้าเลือกธนาคารและงวด */}
                                                {selectedPaymentId === 4 && i.credit_banks?.length > 0 && (
                                                    <div className="space-y-2 mt-2">
                                                        <fieldset className="fieldset font-prompt text-text-primary p-0">
                                                            <legend className="text-gray-500 text-xs mb-1">เลือกธนาคาร</legend>
                                                            <select
                                                                className="select select-sm w-full"
                                                                value={selectedBank || ''}
                                                                onChange={(e) => {
                                                                    setSelectedBank(Number(e.target.value))
                                                                    setSelectedInstallment(null)  // reset งวด
                                                                }}
                                                            >
                                                                <option value=''>เลือกธนาคาร</option>
                                                                {i.credit_banks.map(bank => (
                                                                    <option key={bank.bank_id} value={bank.bank_id}>
                                                                        {bank.bank_name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </fieldset>

                                                        {/* เลือกงวดตามธนาคารที่เลือก */}
                                                        {selectedBank && (
                                                            <fieldset className="fieldset font-prompt text-text-primary p-0">
                                                                <legend className="text-gray-500 text-xs  mb-1">เลือกจำนวนงวด</legend>
                                                                <select
                                                                    className="select select-sm w-full"
                                                                    value={selectedInstallment || ''}
                                                                    onChange={(e) => setSelectedInstallment(Number(e.target.value))}
                                                                >
                                                                    <option value=''>เลือกงวด</option>
                                                                    {i.credit_banks
                                                                        .find(b => b.bank_id === selectedBank)
                                                                        ?.installments.map(ins => (
                                                                            <option key={ins.installment_month} value={ins.installment_month}>
                                                                                {ins.installment_month} เดือน
                                                                            </option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </fieldset>
                                                        )}

                                                        {/* งวดละ */}
                                                        {selectedInstallment && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-500">งวดละประมาณ</span>
                                                                <span className="font-semibold">
                                                                    ฿{numberFormat(i.selling_price_final / selectedInstallment)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    </>
                                )}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
            <div className="bg-white text-text-primary border border-border/25 rounded-md p-2">
                <p className="font-semibold text-sm mb-3">ข้อมูลการชำระเงิน</p>
                <div className="space-y-2 ">
                    <div className="flex justify-between text-xs text-gray-500">
                        <div className="space-x-3">
                            <p>ส่วนลดวิธีการชำระเงิน {numberFormat(selectedPayment.payment_discount_percent)} % + ลดอีก {numberFormat(selectedPayment.payment_discount_amount)}</p>
                        </div>
                        <p className="text-main">-฿{numberFormat(discountDetail.paymentPercentDiscount)}</p>
                    </div>
                    {discountDetail.levelDiscount > 0 && (
                        <div className="flex justify-between text-xs text-gray-500">
                            <div className="space-x-3 flex">
                                <p>ส่วนลดเลเวล</p>
                                <p>{numberFormat(selectedPayment.group_discount_percent)} %</p>
                            </div>
                            <p className="text-main">-฿{numberFormat(discountDetail.levelDiscount)}</p>
                        </div>
                    )}
                    {/* รวมส่วนลด */}
                    <div className="flex justify-between text-xs text-gray-500">
                        <p>รวมส่วนลดทั้งหมด</p>
                        <p className="text-main">-฿{numberFormat(discountDetail.total)}</p>
                    </div>
                    <div className="w-full h-px bg-border/25 my-2" />
                    <div className="flex justify-between text-xs">
                        <p>ยอดเงินชำระทั้งหมด</p>
                        <p className="font-semibold">฿{numberFormat(finalTotal)}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={handleSubmit} className="btn text-white bg-main">สั่งซื้อ</button>
            </div>
        </div >
    )
}
export default Checkout