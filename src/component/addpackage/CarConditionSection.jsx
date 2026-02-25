import SelectFormBrand from '../select/SelectFormBrand'
import SelectFormModel from '../select/SelectFormModel'
import SelectFormUsage from '../select/SelectFormUsage'
import SelectFormCompulsory from '../select/SelectFormCompulsory'
import Select from '../form/Select'

const CarConditionSection = ({ onChange, form, compusory, carUsageType, carModel, carbrand }) => {
    return (
        <div className='mt-15'>
            <h1 className='title'>เงื่อนไข</h1>
            <div className='grid lg:grid-cols-2 gap-5'>
                <SelectFormBrand
                    data={carbrand}
                    value={form.car_brand_id}
                    onChange={onChange}
                    name="car_brand_id"
                />
                <SelectFormModel
                    data={carModel}
                    value={form.car_model_id}
                    onChange={onChange}
                    name="car_model_id"
                />
                <SelectFormUsage
                    data={carUsageType}
                    value={form.car_usage_type_id}
                    onChange={onChange}
                    name="car_usage_type_id"
                />
                <SelectFormCompulsory
                    data={compusory}
                    value={form.compulsory_id}
                    onChange={onChange}
                    name="compulsory_id"
                />
            </div>
        </div>
    )
}
export default CarConditionSection