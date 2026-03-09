import { GoPackage } from "react-icons/go"
import { numberFormat } from "../../utils/numerral"
import { FaLocationDot } from "react-icons/fa6"

const CardOrder = ({ data, onDelete }) => {
    const address = data.address
    return (
        <div className="bg-white shadow-sx rounded-md w-full p-2 text-text-primary ">
            <div className="flex justify-between items-baseline-last">
                <p className="font-medium text-xs">หมายเลขคำสั่งซื้อ {data.order_id}</p>
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
            <div className="flex justify-between items-center gap-2">
                <div>
                    <button className="btn btn-xs text-text-primary" onClick={() => document.getElementById(`modaladdress-${data.id}`).showModal()}>ที่อยู่จัดส่ง</button>
                    <dialog id={`modaladdress-${data.id}`} className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">ที่อยู่จัดส่ง</h3>
                            {address ? (
                                <div className="flex items-baseline gap-1">
                                    <FaLocationDot className="size-3 fill-main" />
                                    <div className="flex-1">
                                        <p className="flex gap-2 items-baseline-last font-semibold text-sm">
                                            {address.full_name}
                                            <span className="font-normal text-xs text-gray-400">{address.phone}</span>
                                        </p>
                                        <span className="font-normal text-xs text-gray-400">
                                            {address.address_line} {address.subdistrict} {address.district} {address.province} {address.zipcode}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400">ไม่มีที่อยู่</p>
                            )}
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div className="space-x-2">
                    {
                        data.status === 'สั่งซื้อสำเร็จ' && (
                            <button onClick={() => onDelete(data.id)} className="btn btn-xs text-text-primary">ยกเลิก</button>
                        )
                    }
                    {
                        data.tracking !== null && (
                            <a href={`https://track.thailandpost.co.th/?trackNumber=${data.tracking}`} target="_blank">
                                <button className="btn btn-xs text-text-primary">ติดตาม</button>
                            </a>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default CardOrder