import { FaRegBuilding } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa";
import { LuShield, LuCarTaxiFront, LuBrain, LuCalculator, LuUserPlus } from "react-icons/lu";
import { TbDiscount, TbPackages, TbPremiumRights } from "react-icons/tb";
import { CgBmw } from "react-icons/cg";
import { IoCarSportOutline, IoDocumentOutline } from "react-icons/io5";
import { MdOutlineElectricCar } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { RiSettings4Line } from "react-icons/ri";

export const adminInsur = [
    {
        icon: <FaRegBuilding className='size-4' />,
        title: 'บริษัทประกัน',
        link: '/app/insurance-company'
    },
    {
        icon: <LuShield className='size-4' />,
        title: 'ประเภทประกัน',
        link: '/app/insurtypes'
    },
    {
        icon: <TbPackages className='size-4' />,
        title: 'แพ็คเก็จ',
        link: '/app/package'
    },
    {
        icon: <TbDiscount className='size-4' />,
        title: 'ส่วนลดเลเวล',
        link: '/app/discount-level'
    },
    {
        icon: <TbPremiumRights className='size-4' />,
        title: 'เบี้ยประกัน',
        link: '/app/insurpremium'
    },
    {
        icon: <LuCalculator className='size-4' />,
        title: 'โปรโมชั่น',
        link: '/app/promotion'
    },
]

export const staffInsur = [
    {
        icon: <TbPackages className='size-4' />,
        title: 'แพ็คเก็จ',
        link: '/app/package'
    },
    {
        icon: <TbPremiumRights className='size-4' />,
        title: 'เบี้ยประกัน',
        link: '/app/insurpremium'
    },
]

export const adminCar = [
    {
        icon: <CgBmw className='size-4' />,
        title: 'ยี่ห้อรถยนต์',
        link: '/app/carbrand'
    },
    {
        icon: <IoCarSportOutline className='size-4' />,
        title: 'รุ่นรถยนต์',
        link: '/app/carmodel'
    },
    {
        icon: <MdOutlineElectricCar className='size-4' />,
        title: 'ประเภทรถยนต์',
        link: '/app/cartype'
    },
    {
        icon: <IoDocumentOutline className='size-4' />,
        title: 'พรบ.รถ',
        link: '/app/compulsorycar'
    },
    {
        icon: <FiBox className='size-4' />,
        title: 'กลุ่มรถยนต์',
        link: '/app/groupcar'
    },
    {
        icon: <LuCarTaxiFront className='size-4' />,
        title: 'ประเภทการใช้งาน',
        link: '/app/usagecar'
    },
    {
        icon: <FaRegCalendar className='size-4' />,
        title: 'ปีรถยนต์',
        link: '/app/caryear'
    },
]

export const adminSetting = [
    {
        icon: <RiSettings4Line className='size-4' />,
        title: 'การตั้งค่าระบบ',
        link: '/app/setting'
    },
    {
        icon: <LuUserPlus className='size-4' />,
        title: 'เพิ่มสิทธิ์ผู้ใช้งานระบบ',
        link: '/app/users'
    },
    {
        icon: <LuUserPlus className='size-4' />,
        title: 'ตั้งค่านโยบาย',
        link: '/app/policy'
    },
    {
        icon: <LuUserPlus className='size-4' />,
        title: 'ธนาคาร + บัตรเครดิต',
        link: '/app/policy'
    },
]