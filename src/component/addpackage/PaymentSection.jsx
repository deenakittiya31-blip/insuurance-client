import InstallmentSetting from "../payment/InstallmentSetting"
import TextInput from '../form/TextInput'

const PaymentSection = ({ payment, payments, onToggle, onUpdate, hasPayment }) => {
    return (
        <div>
            <h1 className='title'>วิธีการชำระเงิน</h1>
            <div className='grid gap-5'>
                <div className='grid grid-cols-2 gap-3'>
                    {
                        payment.map((i) => (
                            <label key={i.id} className='flex items-center gap-3 text-sm'>
                                <input
                                    type="checkbox"
                                    className='checkbox checkbox-sm checkbox-info text-white'
                                    checked={hasPayment(i.id)}
                                    onChange={e =>
                                        onToggle(i.id, e.target.checked)
                                    }
                                />
                                {i.name_payment}
                            </label>
                        ))
                    }
                </div>
                {hasPayment(1) && (
                    <>
                        <h2 className="font-semibold text-info">ชำระด้วยเงินสด</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                name="discount_percent"
                                title="ส่วนลดเปอร์เซนต์ ชำระเต็มจำนวน"
                                type='number'
                                value={
                                    payments.find(p => p.payment_method_id === 1)
                                        ?.discount_percent || ''
                                }
                                onChange={e =>
                                    onUpdate(1, 'discount_percent', e.target.value)
                                }
                            />
                            <TextInput
                                name="discount_amount"
                                title="ส่วนลดจำนวนเงิน ชำระเต็มจำนวน"
                                type='number'
                                value={
                                    payments.find(p => p.payment_method_id === 1)
                                        ?.discount_amount || ''
                                }
                                onChange={e =>
                                    onUpdate(1, 'discount_amount', e.target.value)
                                }
                            />
                        </div>
                    </>
                )}
                {hasPayment(2) && (
                    <>
                        <h2 className="font-semibold text-info">ชำระด้วยบัตรเครดิตครั้งเดียว</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                name="discount_percent"
                                title="ส่วนลดเปอร์เซนต์ ชำระเต็มจำนวน"
                                type='number'
                                value={
                                    payments.find(p => p.payment_method_id === 2)
                                        ?.discount_percent || ''
                                }
                                onChange={e =>
                                    onUpdate(2, 'discount_percent', e.target.value)
                                }
                            />
                            <TextInput
                                name="discount_amount"
                                title="ส่วนลดจำนวนเงิน ชำระเต็มจำนวน"
                                type='number'
                                value={
                                    payments.find(p => p.payment_method_id === 2)
                                        ?.discount_amount || ''
                                }
                                onChange={e =>
                                    onUpdate(2, 'discount_amount', e.target.value)
                                }
                            />
                        </div>
                    </>
                )}
                {hasPayment(3) && (
                    <>
                        <h2 className="font-semibold text-info">ผ่อนเงินสด</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                title="เงินงวดแรก"
                                type='number'
                                value={
                                    payments.find(p => p.payment_method_id === 3)
                                        ?.first_payment_amount || ''
                                }
                                onChange={e =>
                                    onUpdate(3, 'first_payment_amount', e.target.value)
                                }
                            />
                            <TextInput
                                title="ส่วนลดเปอร์เซนต์ ผ่อน"
                                type='number'
                                value={
                                    payments.find(p => p.payment_method_id === 3)
                                        ?.discount_percent || ''
                                }
                                onChange={e =>
                                    onUpdate(3, 'discount_percent', e.target.value)
                                }
                            />
                            <TextInput
                                title="ส่วนลดจำนวนเงิน ผ่อน"
                                type='number'
                                value={
                                    payments.find(p => p.payment_method_id === 3)
                                        ?.discount_amount || ''
                                }
                                onChange={e =>
                                    onUpdate(3, 'discount_amount', e.target.value)
                                }
                            />
                            <TextInput
                                title="ค่าธรรมเนียม"
                                type='number'
                                value={payments.find(p => p.payment_method_id === 3)?.charge || ''}
                                onChange={e => onUpdate(3, 'charge', e.target.value)}
                            />
                            <div className="col-span-2">
                                <InstallmentSetting
                                    value={{
                                        min: payments.find(p => p.payment_method_id === 3)?.installment_min ?? '',
                                        max: payments.find(p => p.payment_method_id === 3)?.installment_max ?? '',
                                    }}
                                    onChange={({ min, max }) => {
                                        onUpdate(3, 'installment_min', min)
                                        onUpdate(3, 'installment_max', max)
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
                {hasPayment(4) && (
                    <>
                        <h2 className="font-semibold text-info">ผ่อนบัตรเครดิต</h2>
                        <div className="grid grid-cols-3 gap-3">
                            <TextInput
                                title="ส่วนลดเปอร์เซนต์ ผ่อน"
                                type='number'
                                value={
                                    payments.find(p => p.payment_method_id === 4)
                                        ?.discount_percent || ''
                                }
                                onChange={e =>
                                    onUpdate(4, 'discount_percent', e.target.value)
                                }
                            />
                            <TextInput
                                title="ส่วนลดจำนวนเงิน ผ่อน"
                                type='number'
                                value={
                                    payments.find(p => p.payment_method_id === 4)
                                        ?.discount_amount || ''
                                }
                                onChange={e =>
                                    onUpdate(4, 'discount_amount', e.target.value)
                                }
                            />
                            <TextInput
                                title="จำนวนงวด"
                                type="number"
                                value={
                                    payments.find(p => p.payment_method_id === 4)
                                        ?.installment_max || ''
                                }
                                onChange={e =>
                                    onUpdate(4, 'installment_max', e.target.value)
                                }
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default PaymentSection