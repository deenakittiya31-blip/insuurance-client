import { FaMedal, FaRankingStar, FaRegFaceSmile } from "react-icons/fa6"
import useInsureAuth from "../../store/auth-store"
import liff from "@line/liff"
import { useNavigate } from "react-router-dom"
import { PiMedalBold } from "react-icons/pi";

const NavbarMobile = () => {
    const member = useInsureAuth((s) => s.member)
    const token = useInsureAuth((s) => s.token)

    return (
        <nav className='w-full flex gap-5 items-center px-3 pt-2 lg:px-20'>
            <div className="w-10 h-10 rounded-full overflow-clip">
                {
                    token
                        ? (<img src={member?.picture_url} className="w-full h-full object-cover" />)
                        : (
                            <FaRegFaceSmile className='fill-main size-6' />
                        )
                }
            </div>
            <div className="font-prompt">
                <div className="flex gap-1 items-center text-gray-500">
                    <PiMedalBold className="size-3" />
                    <p className="text-xs font-normal">{token ? member?.group_name : '-'}</p>
                </div>
                <p className="font-semibold text-sm text-text-primary">{token ? member?.first_name : '-'}</p>
            </div>
        </nav>
    )
}
export default NavbarMobile