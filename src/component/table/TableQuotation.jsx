import TextInput from '../form/TextInput'

const TableQuotation = ({ data, onSubmit, onChangData, quotationID }) => {
    return (
        <div className="flex flex-col gap-2 font-prompt text-text-primary">
            <div className='flex justify-between items-baseline-last'>
                <h1 className="font-bold">📑 ข้อมูลทั้งหมด</h1>
                {
                    quotationID && (
                        <button onClick={onChangData} className='btn bg-red-400 rounded-md px-7 text-white hover:bg-red-600'>เปลี่ยนไฟล์</button>
                    )
                }

            </div>

            <form onSubmit={onSubmit} className='grid gap-5 items-end lg:grid-cols-2'>
                <TextInput
                    width='w-auto'
                    title='เลขที่ใบเสนอราคา'
                    name='quotation_number'
                    type='text'
                    placeholder='กรอกเลขที่ใบเสนอราคา'
                    value={data.quotation_number || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='วันที่ออกใบเสนอราคา'
                    name='quotation_date'
                    type='text'
                    placeholder='กรอกวันที่ออกใบเสนอราคา'
                    value={data.quotation_date || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='ประเภทซ่อม'
                    name='repair_type'
                    type='text'
                    placeholder='กรอกประเภทซ่อม'
                    value={data.repair_type || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='ขนาดเครื่องยนต์ CC'
                    name='engine_size'
                    type='text'
                    placeholder='กรอกขนาดเครื่องยนต์ CC'
                    value={data.engine_size || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='ประเภทประกัน'
                    name='insurance_type'
                    type='text'
                    placeholder='กรอกประเภทประกัน'
                    value={data.insurance_type || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='ทุนประกัน'
                    name='coverage_amount'
                    type='text'
                    placeholder='กรอกทุนประกัน'
                    value={data.coverage_amount || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='เบี้ยประกันรวม'
                    name='premium_total'
                    type='text'
                    placeholder='กรอกเบี้ยประกันรวม'
                    value={data.premium_total || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='ความรับผิดต่อชีวิตร่างกายบุคคลภายนอก(ต่อคน)'
                    name='thirdparty_injury_death_per_person'
                    type='text'
                    placeholder='กรอกข้อมูล...'
                    value={data.thirdparty_injury_death_per_person || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='ความรับผิดต่อชีวิตร่างกายบุคคลภายนอก(ต่อคร้ัง)'
                    name='thirdparty_injury_death_per_accident'
                    type='text'
                    placeholder='กรอกข้อมูล...'
                    value={data.thirdparty_injury_death_per_accident || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='ความรับผิดต่อทรัพย์สินของบุคคลภายนอก(ต่อคร้ัง)'
                    name='thirdparty_property'
                    type='text'
                    placeholder='กรอกข้อมูล...'
                    value={data.thirdparty_property || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='ความเสียหายต่อรถยนต์'
                    name='car_own_damage'
                    type='text'
                    placeholder='กรอกข้อมูล...'
                    value={data.car_own_damage || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='ค่าเสียหายส่วนแรก(ต่อคร้ัง)'
                    name='car_own_damage_deductible'
                    type='text'
                    placeholder='กรอกข้อมูล...'
                    value={data.car_own_damage_deductible || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='รถยนต์สูญหาย/ ไฟไหม้'
                    name='car_fire_theft'
                    type='text'
                    placeholder='กรอกข้อมูล...'
                    value={data.car_fire_theft || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='อุบัติเหตุส่วนบุคคล(ต่อคน)'
                    name='additional_personal_permanent_driver_cover'
                    type='text'
                    placeholder='กรอกข้อมูล...'
                    value={data.additional_personal_permanent_driver_cover || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='ค่ารักษาพยาบาล(ต่อคน)'
                    name='additional_medical_expense_cover'
                    type='text'
                    placeholder='กรอกข้อมูล...'
                    value={data.additional_medical_expense_cover || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='การประกันตัวผู้ขับขี่(ต่อคร้ัง)'
                    name='additional_bail_bond'
                    type='text'
                    placeholder='กรอกข้อมูล...'
                    value={data.additional_bail_bond || ''}
                    readOnly
                />
                <TextInput
                    width='w-auto'
                    title='จำนวนที่นั่ง (ผู้ขับขี่รวมผู้โดยสาร)'
                    name='additional_personal_permanent_driver_number'
                    type='text'
                    placeholder='กรอกข้อมูล...'
                    value={data.additional_personal_permanent_driver_number || ''}
                    readOnly
                />
                <div className=''>
                    <button className='btn bg-green-500 rounded-md px-7 text-white hover:bg-green-600'>บันทึก</button>
                </div>
            </form>
        </div>
    )
}
export default TableQuotation