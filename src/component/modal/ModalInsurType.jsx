import React from 'react'
import TextInput from '../form/TextInput'

const ModalInsurType = ({ value, onSubmit, onChange }) => {

    return (
        <div className='font-prompt'>
            <button className="btn bg-main px-5 rounded-md text-white font-semibold" onClick={() => document.getElementById('my_modal_2').showModal()}>เพิ่มข้อมูล</button>
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={onSubmit} className="modal-box w-auto flex flex-col gap-5">
                    <h3 className="font-bold text-lg">เพิ่มข้อมูลประเภทประกัน</h3>
                    <TextInput
                        width='w-sm'
                        title='ประเภทประกัน'
                        name='nametype'
                        type='text'
                        placeholder='กรอกประเภทของประกัน เช่น ชั้น 1...'
                        onChange={onChange}
                        value={value.nametype}
                    />
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-sm">รายละเอียด</legend>
                        <textarea
                            name='description'
                            onChange={onChange}
                            value={value.description}
                            className="textarea h-24 w-full" placeholder="รายละเอียด...">
                        </textarea>
                    </fieldset>
                    <div className='modal-action'>
                        <button type='button' className="btn btn-soft btn-error" onClick={() => document.getElementById('my_modal_2').close()}>ยกเลิก</button>
                        <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default ModalInsurType