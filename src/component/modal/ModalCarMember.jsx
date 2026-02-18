import Select from "../form/Select";
import SelectSearch from "../form/SelectSearch";
import TextInput from "../form/TextInput";

const ModalCarMember = ({ isOpen, form, carModel, carbrand, caryear, onSubmit, onChange, onClose }) => {

    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt text-text-primary">เพิ่มข้อมูลรถยนต์</h3>
                <SelectSearch
                    options={carbrand}
                    placeholder="ยี่ห้อรถยนต์"
                    value={form.car_brand_id}
                    onChange={onChange}
                    name='car_brand_id'
                />
                <Select
                    text='รุ่นรถยนต์'
                    data={carModel}
                    name='car_model_id'
                    value={form.car_model_id}
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
                            caryear.map((i) => (
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
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}
export default ModalCarMember