import { FaDropbox, FaEye, FaHotel, FaPersonWalkingLuggage } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoAirplane, IoClose } from "react-icons/io5";

const SideBarMobile = ({ isOpen, onClose }) => {
    const [home, setHome] = useState(false);
    const [list, setList] = useState(false);
    const [page, setPage] = useState(false);
    const [menu, setMenu] = useState(false);

    const hdlState = (state) => {
        if (state === 'home') {
            setHome(!home)
        } else if (state === 'list') {
            setList(!list)
        } else if (state === 'page') {
            setPage(!page)
        } else if (state === 'menu') {
            setMenu(!menu)
        }

    }
    return (
        <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>

            <div
                className="absolute inset-0 bg-black/50 transition-opacity duration-300"
                onClick={onClose}
            />

            <div className={`relative bg-white w-[60%] h-full p-5 overflow-y-auto transition-transform duration-500 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>

                <div className='flex justify-end'>
                    <button
                        onClick={onClose}
                        className=" bg-bluese w-10 h-10 p-1 flex justify-center items-center rounded-full mb-5"
                    >
                        <IoClose size={30} className='text-bluepr' />
                    </button>
                </div>
                <ul className='font-jost text-base'>
                    <li className='group flex flex-col gap-5 border-b py-5 border-gray-200'>
                        <div className='flex justify-between items-center'>
                            <p className='text-headingColor group-hover:text-bluepr'>Home </p>
                            <IoIosArrowDown onClick={() => hdlState('home')} className={`fill-headingColor group-hover:fill-bluepr transition duration-300 ${home ? 'rotate-180' : 'rotate-0'}`} />
                        </div>
                        {
                            home && (
                                <ul>
                                    <li>Home vertion 01 <hr className='text-gray-200 my-4' /></li>
                                    <li>Home vertion 02 <hr className='text-gray-200 my-4' /></li>
                                    <li>Home vertion 03 <hr className='text-gray-200 my-4' /></li>
                                    <li>Home vertion 04 <hr className='text-gray-200 my-4' /></li>
                                    <li>Home vertion 05</li>
                                </ul>
                            )
                        }
                    </li>
                    <li className='group flex flex-col gap-5 border-b py-5 border-gray-200'>
                        <div className='flex justify-between items-center'>
                            <p className='text-headingColor group-hover:text-bluepr'>Listing </p>
                            <IoIosArrowDown onClick={() => hdlState('list')} className={`fill-headingColor group-hover:fill-bluepr transition duration-300 ${list ? 'rotate-180' : 'rotate-0'}`} />
                        </div>
                        {
                            list && (
                                <ul>
                                    <li>Hotel <hr className='text-gray-200 my-4' /></li>
                                    <li>Flight <hr className='text-gray-200 my-4' /></li>
                                    <li>Rental <hr className='text-gray-200 my-4' /></li>
                                    <li>Car<hr className='text-gray-200 my-4' /></li>
                                    <li>Destination <hr className='text-gray-200 my-4' /></li>
                                    <li>Join with GeoTrip <hr className='text-gray-200 my-4' /></li>
                                    <li>Add Listing<hr className='text-gray-200 my-4' /></li>
                                    <li>Compare Listing <hr className='text-gray-200 my-4' /></li>
                                    <li>Booking Page<hr className='text-gray-200 my-4' /></li>
                                    <li>User Dashboard</li>
                                </ul>
                            )
                        }
                    </li>
                    <li className='group flex flex-col gap-5 border-b py-5 border-gray-200'>
                        <div className='flex justify-between items-center'>
                            <p className='text-headingColor group-hover:text-bluepr'>Page </p>
                            <IoIosArrowDown onClick={() => hdlState('page')} className={`fill-headingColor group-hover:fill-bluepr transition duration-300 ${page ? 'rotate-180' : 'rotate-0'}`} />
                        </div>
                        {
                            page && (
                                <ul>
                                    <li>Blog <hr className='text-gray-200 my-4' /></li>
                                    <li>Authentication <hr className='text-gray-200 my-4' /></li>
                                    <li>About Us <hr className='text-gray-200 my-4' /></li>
                                    <li>Career Page<hr className='text-gray-200 my-4' /></li>
                                    <li>Help Center <hr className='text-gray-200 my-4' /></li>
                                    <li>FAQ's <hr className='text-gray-200 my-4' /></li>
                                    <li>Error Page<hr className='text-gray-200 my-4' /></li>
                                    <li>Pricing <hr className='text-gray-200 my-4' /></li>
                                    <li>Privacy Policy<hr className='text-gray-200 my-4' /></li>
                                    <li>Contact Us</li>
                                </ul>
                            )
                        }
                    </li>
                    <li className='group flex flex-col gap-5 border-b py-5 border-gray-200'>
                        <div className='flex justify-between items-center'>
                            <p className='text-headingColor group-hover:text-bluepr'>Menu </p>
                            <IoIosArrowDown onClick={() => hdlState('menu')} className={`fill-headingColor group-hover:fill-bluepr transition duration-300 ${menu ? 'rotate-180' : 'rotate-0'}`} />
                        </div>
                        {
                            menu && (
                                <ul>
                                    <li className='flex items-center gap-3 p-3 mb-1 rounded-md hover:shadow-lg shadow-bluese'>
                                        <div className='bg-[#F2F5F8] w-13 h-13 rounded-md'>
                                            <img src='https://images.squarespace-cdn.com/content/v1/671fbc8cbb291458553afdc8/a2c9b817-4148-44ab-9040-4bf7b8e4b14b/wellness-solid.png?format=1000w' />
                                        </div>
                                        <div>
                                            <h3>HOME STAYS</h3>
                                            <p className='text-xs text-gray3'>Beautiful Place for stays</p>
                                        </div>
                                    </li>
                                    <li className='flex items-center gap-3 p-3 mb-1 rounded-md hover:shadow-lg shadow-bluese'>
                                        <div className='bg-[#F2F5F8] w-13 h-13 rounded-md flex justify-center items-center'>
                                            <FaHotel fill='#F6C344' size={25} />
                                        </div>
                                        <div>
                                            <h3>HOME HOTEL</h3>
                                            <p className='text-xs text-gray3'>Beautiful Place for stays</p>
                                        </div>
                                    </li>
                                    <li className='flex items-center gap-3 p-3 mb-1 rounded-md hover:shadow-lg shadow-bluese'>
                                        <div className='bg-[#F2F5F8] w-13 h-13 rounded-md flex justify-center items-center'>
                                            <IoAirplane fill='#2B64C1' size={25} />
                                        </div>
                                        <div>
                                            <h3>HOME Fligth</h3>
                                            <p className='text-xs text-gray3'>Beautiful Place for stays</p>
                                        </div>
                                    </li>
                                    <li className='flex items-center gap-3 p-3 mb-1 rounded-md hover:shadow-lg shadow-bluese'>
                                        <div className='bg-[#F2F5F8] w-13 h-13 rounded-md flex justify-center items-center'>
                                            <FaEye fill='#6363EC' size={25} />
                                        </div>
                                        <div>
                                            <h3>HOME RENTAL</h3>
                                            <p className='text-xs text-gray3'>Beautiful Place for stays</p>
                                        </div>
                                    </li>
                                    <li className='flex items-center gap-3 p-3 mb-1 rounded-md hover:shadow-lg shadow-bluese'>
                                        <div className='bg-[#F2F5F8] w-13 h-13 rounded-md flex justify-center items-center'>
                                            <FaDropbox fill='#337460' size={25} />
                                        </div>
                                        <div>
                                            <h3>HOME CABS</h3>
                                            <p className='text-xs text-gray3'>Beautiful Place for stays</p>
                                        </div>
                                    </li>
                                    <li className='flex items-center gap-3 p-3 rounded-md hover:shadow-md shadow-bluese'>
                                        <div className='bg-[#F2F5F8] w-13 h-13 rounded-md flex justify-center items-center'>
                                            <FaPersonWalkingLuggage className='fill-bluepr' size={25} />
                                        </div>
                                        <div>
                                            <h3>HOME DESTINATION</h3>
                                            <p className='text-xs text-gray3'>Beautiful Place for stays</p>
                                        </div>
                                    </li>
                                </ul>
                            )
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default SideBarMobile