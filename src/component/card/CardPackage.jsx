import { FaRegEye } from "react-icons/fa6"
import { dateFormatNoTime } from "../../utils/dateformat"
import { numberFormat } from "../../utils/numerral"

const CardPackage = ({ data, onRead }) => {
    const getPaymentColor = (paymentId) => {
        switch (paymentId) {
            case 1: return 'bg-green-500'   // เงินสด
            case 2: return 'bg-info'    // บัตรเครดิตครั้งเดียว
            case 3: return 'bg-blue-500'  // ผ่อนเงินสด
            case 4: return 'bg-yellow-500'  // ผ่อนบัตรเครดิต
            default: return 'bg-gray-500'
        }
    }

    return (
        <div>
            <button className='btn btn-sm btn-soft btn-info flex flex-1 gap-1 h-7' onClick={onRead}><FaRegEye size={13} /> ดู</button>
            <dialog id="cardpackage" className="modal">
                <div className="modal-box max-w-2xl max-h-162.5">
                    <h3 className="font-bold text-lg tracking-wide">รายละเอียดแพ็กเกจ</h3>
                    <div className="w-full h-px bg-border my-3" />
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-3 text-sm">
                            <div className="grid grid-cols-2 gap-y-3">
                                <p>ชื่อแพ็กเกจ : <span className="font-medium">{data.package_name}</span></p>
                                <p>วันเริ่มต้นและสิ้นสุด : <span className="font-medium">{dateFormatNoTime(data.start_date)} ถึง {dateFormatNoTime(data.end_date)}</span></p>
                                <div>เบี้ยในแพ็กเกจ : <button className="w-5 h-5 rounded-xs text-white bg-gray-300">{data.premium_count}</button> รายการ</div>

                                <p>สถานะแพ็กเกจ : {data.is_active ? <span className="bg-green-500 font-medium text-xs px-1 rounded-sm text-white">การใช้งานปกติ</span> : <span className="bg-red-500 font-medium text-xs px-1 rounded-sm text-white">ปิดการใช้งาน</span>}</p>

                                <p>สถานะซ่อม : <span className="font-medium">{data.repair_type}</span></p>
                                <p>บริษัทประกันภัย : <span className="font-medium">{data.namecompany}</span></p>
                                <p>ประเภทประกันภัย : <span className="font-medium">{data.nametype}</span></p>
                                <p>โปรโมชั่น : <span className="font-medium">{data.promotion_name}</span></p>
                            </div>
                            <div>
                                <p>ประเภทรถยนต์ : </p>
                                {data.car_usage_type_id?.map((i, index) => (
                                    <span key={i.id} className="font-semibold">
                                        {i.usage}({i.code_usage})
                                        {index < data.car_usage_type_id.length - 1 && ' / '}
                                    </span>
                                ))}
                            </div>
                            <p>ยี่ห้อรถยนต์ :
                                {data.car_brand_id?.map((i, index) => (
                                    <span key={i.id} className="font-semibold">
                                        {i.name}
                                        {index < data.car_brand_id.length - 1 && ' / '}
                                    </span>
                                ))}
                            </p>
                            <div>
                                <p>รุ่นรถยนต์ : </p>
                                {data.car_model_id?.map((i, index) => (
                                    <span key={i.id} className="font-semibold">
                                        {i.name}
                                        {index < data.car_model_id.length - 1 && ' / '}
                                    </span>
                                ))}
                            </div>
                            <div>
                                <p>ประเภทการใช้งาน (ย่อย) : </p>
                                {data.compusory_id?.map((i, index) => (
                                    <span key={i.id} className="font-semibold">
                                        {i.code_sub}
                                        {index < data.compusory_id
                                            .length - 1 && ' / '}
                                    </span>
                                ))}
                            </div>
                            <p>เงื่อนไข : เครื่องยนต์ / รถยนต์ <span className="font-semibold">{data.engine_size}</span></p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg tracking-wide">ความคุ้มครอง</h3>
                            <div className="w-full h-px bg-border my-3" />
                            <div className="grid grid-cols-3 gap-y-3">
                                <p>บาดเจ็บ เสียชีวิต : <span className="font-semibold">{numberFormat(data.thirdparty_injury_death_per_person)}</span></p>
                                <p>บาดเจ็บ เสียชีวิตสูงสุด : <span className="font-semibold">{numberFormat(data.thirdparty_injury_death_per_accident)}</span></p>
                                <p>ทรัพย์สินคู่กรณี : <span className="font-semibold">{numberFormat(data.thirdparty_property)}</span></p>
                                <p>คุ้มครองน้ำท่วม : <span className="font-semibold">{numberFormat(data.flood_cover)}</span></p>
                                <p>ค่าเสียหายส่วนแรก : <span className="font-semibold">{numberFormat(data.car_own_damage_deductible)}</span></p>
                                <p>อุบัติเหตุส่วนบุคคล : <span className="font-semibold">{numberFormat(data.additional_personal_permanent_driver_cover)}</span></p>
                                <p>ค่ารักษาพยาบาล : <span className="font-semibold">{numberFormat(data.additional_medical_expense_cover)}</span></p>
                                <p>ประกันตัวผู้ขับขี่ : <span className="font-semibold">{numberFormat(data.additional_bail_bond)}</span></p>
                                <p >จำนวนที่นั่ง : <span className="font-semibold">{data.additional_personal_permanent_driver_number}</span></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg tracking-wide">วิธีการชำระเงิน</h3>
                            <div className="w-full h-px bg-border my-3" />
                            <div className="font-semibold mb-3">
                                ที่อนุญาติ : {data.payments?.map((i, idx) => (
                                    <span key={idx} className={`${getPaymentColor(i.payment_method_id)} px-1 rounded-sm text-white mr-3`}>{i.payment_name}</span>
                                )
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                {data.payments?.map((i, idx) => (
                                    <div key={idx}>
                                        <p className="font-semibold">{i.payment_name}</p>
                                        <div className="grid grid-cols-2">
                                            {
                                                i.payment_method_id === 1 && (
                                                    <>
                                                        <p>ส่วนลดเปอร์เซนต์ : <span className="font-semibold">{i.discount_percent} %</span></p>
                                                        <p>ส่วนลดจำนวนเงิน : <span className="font-semibold">{i.discount_amount} เดือน</span></p>
                                                    </>
                                                )
                                            }
                                            {
                                                i.payment_method_id === 2 && (
                                                    <>
                                                        <p>ส่วนลดเปอร์เซนต์ : <span className="font-semibold">{i.discount_percent} %</span></p>
                                                        <p>ส่วนลดจำนวนเงิน : <span className="font-semibold">{i.discount_amount} เดือน</span></p>
                                                    </>
                                                )
                                            }
                                            {
                                                i.payment_method_id === 3 && (
                                                    <>
                                                        <p>เงินงวดแรก : <span className="font-semibold">{i.first_payment_amount} บาท</span></p>
                                                        <p>ส่วนลดเปอร์เซนต์ ผ่อน : <span className="font-semibold">{i.discount_percent} %</span></p>
                                                        <p>ส่วนลดจำนวนเงิน ผ่อน : <span className="font-semibold">{i.discount_amount} บาท</span></p>
                                                        <p>ค่าธรรมเนียม : <span className="font-semibold">{i.charge} บาท</span></p>
                                                        <p>จำนวนงวด : <span className="font-semibold">{i.installment_min} เดือน</span></p>
                                                        <p>งวดต่ำสุด : <span className="font-semibold">{i.installment_min} เดือน</span></p>
                                                        <p>งวดสูงสุด : <span className="font-semibold">{i.installment_max} เดือน</span></p>
                                                    </>
                                                )
                                            }
                                            {
                                                i.payment_method_id === 4 && (
                                                    <>
                                                        <p>ส่วนลดเปอร์เซนต์ ผ่อน : <span className="font-semibold">{i.discount_percent} %</span></p>
                                                        <p>ส่วนลดจำนวนเงิน ผ่อน : <span className="font-semibold">{i.discount_amount} บาท</span></p>
                                                        <p>จำนวนงวด : <span className="font-semibold">{i.installment_min} งวด</span></p>
                                                    </>
                                                )
                                            }
                                        </div>

                                    </div>
                                )
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg tracking-wide">ส่วนลดกลุ่มลูกค้า</h3>
                            <div className="w-full h-px bg-border my-3" />
                            <div className="grid grid-cols-5 gap-y-3">
                                {
                                    data.groups?.map((g, idx) => (
                                        <p key={idx}>{g.group_name} : <span className="font-semibold">{g.discount_percent} %</span></p>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </div >
    )
}
export default CardPackage