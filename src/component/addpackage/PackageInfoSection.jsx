import TextArea from '../form/TextArea'
import TextInput from '../form/TextInput'

const PackageInfoSection = ({ form, onChange }) => {
    return (
        <div>
            <div className='flex justify-between'>
                <h1 className='title text-main'>สร้างแพ็กเกจ</h1>
                <button type="submit" className="btn btn-sm btn-neutral px-10">บันทึก</button>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div className='col-span-2'>
                    <TextInput
                        width='w-full'
                        name='package_name'
                        title='ชื่อแพ็กเกจ'
                        type='text'
                        placeholder='กรอกชื่อแพ็กเกจ...'
                        onChange={onChange}
                        value={form.package_name}
                    />
                </div>
                <div className='grid lg:grid-cols-2 gap-3'>
                    <div>
                        <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>ระยะเวลาเริ่มต้น</label>
                        <input
                            type="date"
                            className="input"
                            name='start_date'
                            onChange={onChange}
                            value={form.start_date ? new Date(form.start_date).toISOString().split('T')[0] : ''}
                        />
                    </div>
                    <div>
                        <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>ระยะเวลาสิ้นสุด</label>
                        <input
                            type="date"
                            className="input"
                            name='end_date'
                            onChange={onChange}
                            value={form.end_date ? new Date(form.end_date).toISOString().split('T')[0] : ''}
                        />
                    </div>
                </div>
                <div className='grid lg:grid-cols-2 gap-3'>
                    <div>
                        <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>สถานะซ่อม</label>
                        <select
                            name='repair_type'
                            value={form.repair_type}
                            onChange={onChange}
                            className="select font-prompt"
                        >
                            <option value="" disabled={true}>กรุณาเลือกสถานะซ่อม</option>
                            <option value='ซ่อมอู่'>ซ่อมอู่</option>
                            <option value='ซ่อมห้าง'>ซ่อมห้าง</option>
                        </select>
                    </div>
                    <div>
                        <label className='mb-2 font-semibold text-sm capitalize font-prompt text-text-primary'>สถานะ</label>
                        <select
                            name='is_active'
                            value={form.is_active}
                            onChange={onChange}
                            className="select font-prompt"
                        >
                            <option value="" disabled={true}>กรุณาเลือกสถานะ</option>
                            <option value={true}>เปิด</option>
                            <option value={false}>ปิด</option>
                        </select>
                    </div>
                </div>
                <div className='col-span-2'>
                    <TextArea
                        title='เงื่อนไข : เครื่องยนต์ / รถยนต์'
                        name='engine_size'
                        typ='text'
                        value={form.engine_size}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    )
}
export default PackageInfoSection