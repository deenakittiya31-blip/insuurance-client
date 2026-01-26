import { BiSolidSortAlt } from "react-icons/bi";
import { FaSortUp, FaSortDown } from "react-icons/fa6";

const Sort = ({ onSort, keyName, currentSort }) => {
    const handleClick = () => {
        onSort(keyName)
    }

    const getIcon = () => {
        //ถ้าไม่ใช่ column ที่กำลัง sort → แสดง icon ธรรมดา
        if (!currentSort || currentSort.key !== keyName) {
            return <BiSolidSortAlt className="text-gray-400" />
        }

        //ถ้าเป็น column ที่กำลัง sort → แสดง icon ตามทิศทาง
        return currentSort.direction === 'ASC'
            ? <FaSortUp className="text-main" />
            : <FaSortDown className="text-main" />
    }
    return (
        <div onClick={handleClick} className="cursor-pointer">
            {getIcon()}
        </div>
    )
}
export default Sort