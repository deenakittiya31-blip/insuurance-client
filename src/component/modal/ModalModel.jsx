import { useEffect } from 'react';
import useActionStore from '../../store/action-store'
import Select from '../form/Select';

const ModalModel = ({ value, onSubmit, onChange }) => {
    const { getCompanySelect, company } = useActionStore();

    useEffect(() => {
        getCompanySelect()
    }, [])

    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('modalmodel').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="modalmodel" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-md flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-text-primary">เพิ่มโมเดลบริษัท</h3>
                    <Select
                        text='ชื่อบริษัท'
                        data={company}
                        name='company_id'
                        value={value.company_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='namecompany'
                    />
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('modalmodel').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary">บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}
export default ModalModel