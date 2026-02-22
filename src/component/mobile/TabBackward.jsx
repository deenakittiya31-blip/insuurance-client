import { useEffect } from "react";
import { useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const TabBackward = ({ linkTo, title }) => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <div className={`sticky top-0 z-50 w-full p-2 font-prompt text-text-primary flex items-center gap-3 transition-all duration-300
            ${scrolled
                ? "bg-white/60 backdrop-blur-md shadow-sm"
                : "bg-white"
            }`}
        >
            <button onClick={() => navigate(linkTo)}>
                <RiArrowLeftLine size={20} />
            </button>
            <p className="font-semibold text-lg">{title}</p>
        </div>
    )
}
export default TabBackward