import Logo from '../../assets/logo.svg'
import useInsureAuth from '../../store/auth-store';
import { AiFillSmile } from "react-icons/ai";


const Header = () => {
    const token = useInsureAuth((s) => s.token)
    const user = useInsureAuth((s) => s.user)


    return (
        <header className='flex justify-between items-center px-5 py-3 font-prompt'>
            <div className='flex items-center gap-20'>
                <div className='flex items-center gap-5'>
                    <img src={Logo} className='w-10 rounded-md' />
                    <h1 className='font-bold text-3xl text-main'>DEENA</h1>
                </div>
                <h1 className='hidden lg:block flex-1 font-semibold text-2xl text-text-primary'>ยินดีต้อนรับ <span className='capitalize'>{user?.name} !</span></h1>
            </div>

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
            </div>
        </header >
    )
}

export default Header