import { Outlet } from "react-router-dom"
import FooterMobile from "../component/footer/FooterMobile"
import SideBarMobile from "../component/sidebar/SideBarMobile"
import { useState } from "react"

const LayoutMember = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="bg-[#f5f2f0] min-h-dvh">
            <SideBarMobile isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className=" lg:px-36">{/* p-5 */}
                <Outlet />
            </div>
            <FooterMobile setIsOpen={setIsOpen} />
        </div>
    )
}
export default LayoutMember