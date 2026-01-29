import React, { use, useEffect, useState } from 'react'
import Select from '../form/Select'
import useActionStore from '../../store/action-store'
import TextInput from '../form/TextInput'
import { listCarYearSelect } from '../../service/car/CarYear'
import SelectSearch from '../form/SelectSearch'



const ModalPackage = ({ form, onSubmit, onChange, onChangeCarmodel }) => {
    const { company, getCompanySelect, typeInsur, getTypeInsurSelect, carbrand, getCarBrandSelect, carUsage, getCarUsageSelect, carmodel } = useActionStore();
    const [year, setYear] = useState([])

    useEffect(() => {
        getCompanySelect();
        getTypeInsurSelect();
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
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('modalpackage').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="modalpackage" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มข้อมูลแพ็กเกจ</h3>
                    <TextInput
                        width='w-sm'
                        title='ชื่อแพ็กเกจ'
                        name='package_name'
                        type='text'
                        placeholder='ชื่อแพ็กเกจ'
                        onChange={onChange}
                        value={form.package_name}
                    />
                    <div className="grid lg:grid-cols-2 gap-5 items-end-safe">
                        <Select
                            text='ชื่อบริษัท'
                            data={company}
                            name='company_id'
                            value={form.company_id}
                            onChange={onChange}
                            valueKey='id'
                            labelKey='namecompany'
                        />
                        <Select
                            text='ประเภทของประกัน'
                            data={typeInsur}
                            name='insur_type_id'
                            value={form.insur_type_id}
                            onChange={onChange}
                            valueKey='id'
                            labelKey='nametype'
                        />
                        <SelectSearch
                            options={carbrand}
                            placeholder="ยี่ห้อรถยนต์"
                            value={form.car_brand_id}
                            onChange={(value) => onChangeCarmodel('car_brand_id', value)}
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
                        <div>
                            <Select
                                text='ประเภทการใช้งาน'
                                data={carUsage}
                                name='usage_car_id'
                                value={form.usage_car_id}
                                onChange={onChange}
                                valueKey='id'
                                labelKey='usage_name'
                            />
                        </div>
                    </div>
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('modalpackage').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default ModalPackage