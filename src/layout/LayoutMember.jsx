import { Outlet } from "react-router-dom"
import FooterMobile from "../component/footer/FooterMobile"
import SideBarMobile from "../component/sidebar/SideBarMobile"
import { useState } from "react"
import useInsureAuth from "../store/auth-store"

const LayoutMember = () => {
    const { token, actionCurrentMember } = useInsureAuth()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (token) {
            actionCurrentMember()
        }
    }, [token])

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