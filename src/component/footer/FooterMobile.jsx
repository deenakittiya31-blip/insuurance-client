import { useEffect, useState } from "react"
import { AiFillHome } from "react-icons/ai"
import { BsFillTicketPerforatedFill } from "react-icons/bs"
import { FaCar } from "react-icons/fa6"
import { IoMenu } from "react-icons/io5"
import { Link } from "react-router-dom"
import { usePremium } from "../../context/PremiumContext"
import { FaHistory } from "react-icons/fa"

const FooterMobile = ({ setIsOpen }) => {
    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const { premiumSelected } = usePremium();

    const hiddenByPremium = premiumSelected.length > 0;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY && currentScrollY > 10) {
                // scroll ลง
                setShow(false)
            } else {
                // scroll ขึ้น
                setShow(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    return (
        <footer
            className={`fixed bottom-0 left-0 w-full h-16 z-20 shadow flex justify-center items-center bg-main rounded-t-2xl text-white
            transition-all duration-500 ease-in-out md:hidden
            ${show && !hiddenByPremium ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
            ${hiddenByPremium ? "mb-20" : "mb-0"}
            `}
        >
            <div className="w-full flex justify-around items-center font-prompt">
                <Link to='/store' className="flex flex-col gap-1 items-center">
                    <AiFillHome className="size-5" />
                    <span className="text-[10px] font-medium">หน้าแรก</span>
                </Link>
                <Link to='/store/compare-insurance' className="flex flex-col gap-1 items-center">
                    <FaCar className="size-5" />
                    <span className="text-[10px] font-medium">ใบเสนอราคา</span>
                </Link>
                <Link to='/store/order' className="flex flex-col gap-1 items-center">
                    <FaHistory className="size-5" />
                    <span className="text-[10px] font-medium">คำสั่งซื้อ</span>
                </Link>
                <button onClick={() => setIsOpen(true)} className="flex flex-col gap-1 items-center">
                    <IoMenu className="size-6" />
                    <span className="text-[10px] font-medium">เมนู</span>
                </button>
            </div>
        </footer>
    )
}
export default FooterMobile