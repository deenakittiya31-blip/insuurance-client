import { useEffect, useState } from "react";
import useActionStore from "../../store/action-store"
import Select from "../form/Select"
import { listCarYearSelect } from "../../service/car/CarYear";

const ModalQuot = ({ onSubmit, onChange, form, carmodel, onClose }) => {
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
                    <fieldset className="fieldset w-full font-prompt text-text-primary p-0">
                        <p className="fieldset-legend text-sm text-text-primary p-0">ปีรถยนต์</p>
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
                        <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}
export default ModalQuot