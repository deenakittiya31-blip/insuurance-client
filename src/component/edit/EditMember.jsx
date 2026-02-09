import { FaMarker, FaXmark } from "react-icons/fa6";
import Select from "../form/Select";
import TextArea from "../form/TextArea";
import TextInput from "../form/TextInput";

const EditMember = ({ isOpen, form, onSubmit, onChange, onClose, group, removeTag }) => {
    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <form onSubmit={onSubmit} className="max-w-2xl p-5 radius-box flex flex-col gap-3 bg-white rounded-lg">
                <h3 className="font-bold text-lg font-prompt text-text-primary">แก้ไขข้อมูลลูกค้า</h3>
                <div className="grid grid-cols-2 gap-3 items-end">
                    <TextInput
                        title='ชื่อ'
                        name='first_name'
                        type='text'
                        placeholder='กรอกชื่อจริง...'
                        onChange={onChange}
                        width='w-70 md:w-sm'
                        value={form.first_name}
                    />
                    <TextInput
                        title='นามสกุล'
                        name='last_name'
                        type='text'
                        placeholder='กรอกนามสกุล...'
                        onChange={onChange}
                        width='w-70 md:w-sm'
                        value={form.last_name}
                    />
                    <Select
                        text='กลุ่มลูกค้า'
                        data={group}
                        name='group_id'
                        value={form.group_id}
                        onChange={onChange}
                        valueKey='id'
                        labelKey='group_name'
                    />
                    <TextInput
                        title='เบอร์โทรศัพท์'
                        name='phone'
                        type='text'
                        placeholder='กรอกเบอร์โทรศัพท์...'
                        onChange={onChange}
                        width='w-70 md:w-sm'
                        value={form.phone}
                    />
                </div>
                <div className="flex flex-wrap gap-1">
                    {
                        form.tags.map((i) => (
                            <div key={i.tag_member_id} className="relative">
                                <button
                                    type="button"
                                    className="btn btn-sm bg-main rounded-full font-prompt text-text-primary "
                                >{i.tag_name}</button>
                                <span
                                    onClick={() => removeTag(i.tag_member_id)}
                                    className='absolute -top-2 -right-1 bg-black opacity-60 rounded-full p-1'>
                                    <FaXmark className='size-3 text-white' />

                                </span>
                            </div>
                        ))
                    }
                </div>
                <TextArea
                    title='หมายเหตุ'
                    name='note'
                    type='text'
                    placeholder='กรอกหมายเหตุ...'
                    onChange={onChange}
                    width='w-70 md:w-sm'
                    value={form.note}
                />
                <div className='flex justify-end gap-3'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                    <button type="submit" className="btn btn-soft btn-primary" >บันทึก</button>
                </div>
            </form>
        </div>
    )
}
export default EditMember