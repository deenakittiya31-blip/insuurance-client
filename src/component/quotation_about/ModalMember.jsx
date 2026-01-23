import TableMember from "../table/TableMember";
import SearchBox from "./SearchBox";
import { LuSend } from "react-icons/lu";

const ModalMember = ({ data, onChange, selected, isOpen, onClose, onSubmit, isLoading }) => {
    if (!isOpen) return null;
    return (
        <div className='mx-auto fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 w-full h-full bg-black/20'>
            <div className="w-auto p-6 radius-box flex flex-col gap-5 bg-white rounded-lg">
                <div className="flex gap-1">
                    <div className="flex-1">
                        <SearchBox width='w-full' />
                    </div>
                    <button
                        type='submit'
                        onClick={onSubmit}
                        disabled={isLoading}
                        className="inline-flex items-center gap-3 rounded-sm bg-info text-white font-semibold px-7 py-1 whitespace-nowrap overflow-hidden font-prompt transition-colors duration-300 cursor-pointer"
                    >
                        <span
                            className="relative shrink-0 w-6.25 h-6.25 rounded-sm text-black grid place-items-center overflow-hidden">
                            <LuSend
                                className={`
                                    absolute text-white
                                    transition-transform duration-300 ease-in-out
                                    ${isLoading ? 'translate-x-[150%] -translate-y-[150%]' : 'translate-x-0 translate-y-0'}
                                `}
                            />
                            <LuSend
                                className={`
                                    absolute text-white
                                    transition-transform duration-300 ease-in-out delay-100
                                    ${isLoading ? 'translate-x-0 translate-y-0' : 'translate-x-[-150%] translate-y-[150%]'}
                                `}
                            />
                        </span>
                    </button>
                </div>

                <TableMember
                    data={data}
                    onChange={onChange}
                    selected={selected}
                />
                <div className='modal-action'>
                    <button type='button' className="btn btn-soft btn-error" onClick={onClose}>ยกเลิก</button>
                </div>
            </div>
        </div>
    )
}
export default ModalMember