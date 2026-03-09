import { numberFormat } from "../../utils/numerral"
import { IoClose } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import { usePremium } from "../../context/PremiumContext";

const CardPremiumSelect = ({ onClear, onSubmit }) => {
    const { premiumSelected } = usePremium();

    return (
        <div className={`fixed bottom-0 left-0 w-full h-25 rounded-t-md z-40 shadow-[0_-5px_50px_rgba(0,0,0,0.05)] border border-border/25 flex justify-center items-center bg-white
        transition-all duration-500 ease-in-out
        ${premiumSelected.length > 0 ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-auto"}`}
        >
            <div className="absolute -top-10 right-2 space-x-2">
                <button onClick={onClear} type="button" className="btn btn-sm btn-square btn-error">
                    <IoClose className="size-4 text-white" />
                </button>
                <button onClick={onSubmit} type="button" className="btn btn-sm btn-square btn-success">
                    <BsCheckLg className="size-4 text-white" />
                </button>
            </div>

            <div className="grid grid-cols-3 w-full text-text-primary">
                {
                    premiumSelected.map((i) => (
                        <div key={i.index_premium} className="relative w-full scale-90">
                            {/* กล่องด้านหลัง (layer) */}
                            <div className="absolute top-1 left-1 w-full h-full bg-border/25 rounded-md z-0" />

                            {/* การ์ดหลัก */}
                            <div className="relative w-full z-10 bg-white rounded-md px-1 py-3 border border-border/50">
                                <div className="flex gap-2">
                                    <div className="w-7 h-7 border border-gray-300 rounded-md overflow-clip">
                                        <img src={i.logo_url_company} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="leading-tight">
                                        <p className="text-[10px] font-normal">{i.insurance_type}</p>
                                        <p className="text-[10px] font-normal">
                                            <span className="text-[10px] font-medium">{numberFormat(i.total_premium)}</span> บาท/ปี
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
export default CardPremiumSelect