import { useEffect, useState } from "react"
import { AiFillHome } from "react-icons/ai"
import { BsFillTicketPerforatedFill } from "react-icons/bs"
import { FaCar } from "react-icons/fa6"
import { IoMenu } from "react-icons/io5"
import { Link } from "react-router-dom"

const FooterMobile = () => {
    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
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
            className={`fixed bottom-0 left-0 w-full h-16 z-20 shadow flex justify-center items-center bg-main text-white
            transition-all duration-500 ease-in-out md:hidden
            ${show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
        >
            <div className="w-full flex justify-around items-center font-prompt">
                <Link href="index.php" className="flex flex-col gap-1 items-center">
                    <AiFillHome className="size-5" />
                    <span className="text-[10px] font-medium">หน้าแรก</span>
                </Link>

                <Link to='#' className="flex flex-col gap-1 items-center">
                    <FaCar className="size-5" />
                    <span className="text-[10px] font-medium">ประกัน</span>
                </Link>

                <Link to='#' className="flex flex-col gap-1 items-center">
                    <BsFillTicketPerforatedFill className="size-5" />
                    <span className="text-[10px] font-medium">โปรโมชั่น</span>
                </Link>
                <Link to='#' className="flex flex-col gap-1 items-center">
                    <IoMenu className="size-6" />
                    <span className="text-[10px] font-medium">เมนู</span>
                </Link>
            </div>
        </footer>
    )
}
export default FooterMobile