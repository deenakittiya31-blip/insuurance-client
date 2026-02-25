import TextInput from '../form/TextInput'

const CoverageSection = ({ onChange, form }) => {
    return (
        <div>
            <h1 className='title text-center '>ความคุ้มครองกรมธรรณ์</h1>
            <div className='flex flex-col gap-5'>
                <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
                    <div className='col-span-2'>
                        <h2 className='font-semibold'>ความรับผิดต่อบุคคลภายนอก</h2>
                    </div>
                    <TextInput
                        width='w-full'
                        name='thirdparty_injury_death_per_person'
                        title='บาดเจ็บ เสียชีวิต(ต่อคน)'
                        type='number'
                        onChange={onChange}
                        value={form.thirdparty_injury_death_per_person}
                    />
                    <TextInput
                        width='w-full'
                        name='thirdparty_injury_death_per_accident'
                        title='บาดเจ็บ เสียชีวิตสูงสุด(ต่อคร้ัง)'
                        type='number'
                        onChange={onChange}
                        value={form.thirdparty_injury_death_per_accident}
                    />
                    <TextInput
                        width='w-full'
                        name='thirdparty_property'
                        title='ความรับผิดต่อทรัพย์สิน'
                        type='number'
                        onChange={onChange}
                        value={form.thirdparty_property}
                    />
                </div>
                <div>
                    <h2 className='font-semibold mb-3'>ความรับผิดต่อรถเอาประกันภัย
                    </h2>
                    <div className='grid grid-cols-2 gap-3'>
                        <TextInput
                            width='w-full'
                            name='flood_cover'
                            title='คุ้มครองน้ำท่วม'
                            type='number'
                            onChange={onChange}
                            value={form.flood_cover}
                        />
                        <TextInput
                            width='w-full'
                            name='car_own_damage_deductible'
                            title='ค่าเสียหายส่วนแรก'
                            type='number'
                            onChange={onChange}
                            value={form.car_own_damage_deductible}
                        />
                        <TextInput
                            width='w-full'
                            name='car_own_damage'
                            title='ความเสียหายต่อรถยนต์'
                            type='number'
                            onChange={onChange}
                            value={form.car_own_damage}
                        />
                    </div>
                </div>
                <div>
                    <h2 className='font-semibold mb-3'>ความคุ้มครองตามเอกสารแนบท้าย
                    </h2>
                    <div className='grid grid-cols-2 gap-x-3 gap-y-5'>
                        <TextInput
                            width='w-full'
                            name='additional_personal_permanent_driver_cover'
                            title='อุบัติเหตุส่วนบุคคล'
                            type='number'
                            onChange={onChange}
                            value={form.additional_personal_permanent_driver_cover}
                        />
                        <TextInput
                            width='w-full'
                            name='additional_medical_expense_cover'
                            title='ค่ารักษาพยาบาล'
                            type='number'
                            onChange={onChange}
                            value={form.additional_medical_expense_cover}
                        />
                        <TextInput
                            width='w-full'
                            name='additional_bail_bond'
                            title='ประกันตัวผู้ขับขี่'
                            type='number'
                            onChange={onChange}
                            value={form.additional_bail_bond}
                        />
                        <TextInput
                            width='w-full'
                            name='additional_personal_permanent_driver_number'
                            title='จำนวนที่นั่ง'
                            type='number'
                            onChange={onChange}
                            value={form.additional_personal_permanent_driver_number}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CoverageSection