import TabBackward from "../../component/mobile/TabBackward"

const HistoryOrder = () => {
  return (
    <div>
      <TabBackward
        linkTo='/store'
        title='ประวัติการสั่งซื้อ'
      />
      <div className="p-5 font-prompt space-y-3">
        {/* card order */}
        <div></div>
      </div>
    </div>
  )
}
export default HistoryOrder