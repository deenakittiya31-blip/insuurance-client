import { useEffect } from "react";
import useActionStore from "../../store/action-store";
import TextInput from "../form/TextInput";
import Select from "../form/Select";

const EditCarUsage = ({ isOpen, onClose, onChange, onSubmit, form }) => {
    const { cartype, getCarTypeSelect, carUsage, getCarUsageSelect } = useActionStore();

    useEffect(() => {
        getCarTypeSelect();
        getCarUsageSelect();
    }, [])

    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20 z-50'>
            <form onSubmit={onSubmit} className="w-md p-6 radius-box flex flex-col gap-5 bg-white rounded-lg z-50">
                <h3 className="font-bold text-lg text-text-primary">ประเภทการใช้งานรถยนต์</h3>
                <TextInput
                    width='w-auto'
                    title='รหัส'
                    name='code'
                    type='text'
                    placeholder='กรอกรหัส'
                    onChange={onChange}
                    value={form.code}
                />
                <div className="grid grid-cols-2 gap-5 items-end">
                    <fieldset className="fieldset font-prompt text-text-primary p-0">
                        <legend className="fieldset-legend text-sm text-text-primary">ประเภทรถยนต์</legend>
                        <select
                            name='car_type_id'
                            onChange={onChange}
                            className="select w-full"
                            value={form.car_type_id}
                        >
                            <option value="" disabled={true}>โปรดเลือก</option>
                            {
                                cartype.map((i) => (
                                    <option
                                        key={i.id}
                                        value={i.id}
                                    >
                                        {i.code} {i.type}
                                    </option>
                                ))
                            }
                        </select>
                    </fieldset>
                    <Select
                        text='ประเภทการใช้งาน'
                        data={carUsage}
                        name='car_usage_id'
                        value={form.car_usage_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='usage_name'
                        required
                    />
                </div>
                <TextInput
                    width='w-auto'
                    title='รหัสประเภทการใช้งาน'
                    name='code_usage'
                    type='text'
                    placeholder='กรอกรหัส'
                    onChange={onChange}
                    value={form.code_usage}
                />
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}
export default EditCarUsage