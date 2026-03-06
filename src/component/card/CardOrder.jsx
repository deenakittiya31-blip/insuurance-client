import { GoPackage } from "react-icons/go"
import { numberFormat } from "../../utils/numerral"

const CardOrder = ({ data, onDelete }) => {
    return (
        <div className="bg-white shadow-sx rounded-md w-full p-2 text-text-primary ">
            <div className="flex justify-between items-baseline-last">
                <p className="font-medium text-xs">ORDER ID {data.order_id}</p>
                <p className="text-sm text-main">{data.status}</p>
            </div>
            <div className="flex gap-3 py-2">
                <div className="w-15 h-15 border border-border/25 rounded-md overflow-clip">
                    <img src={data.logo_url} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                    <div>
                        <span className="font-medium text-xs line-clamp-1">{data.premium_name}</span>
                        <div className="badge badge-xs badge-ghost text-gray-500 text-[8px]">
                            <GoPackage />
                            {data.package_name}
                        </div>
                        <span className="font-medium text-[10px] line-clamp-1">ประกัน{data.nametype} <span className="font-light text-gray-400">|</span>{data.repair_type}</span>
                    </div>
                    <p className="font-semibold text-sm">
                        ฿{numberFormat(data.selling_price)}
                    </p>
                </div>
            </div>
            <div className="flex justify-end items-center gap-2">
                {
                    data.status === 'สั่งซื้อสำเร็จ' && (
                        <button onClick={() => onDelete(data.id)} className="btn btn-xs">ยกเลิก</button>
                    )
                }
                {
                    data.tracking !== null && (
                        <a href={`https://track.thailandpost.co.th/?trackNumber=${data.tracking}`} target="_blank">
                            <button className="btn btn-xs">ติดตาม</button>
                        </a>
                    )
                }
            </div>
        </div>
    )
}
export default CardOrder