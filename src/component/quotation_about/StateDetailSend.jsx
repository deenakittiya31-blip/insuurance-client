import { IoAttachOutline } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";

const StateDetailSend = ({ data }) => {
    return (
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-[#faf8f7]">
            <div className="stat">
                <div className="stat-figure">
                    <IoAttachOutline size={30} color="#314158" />
                </div>
                <div className="stat-title">หมายเลขใบเสนอราคา</div>
                <div className="stat-value text-text-primary text-2xl">{data.q_id}</div>
                <div className="stat-desc">รายละเอียด : {data.details}</div>
            </div>
            <div className="stat">
                <div className="stat-figure">
                    <FiCalendar size={25} color="#314158" />
                </div>
                <div className="stat-title">ชื่อลูกค้า</div>
                <div className="stat-value text-text-primary text-2xl">{data.to_name}</div>
                <div className="stat-desc">ปีของรถยนต์ : {data.year_be
                }/{data.year_ad}</div>
            </div>
            <div className="stat">
                <div className="stat-figure">
                    <div className="avatar">
                        <div className="w-10 rounded">
                            <img
                                src={data.logo_url}
                                alt="logo car brand"
                            />
                        </div>
                    </div>
                </div>
                <div className="stat-title">ยี่ห้อรถยนต์</div>
                <div className="stat-value text-text-primary text-2xl">{data.car_brand}</div>
                <div className="stat-desc">รุ่นรถยนต์ :&nbsp;
                    {
                        data.car_model
                            ? (<span>{data.car_model}</span>)
                            : (<span>{data.sub_car_model}</span>)
                    }
                </div>
            </div>
        </div >
    )
}
export default StateDetailSend