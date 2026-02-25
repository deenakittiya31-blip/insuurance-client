import Select from "../form/Select"

const InsuranceInfoSection = ({ selectedCompany, onChange, form, company, typeInsur, promotion }) => {
    return (
        <>
            <h1 className='title text-main'>ประกันภัย</h1>
            <div className='grid grid-cols-3 gap-3'>
                <div className='flex gap-5 items-end'>
                    {selectedCompany?.logo_url && (
                        <div className="avatar">
                            <div className="w-14 rounded">
                                <img src={selectedCompany.logo_url} className="object-contain" />
                            </div>
                        </div>
                    )}
                    <div className='flex-1'>
                        <Select
                            text='ชื่อบริษัท'
                            data={company}
                            name='insurance_company'
                            value={form.insurance_company}
                            onChange={onChange}
                            valueKey='id'
                            labelKey='namecompany'
                        />
                    </div>
                </div>
                <Select
                    text='ประเภทประกัน'
                    data={typeInsur}
                    name='insurance_type'
                    value={form.insurance_type}
                    onChange={onChange}
                    valueKey='id'
                    labelKey='nametype'
                />
                <Select
                    text='โปรโมชั่น'
                    data={promotion}
                    name='promotion_id'
                    value={form.promotion_id}
                    onChange={onChange}
                    valueKey='id'
                    labelKey='promotion_name'
                />
            </div>
        </>
    )
}
export default InsuranceInfoSection 