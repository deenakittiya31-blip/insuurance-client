import { useEffect, useState } from "react";
import useActionStore from "../../store/action-store";
import Select from "../form/Select";
import SelectSearch from "../form/SelectSearch";
import TextInput from "../form/TextInput";
import { listCarYearSelect } from "../../service/car/CarYear";

const EditCopyCompare = ({ isOpen, form, carmodel, onSubmit, onChange, onClose }) => {
    const [year, setYear] = useState([])
    const {
        getCarBrandSelect,
        carbrand,
        getCarUsageSelect,
        carUsage
    } = useActionStore();

    useEffect(() => {
        getCarBrandSelect();
        getCarUsageSelect();
        getCarYear();
    }, [])

    const getCarYear = async () => {
        try {
            const res = await listCarYearSelect();
            setYear(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    // console.log(carmodel)
    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt text-text-primary">คัดลอกใบเสนอราคา</h3>
                <TextInput
                    width='w-auto'
                    title='ถึง'
                    name='to_name'
                    type='text'
                    placeholder='ถึง...'
                    onChange={onChange}
                    value={form.to_name}
                />
                <TextInput
                    width='w-auto'
                    title='ทะเบียน'
                    name='details'
                    type='text'
                    placeholder='กรอกรายละเอียดทะเบียน...'
                    onChange={onChange}
                    value={form.details}
                />
                <div className="grid lg:grid-cols-2 gap-5 items-end-safe">
                    <SelectSearch
                        options={carbrand}
                        placeholder="ยี่ห้อรถยนต์"
                        value={form.car_brand_id}
                        onChange={onChange}
                        name='car_brand_id'
                    />
                    <Select
                        text='รุ่นรถยนต์'
                        data={carmodel}
                        name='car_model_id'
                        value={form.car_model_id || null}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='name'
                    />
                    <TextInput
                        width='w-auto'
                        title='รุ่นย่อยรถยนต์'
                        name='sub_car_model'
                        type='text'
                        placeholder='กรอกรายละเอียด'
                        onChange={onChange}
                        value={form.sub_car_model || null}
                    />
                    <fieldset className="fieldset font-prompt text-text-primary p-0">
                        <legend className="fieldset-legend text-sm text-text-primary">ปีรถยนต์</legend>
                        <select
                            name='car_year_id'
                            onChange={onChange}
                            className="select w-full"
                            value={form.car_year_id}
                        >
                            <option value="" disabled={true}>โปรดเลือก</option>
                            {
                                year.map((i) => (
                                    <option
                                        key={i.id}
                                        value={i.id}
                                    >
                                        {i.year_be}/{i.year_ad}
                                    </option>
                                ))
                            }
                        </select>
                    </fieldset>
                    <div className="col-span-2 ">
                        <Select
                            text='ประเภทการใช้งาน'
                            data={carUsage}
                            name='car_usage_id'
                            value={form.car_usage_id}
                            onChange={onChange}
                            valueKey='id'
                            labelKey='usage_name'
                        />
                    </div>
                </div>
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary">คัดลอก</button>
                </div>
            </form>
        </div>
    )
}
export default EditCopyCompare