import { Outlet } from "react-router-dom"
import FooterMobile from "../component/footer/FooterMobile"
import NavbarMobile from "../component/navbar/NavbarMobile"

const LayoutMember = () => {
    return (
        <div className="bg-[#f5f2f0] min-h-dvh">
            <NavbarMobile />
            <div className="p-5">
                <Outlet />
            </div>
            <FooterMobile />
        </div>
    )
}
export default LayoutMember