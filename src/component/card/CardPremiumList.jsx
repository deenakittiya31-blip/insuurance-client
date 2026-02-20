import { GoPackage } from "react-icons/go";

const CardPremiumList = ({ premiums }) => {
    return (
        <div className="w-full flex gap-2 text-text-primary">
            <div className="w-15 h-15 border border-border/25 rounded-md overflow-clip">
                <img src={premiums.logo_url} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-1">
                <div className="flex-1">
                    <span className="font-medium text-xs line-clamp-1">{premiums.premium_name}</span>
                    <div className="badge badge-xs badge-ghost text-gray-500 text-[8px]">
                        <GoPackage />
                        {premiums.package_name}
                    </div>
                    <span className="font-medium text-[10px] line-clamp-1">ประกัน{premiums.insurance_type} <span className="font-light text-gray-400">|</span> {premiums.repair_type}</span>
                </div>

                {/* ราคากับปุ่มสั่งซื้อ */}
                <div className="flex flex-col gap-1 justify-center items-center w-25 border-l border-border/20 p-2">
                    <span className="text-xs font-medium text-main">฿{premiums.selling_price}</span>
                    <button className="rounded-sm bg-main w-fit px-2 text-[10px]">ซื้อเลย</button>
                </div>
            </div>
        </div>
    )
}
export default CardPremiumList