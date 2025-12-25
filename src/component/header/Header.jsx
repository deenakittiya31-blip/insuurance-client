import React from 'react'
import Profile from '../../assets/user.png'
import useInsureAuth from '../../store/auth-store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AiFillSmile } from "react-icons/ai";

const Header = () => {
    const token = useInsureAuth((s) => s.token)
    const user = useInsureAuth((s) => s.user)
    const navigate = useNavigate();
    const actionLogOut = useInsureAuth((s) => s.actionLogout)

    const hdlLogout = () => {
        actionLogOut()
        navigate('/')
        toast.success('ออกจากระบบสำเร็จ')
    }

    return (
        <header className='flex justify-between items-center py-3 font-prompt'>
            <h1 className='flex-1 font-semibold text-2xl text-text-primary'>ยินดีต้อนรับ <span className='capitalize'>{user?.name} !</span></h1>
            <div className='flex gap-5 items-center'>
                <div className='flex gap-3 items-center'>
                    <div className='flex justify-center items-center rounded-full border border-main w-10 h-10 overflow-hidden'>
                        {
                            user?.image
                                ? <img src={user.image} className='object-cover' />
                                : <AiFillSmile className='fill-main size-6' />
                        }

                    </div>
                    <div>
                        <p className='text-text-primary text-sm font-semibold capitalize'>{user?.name}</p>
                        <p className='text-xs text-border'>{user?.role}</p>
                    </div>
                </div>
                <div>
                    {
                        token
                            ? (
                                <button onClick={hdlLogout} className='btn bg-main px-3 rounded-md text-white font-semibold hover:bg-second'>
                                    <h3>ออกจากระบบ</h3>
                                </button>
                            )
                            : (
                                <Link to='/' className='flex gap-5 items-center px-5 py-2 group rounded-full text-text-primary transition duration-300 ease-in-out hover:bg-main'>
                                    <TbLogin2 size={25} className='group-hover:text-white' />
                                    <h3 className='font-semibold lg:text-lg! group-hover:text-white'>เข้าสู่ระบบ</h3>
                                </Link>
                            )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header