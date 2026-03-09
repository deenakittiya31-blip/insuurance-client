import useCreateOrder from "../../hooks/useCreateOrder"
import { numberFormat } from "../../utils/numerral"


const CardHeadCheckInsure = ({ data }) => {
    const { handleCreateOrder } = useCreateOrder()
    console.log(data)
    return (
        <div className="space-y-1 w-full bg-white rounded-xl p-1 md:p-2 border border-border/50 font-prompt" >
            <div className="flex gap-2">
                <div className="w-9 h-6 border border-gray-300 rounded-md overflow-clip">
                    <img src={data.logo} className="w-full h-full object-cover" />
                </div>
                <div className="leading-tight">
                    <p className="text-[10px] font-normal">{data.type}</p>
                    <p className="text-[10px] font-normal">
                        <span className="text-[10px] font-semibold">{numberFormat(data.price)}</span> บาท/ปี
                    </p>
                </div>
            </div>
            <button onClick={() => handleCreateOrder(data.index_package, data.index_premium)} className="w-full btn btn-xs rounded-lg text-white font-normal bg-main hover:bg-second">ซื้อเลย</button>
        </div>
    )
}
export default CardHeadCheckInsure