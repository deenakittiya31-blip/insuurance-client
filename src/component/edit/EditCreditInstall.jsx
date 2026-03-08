import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6"
import TextInput from "../form/TextInput"
import Select from "../form/Select"

const EditCreditInstall = ({ form, onChangeName, onAddBank, onRemoveBank,
    onChangeBank, onAddMonth, onChangeMonth, onSubmit, banks, onClose, isOpen
}) => {
    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl text-text-primary">
                {/* w-11/12 max-w-3xl */}
                <div className='flex justify-between'>
                    <h3 className="font-bold text-lg">แก้ไขชุดบัตรเครดิต</h3>

                    <button type='button' onClick={onAddBank} className='btn btn-sm btn-accent text-white'><FaCirclePlus /> เพิ่มแบบฟอร์ม </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-3">
                    <TextInput
                        width='w-auto'
                        title='ชื่อชุด'
                        name='group_name'
                        type='text'
                        placeholder='กรอกชื่อชุดบัตร...'
                        onChange={onChangeName}
                        value={form.group_name}
                    />

                    <div className="grid lg:grid-cols-2 gap-3 w-full h-80 overflow-y-auto">
                        {form.ins_bank?.map((bank, index) => {
                            const selectedBank = banks.find(b => b.id === bank.bank_id)
                            return (
                                <div key={index} className="w-full h-fit p-3 rounded-md shadow border border-border/30">
                                    <div className="flex justify-end">
                                        <button onClick={() => onRemoveBank(index)} type="button" className="btn btn-xs btn-error text-white"><FaCircleMinus /> ลบฟอร์ม</button>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        {/* ✅ แสดงรูปถ้าเลือกแล้ว */}
                                        {selectedBank?.logo_url && (
                                            <div className="avatar">
                                                <div className="w-10 rounded">
                                                    <img src={selectedBank.logo_url} className="object-contain" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <Select
                                                text='ธนาคาร'
                                                data={banks}
                                                name='bank_id'
                                                value={bank.bank_id}
                                                onChange={(e) => onChangeBank(index, Number(e.target.value))}
                                                valueKey='id'
                                                labelKey='bank_name'
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button type='button' onClick={() => onAddMonth(index)} className='btn btn-circle btn-sm'><FaCirclePlus className="fill-gray-500" /></button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {bank.ins_month.map((month, mIdx) => (
                                            <TextInput
                                                key={mIdx}
                                                width='w-auto'
                                                name='bank_name'
                                                type='number'
                                                placeholder='เดือน...'
                                                onChange={(e) => onChangeMonth(index, mIdx, e.target.value)}
                                                value={month}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn btn-error btn-sm">ยกเลิก</button>
                        <button type="submit" className="btn btn-info btn-sm">บันทึก</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditCreditInstall