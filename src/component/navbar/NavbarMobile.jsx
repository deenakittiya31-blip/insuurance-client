import { FaMedal } from "react-icons/fa6"
import useInsureAuth from "../../store/auth-store"
import liff from "@line/liff"
import { useNavigate } from "react-router-dom"

const NavbarMobile = () => {
    const member = useInsureAuth((s) => s.member)
    const token = useInsureAuth((s) => s.token)
    const actionLogout = useInsureAuth((s) => s.actionLogout)
    const navigate = useNavigate()


    const handleLogin = async () => {
        navigate("/liff");
    }

    const handleLogout = async () => {
        await liff.init({ liffId: "2008929214-oMQadweJ" })
        liff.logout()
        actionLogout()
    }
    return (
        <nav className='w-full flex gap-5 items-center p-3 lg:px-20'>
            <div className="w-10 h-10 rounded-full overflow-clip">
                <img src={member?.picture_url} className="w-full h-full object-cover" />
            </div>
            <div className="font-prompt">
                <p className="font-semibold text-sm text-text-primary">{member?.first_name}</p>
                <div className="flex gap-1 items-center">
                    <FaMedal className="fill-yellow-500 size-3" />
                    <p className="text-text-primary text-xs">{member?.group_name}</p>
                </div>

            </div>
            <button onClick={handleLogin} className="bg-pink-200 btn font-prompt btn-xs font-bold">เข้าสู่ระบบ</button>
            {
                token && (
                    <button onClick={handleLogout} className="bg-pink-500 btn font-prompt btn-xs font-bold">ออกระบบ</button>
                )
            }
        </nav>
    )
}
export default NavbarMobile