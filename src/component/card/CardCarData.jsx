import { useState } from "react"
import { FaCar, FaEdit } from "react-icons/fa"
import SelectSearch from "../form/SelectSearch"
import Select from "../form/Select"
import TextInput from "../form/TextInput"

const CardCarData = ({ savedCar, form, carModel, carbrand, caryear, onSubmit, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="bg-white border-gray-300/25 border p-3 rounded-md text-text-primary">
            <div className="flex gap-3 justify-between items-center mb-3">
                <div className="flex gap-3 items-center">
                    <button className="w-8 h-8 p-1 rounded-full bg-main text-white flex justify-center items-center"><FaCar /></button>
                    <p className="font-semibold text-sm">ข้อมูลรถยนต์ของคุณ</p>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="btn btn-xs btn-warning flex gap-1 justify-center items-center"><FaEdit /> แก้ไขข้อมูล</button>
            </div>
            <p className="text-xs">
                {savedCar
                    ? `${savedCar.brand} / ${savedCar.model} / ${savedCar.subModel} / ${savedCar.year}`
                    : 'ยังไม่มีข้อมูลรถยนต์ กรุณากรอกข้อมูล'
                }
            </p>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                ${isOpen ? 'max-h-200 opacity-100 mt-3' : 'max-h-0 opacity-0'}
                `}
            >
                <form onSubmit={onSubmit} className="space-y-2">
                    <fieldset className="fieldset font-prompt text-text-primary p-0">
                        <legend className="fieldset-legend text-xs text-text-primary">รุ่นรถยนต์</legend>
                        <select
                            name='car_brand_id'
                            value={form.car_brand_id}
                            onChange={onChange}
                            className="select w-full select-sm"
                        >
                            <option value="" disabled={true}>โปรดเลือก</option>
                            {
                                carbrand.map((i) => (
                                    <option
                                        key={i.id}
                                        value={i.id}
                                    >
                                        {i.name}
                                    </option>
                                ))
                            }
                        </select>
                    </fieldset>
                    <fieldset className="fieldset font-prompt text-text-primary p-0">
                        <legend className="fieldset-legend text-xs text-text-primary">รุ่นรถยนต์</legend>
                        <select
                            name='car_model_id'
                            value={form.car_model_id}
                            onChange={onChange}
                            className="select w-full select-sm"
                        >
                            <option value="" disabled={true}>โปรดเลือก</option>
                            {
                                carModel.map((i) => (
                                    <option
                                        key={i.id}
                                        value={i.id}
                                    >
                                        {i.name}
                                    </option>
                                ))
                            }
                        </select>
                    </fieldset>
                    <div className='flex flex-col w-full font-prompt text-text-primary'>
                        {/* <label htmlFor='sub_car_model' className='mb-2 font-semibold text-xs capitalize'>
                            รุ่นย่อยรถยนต์
                        </label> */}
                        <legend className="fieldset-legend text-xs text-text-primary">รุ่นย่อยรถยนต์</legend>
                        <input
                            name='sub_car_model'
                            type='text'
                            placeholder='กรอกรายละเอียด...'
                            onChange={onChange}
                            value={form.sub_car_model || null}
                            className='w-auto input input-sm focus:outline-none'
                        />
                    </div>
                    <fieldset className="fieldset font-prompt text-text-primary p-0">
                        <legend className="fieldset-legend text-xs text-text-primary">ปีรถยนต์</legend>
                        <select
                            name='car_year_id'
                            onChange={onChange}
                            className="select w-full select-sm"
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
                    <button type="submit" className="btn w-full btn-sm bg-main hover:bg-second text-white" >บันทึก</button>
                </form>
            </div>
        </div>
    )
}
export default CardCarData