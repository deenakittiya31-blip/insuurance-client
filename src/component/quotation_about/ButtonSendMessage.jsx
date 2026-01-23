import { LuSend } from "react-icons/lu";

const ButtonSendMessage = () => {
    return (
        <button
            className="
                group
                inline-flex items-center gap-3
                rounded-sm
                bg-info text-white
                font-semibold
                px-7 py-1
                whitespace-nowrap
                overflow-hidden text-ellipsis font-prompt
                transition-colors duration-300
                cursor-pointer"
        >
            <span
                className="relative shrink-0 w-6.25 h-6.25 rounded-sm text-black grid place-items-center overflow-hidden">
                <LuSend
                    className="absolute text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
                />
                <LuSend
                    className="absolute text-white translate-x-[-150%] translate-y-[150%] transition-transform duration-300 ease-in-out delay-100 group-hover:translate-x-0 group-hover:translate-y-0"
                />
            </span>
        </button>
    )
}
export default ButtonSendMessage