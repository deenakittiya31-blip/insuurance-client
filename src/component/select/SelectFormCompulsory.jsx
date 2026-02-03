import { useState } from "react"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md"
import { RiArrowRightDoubleLine } from "react-icons/ri"

const SelectFormCompulsory = ({ data, value = [], onChange, name }) => {
    const [selectedUsage, setSelectedUsage] = useState(null)

    // เพิ่มทีละรายการ
    const addToValue = () => {
        if (!selectedUsage) return

        if (!value.includes(selectedUsage)) {
            const newValue = [...value, selectedUsage]
            onChange({
                target: {
                    name: name,
                    value: newValue
                }
            })
        }
        setSelectedUsage(null)
    }

    // เพิ่มทั้งหมด
    const addAll = () => {
        const allIds = data.filter(item => !value.includes(item.id)).map(item => item.id)
        onChange({
            target: {
                name: name,
                value: [...value, ...allIds]
            }
        })
        setSelectedUsage(null)
    }

    // ลบทีละรายการ
    const removeFromValue = () => {
        if (!selectedUsage) return

        const newValue = value.filter(id => id !== selectedUsage)
        onChange({
            target: {
                name: name,
                value: newValue
            }
        })
        setSelectedUsage(null)
    }

    // ลบทั้งหมด
    const removeAll = () => {
        onChange({
            target: {
                name: name,
                value: []
            }
        })
        setSelectedUsage(null)
    }

    // ดึงข้อมูลที่เลือกแล้ว
    const selectedData = data.filter(item => value.includes(item.id))

    console.log('ที่เลือก', selectedData)
    return (
        <div className="flex gap-3 font-mono text-text-primary">
            {/* box 1 */}
            <div className="flex-1">
                <p className="font-semibold text-sm ">None-Selected</p>
                <p className="font-light text-xs text-gray-400 mb-3">Showing all {data.length}</p>
                <div className="bg-white w-full h-52 border rounded-md overflow-hidden">
                    <div className="join w-full flex">
                        <button
                            onClick={addAll}
                            type="button"
                            className="btn join-item flex-1 text-text-primary"
                        >
                            <RiArrowRightDoubleLine size={25} />
                        </button>
                        <button
                            type="button"
                            onClick={addToValue}
                            className="btn join-item flex-1 text-text-primary"
                        >
                            <MdKeyboardArrowRight size={25} />
                        </button>
                    </div>
                    <div className="p-0.5 h-40 overflow-y-auto">
                        {
                            data.map((i) => (
                                <div
                                    key={i.id}
                                    className={`font-prompt text-sm cursor-pointer p-2 capitalize hover:bg-neutral-100 ${selectedUsage === i.id ? 'bg-neutral-100 border-l-4 border-main' : ''
                                        }`}
                                    onClick={() => setSelectedUsage(i.id)}
                                >
                                    {i.car_type} / {i.usage} ({i.code_usage})
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* box 2 */}
            <div className="flex-1">
                <p className="font-semibold text-sm ">Selected</p>
                <p className="font-light text-xs text-gray-400 mb-3">{selectedData.length === 0 ? 'Empty list' : `Showing ${selectedData.length}`}</p>
                <div className="bg-white w-full h-52 border rounded-md overflow-hidden">
                    <div className="join w-full flex">
                        <button
                            type="button"
                            onClick={removeFromValue}
                            className="btn join-item flex-1 text-text-primary"
                        >
                            <MdKeyboardArrowLeft size={25} />
                        </button>
                        <button
                            type="button"
                            onClick={removeAll}
                            className="btn join-item flex-1 text-text-primary"
                        >
                            <MdOutlineKeyboardDoubleArrowLeft size={25} />
                        </button>
                    </div>
                    <div className="p-0.5 h-40 overflow-y-auto">
                        {
                            selectedData.map((i) => (
                                <div
                                    key={i.id}
                                    className={`cursor-pointer p-2 hover:bg-neutral-100 ${selectedUsage === i.id ? 'bg-neutral-100 border-l-4 border-main' : ''
                                        }`}
                                    onClick={() => setSelectedUsage(i.id)}
                                >
                                    {i.car_type} / {i.usage} ({i.code_usage})
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SelectFormCompulsory