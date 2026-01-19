import NumberFormat from '../form/NumberFormat'
import TextInput from '../form/TextInput'
import { NumericFormat } from 'react-number-format'

const TableQuotation = ({ data, onSubmit, onChange, quotation_id, onDelete }) => {
    return (
        <div className="flex flex-col gap-2 font-prompt text-text-primary">
            <div className='flex justify-between items-baseline-last'>
                <h1 className="font-bold text-xl">ข้อมูลจากเอกสาร</h1>
                {
                    quotation_id && (
                        <button onClick={onDelete} type='button' className='btn bg-red-400 rounded-md px-7 text-white hover:bg-red-600'>เปลี่ยนไฟล์</button>
                    )
                }
            </div>

            <form onSubmit={onSubmit} className='flex flex-col gap-5 items-end lg:grid-cols-2'>
                <TextInput
                    width='w-auto'
                    title='เลขที่ใบเสนอราคา'
                    name='quotation_number'
                    type='text'
                    placeholder='กรอกเลขที่ใบเสนอราคา'
                    value={data.quotation_number || ''}
                    onChange={onChange}
                />
                <TextInput
                    width='w-auto'
                    title='วันที่ออกใบเสนอราคา'
                    name='quotation_date'
                    type='text'
                    placeholder='กรอกวันที่ออกใบเสนอราคา'
                    value={data.quotation_date || ''}
                    onChange={onChange}
                />
                <TextInput
                    width='w-auto'
                    title='ประเภทซ่อม'
                    name='repair_type'
                    type='text'
                    placeholder='กรอกประเภทซ่อม'
                    value={data.repair_type || ''}
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.engine_size || ''}
                    name='engine_size'
                    title='ขนาดเครื่องยนต์ CC'
                    placeholder='กรอกขนาดเครื่องยนต์...'
                    onChange={onChange}
                />
                <TextInput
                    width='w-auto'
                    title='ประเภทประกัน'
                    name='insurance_type'
                    type='text'
                    placeholder='กรอกประเภทประกัน'
                    value={data.insurance_type || ''}
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.coverage_amount || ''}
                    name='coverage_amount'
                    title='ทุนประกัน'
                    placeholder='กรอกทุนประกัน...'
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.premium_total || ''}
                    name='premium_total'
                    title='เบี้ยประกันรวม'
                    placeholder='กรอกเบี้ยประกันรวม...'
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.thirdparty_injury_death_per_person || ''}
                    name='thirdparty_injury_death_per_person'
                    title='ความรับผิดต่อชีวิตร่างกายบุคคลภายนอก(ต่อคน)'
                    placeholder='กรอกข้อมูล...'
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.thirdparty_injury_death_per_accident || ''}
                    name='thirdparty_injury_death_per_accident'
                    title='ความรับผิดต่อชีวิตร่างกายบุคคลภายนอก(ต่อคร้ัง)'
                    placeholder='กรอกข้อมูล...'
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.thirdparty_property || ''}
                    name='thirdparty_property'
                    title='ความรับผิดต่อทรัพย์สินของบุคคลภายนอก(ต่อคร้ัง)'
                    placeholder='กรอกข้อมูล...'
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.car_own_damage || ''}
                    name='car_own_damage'
                    title='ความเสียหายต่อรถยนต์(ต่อคร้ัง)'
                    placeholder='กรอกข้อมูล...'
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.car_own_damage_deductible || ''}
                    name='car_own_damage_deductible'
                    title='ค่าเสียหายส่วนแรก(ต่อคร้ัง)'
                    placeholder='กรอกข้อมูล...'
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.car_fire_theft || ''}
                    name='car_fire_theft'
                    title='รถยนต์สูญหาย/ ไฟไหม้'
                    placeholder='กรอกข้อมูล...'
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.additional_personal_permanent_driver_cover || ''}
                    name='additional_personal_permanent_driver_cover'
                    title='อุบัติเหตุส่วนบุคคล(ต่อคน)'
                    placeholder='กรอกข้อมูล...'
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.additional_medical_expense_cover || ''}
                    name='additional_medical_expense_cover'
                    title='ค่ารักษาพยาบาล(ต่อคน)'
                    placeholder='กรอกข้อมูล...'
                    onChange={onChange}
                />
                <NumberFormat
                    value={data.additional_bail_bond || ''}
                    name='additional_bail_bond'
                    title='การประกันตัวผู้ขับขี่(ต่อคร้ัง)'
                    placeholder='กรอกข้อมูล...'
                    onChange={onChange}
                />
                <TextInput
                    width='w-auto'
                    title='จำนวนที่นั่ง (ผู้ขับขี่รวมผู้โดยสาร)'
                    name='additional_personal_permanent_driver_number'
                    type='text'
                    placeholder='กรอกข้อมูล...'
                    value={data.additional_personal_permanent_driver_number || ''}
                    onChange={onChange}
                />
                <div>
                    <button type='submit' className='btn rounded-md px-7 text-white bg-lime-600 hover:bg-lime-700'>บันทึก</button>
                </div>
            </form>
        </div>
    )
}
export default TableQuotation