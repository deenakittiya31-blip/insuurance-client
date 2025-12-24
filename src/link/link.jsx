import { FaRegBuilding } from "react-icons/fa6";
import { FaLayerGroup, FaRegCalendar } from "react-icons/fa";
import { LuShield, LuCarTaxiFront } from "react-icons/lu";
import { TbPackages, TbPremiumRights } from "react-icons/tb";
import { CgBmw } from "react-icons/cg";
import { IoCarSportOutline, IoDocumentOutline } from "react-icons/io5";

export const adminInsur = [
    {
        icon: <FaRegBuilding className='size-4' />,
        title: 'บริษัทประกัน',
        link: '/admin'
    },
    {
        icon: <LuShield className='size-4' />,
        title: 'ประกันรถยนต์',
        link: '/admin/insurtypes'
    },
    {
        icon: <TbPremiumRights className='size-4' />,
        title: 'เบี้ยประกัน',
        link: '/admin/insurpremuim'
    },
    {
        icon: <TbPackages className='size-4' />,
        title: 'แพ็คเก็จ',
        link: '/admin/package'
    },
]

export const adminCar = [
    {
        icon: <CgBmw className='size-4' />,
        title: 'ยี่ห้อรถยนต์',
        link: '/admin/carbrand'
    },
    {
        icon: <IoCarSportOutline className='size-4' />,
        title: 'รุ่นรถยนต์',
        link: '/admin/carmodel'
    },
    {
        icon: <IoDocumentOutline className='size-4' />,
        title: 'พรบ.รถ',
        link: '/admin/compulsorycar'
    },
    {
        icon: <FaLayerGroup className='size-4' />,
        title: 'กลุ่มรถยนต์',
        link: '/admin/groupcar'
    },
    {
        icon: <LuCarTaxiFront className='size-4' />,
        title: 'ประเภทการใช้งาน',
        link: '/admin/usagecar'
    },
    {
        icon: <FaRegCalendar className='size-4' />,
        title: 'ประเภท / ปี ของรถยนต์',
        link: '/admin/caryear&cartype'
    },
]