import { useEffect } from "react";
import useActionStore from "../../store/action-store"
import TextInput from "../form/TextInput"
import Select from "../form/Select";

const ModalCarUsage = ({ form, onSubmit, onChange }) => {
    const { cartype, getCarTypeSelect, carUsage, getCarUsageSelect } = useActionStore();

    useEffect(() => {
        getCarTypeSelect();
        getCarUsageSelect();
    }, [])
    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('modalcarusagetype').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="modalcarusagetype" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-md flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">ประเภทการใช้งานรถยนต์</h3>
                    <div className="grid grid-cols-2 gap-5 items-end">
                        <TextInput
                            width='w-auto'
                            title='ลำดับการมองเห็น'
                            name='visibility_no'
                            type='number'
                            placeholder='ลำดับ'
                            onChange={onChange}
                            value={form.visibility_no}
                        />
                        <TextInput
                            width='w-auto'
                            title='รหัส'
                            name='code'
                            type='text'
                            placeholder='กรอกรหัส'
                            onChange={onChange}
                            value={form.code}
                        />
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
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('modalcarusagetype').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}
export default ModalCarUsage