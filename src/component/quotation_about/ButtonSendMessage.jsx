import { LuSend } from "react-icons/lu";

const ButtonSendMessage = ({ loading, type }) => {
    return (
        <button
            type={type}
            disabled={loading}
            className="inline-flex items-center gap-3 rounded-sm bg-success text-white font-semibold px-7 py-1 whitespace-nowrap overflow-hidden font-prompt transition-colors duration-300 cursor-pointer"
        >
            <span
                className="relative shrink-0 w-6.25 h-6.25 rounded-sm text-black grid place-items-center overflow-hidden">
                <LuSend
                    className={`
                                    absolute text-white
                                    transition-transform duration-300 ease-in-out
                                    ${loading ? 'translate-x-[150%] -translate-y-[150%]' : 'translate-x-0 translate-y-0'}
                                `}
                />
                <LuSend
                    className={`
                                    absolute text-white
                                    transition-transform duration-300 ease-in-out delay-100
                                    ${loading ? 'translate-x-0 translate-y-0' : 'translate-x-[-150%] translate-y-[150%]'}
                                `}
                />
            </span>
        </button>
    )
}
export default ButtonSendMessage