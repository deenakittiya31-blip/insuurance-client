import { FaNoteSticky, FaRegFaceSmile } from "react-icons/fa6";
import { BiSolidPackage } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa6";
import { FaHistory, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useInsureAuth from "../../store/auth-store";
import { PiMedalBold } from "react-icons/pi";
import liff from "@line/liff";

const SideBarMobile = ({ isOpen, setIsOpen }) => {
    const { token, member, actionLogout } = useInsureAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            if (!liff.isInClient()) {
                // เปิดผ่าน browser ปกติ
                actionLogout()
                navigate('/store')
                return
            }

            await liff.init({ liffId: "2008929214-oMQadweJ" })
            if (liff.isLoggedIn()) {
                liff.logout()
            }
            actionLogout()
            navigate('/store')
        } catch (err) {
            console.log('logout error', err)
            actionLogout()
            navigate('/store')
        }
    }

    const handleLogIn = async () => {
        navigate('/member-login')
    }

    const handleNavigate = (address) => {
        setIsOpen(false)
        navigate(`${address}`)
    }

    return (
        <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
            }`}>
            <div className={`relative bg-[#f5f2f0] w-full h-full p-5 overflow-y-auto transition-transform duration-500 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>

                <div className='flex justify-end'>
                    <button
                        onClick={() => setIsOpen(false)}
                        className=" bg-bluese w-10 h-10 p-1 flex justify-center items-center rounded-full mb-5"
                    >
                        <IoClose size={30} className='text-text-primary' />
                    </button>
                </div>
                {/* member profile */}
                <div className="flex flex-col gap-3 justify-center items-center font-prompt mb-5">
                    <div className="w-20 h-20 rounded-full overflow-clip flex items-center justify-center">
                        {
                            token
                                ? (<img src={member?.picture_url} className="w-full h-full object-cover" />)
                                : (
                                    <FaUserCircle className='fill-gray-500 size-15' />
                                )
                        }
                    </div>
                    <div className="flex gap-1 items-center text-gray-500">
                        <PiMedalBold className="size-3" />
                        <p className="text-sm font-normal">{token ? `${member?.group_name}` : 'lv.0'}</p>
                    </div>
                    <p className="font-semibold text-2xl text-text-primary">{token ? `${member?.first_name} ${member?.last_name}` : 'กรุณาเข้าสู่ระบบ'}</p>
                </div>

                <div className='grid gap-5 bg-white p-5 rounded-4xl font-prompt text-text-primary'>
                    <div onClick={() => handleNavigate('/store/compare-insurance')} className="flex items-center gap-5 w-full">
                        <button className="btn btn-circle btn-sm btn-success">
                            <FaNoteSticky className="size-4 text-white" />
                        </button>
                        <div className="w-full py-3 border-b border-border/50">
                            <p className="font-medium text-xl">ใบเสนอราคา</p>
                        </div>
                    </div>
                    <div onClick={() => handleNavigate('/store/trackparcel')} className="flex items-center gap-5 w-full">
                        <button className="btn btn-circle btn-sm btn-secondary">
                            <BiSolidPackage className="size-6 text-white" />
                        </button>
                        <div className="w-full py-3 border-b border-border/50">
                            <p className="font-medium text-xl">ติดตามพัศดุ</p>
                        </div>
                    </div>
                    <div onClick={() => handleNavigate('/store/address')} className="flex items-center gap-5 w-full">
                        <button className="btn btn-circle btn-sm btn-primary">
                            <FaAddressBook className="size-4 text-white" />
                        </button>
                        <div className="w-full py-3 border-b border-border/50">
                            <p className="font-medium text-xl">ที่อยู่ในการจัดส่งเอกสาร</p>
                        </div>
                    </div>
                    <div onClick={() => handleNavigate('/store/history')} className="flex items-center gap-5 w-full">
                        <button className="btn btn-circle btn-sm btn-warning">
                            <FaHistory className="size-4 text-white" />
                        </button>
                        <div className="w-full py-3">
                            <p className="font-medium text-xl">ประวัติการสั่งซื้อ</p>
                        </div>
                    </div>
                    {
                        token ? (
                            <button onClick={handleLogout} className="btn rounded-xl btn-error font-medium text-xl text-text-primary">
                                ออกจากระบบ
                            </button>
                        )
                            : (
                                <button onClick={handleLogIn} className="btn rounded-xl btn-error font-medium text-xl text-text-primary">
                                    เข้าสู่ระบบ
                                </button>
                            )
                    }

                </div>
            </div>
        </div >
    )
}
export default SideBarMobile