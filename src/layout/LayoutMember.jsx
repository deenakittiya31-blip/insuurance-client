import { Outlet } from "react-router-dom"
import FooterMobile from "../component/footer/FooterMobile"
import NavbarMobile from "../component/navbar/NavbarMobile"

const LayoutMember = ({ hasPremiumSelected }) => {
    return (
        <div className="bg-[#f5f2f0] min-h-dvh">
            <NavbarMobile />
            <div className=" lg:px-36">{/* p-5 */}
                <Outlet context={{ hasPremiumSelected }} />
            </div>
            <FooterMobile hidden={hasPremiumSelected} />
        </div>
    )
}
export default LayoutMember