import { useEffect } from "react";
import useActionStore from "../../store/action-store"
import Select from "../form/Select"

const ModalQuot = ({ onSubmit, onChange, form, carmodel }) => {
    const { getCarBrandSelect, carbrand, getCarUsageSelect, carUsage } = useActionStore();

    useEffect(() => {
        getCarBrandSelect();
        getCarUsageSelect();
    }, [])

    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-3 rounded-md text-white font-semibold" onClick={() => document.getElementById('my_modal_2').showModal()}>สร้างใบเสนอราคา</button>
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-sm flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">สร้างใบเสนอราคา</h3>
                    <Select
                        text='ยี่ห้อรถยนต์'
                        data={carbrand}
                        name='car_brand_id'
                        value={form.car_brand_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='name'
                    />
                    <Select
                        text='รุ่นรถยนต์'
                        data={carmodel}
                        name='car_model_id'
                        value={form.car_model_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='name'
                    />
                    <Select
                        text='ประเภทการใช้งาน'
                        data={carUsage}
                        name='car_usage_id'
                        value={form.car_usage_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='usage_name'
                    />
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('my_modal_2').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}
export default ModalQuot