const SelectCompul = ({ onChange, value, options = [] }) => {

    // console.log(options)
    return (
        <fieldset className="fieldset font-prompt text-text-primary p-0 w-full">
            <legend className="fieldset-legend text-sm text-text-primary">ตัวเลือกพรบ. รถ</legend>
            <select
                name='car_year_id'
                className="select w-full"
                value={value ?? ""}
                onChange={(e) => {
                    if (e.target.value === "") {
                        onChange(null)          // ยังไม่เลือก
                    } else if (e.target.value === "NONE") {
                        onChange(0)             // ไม่เอาพรบ.
                    } else {
                        onChange(Number(e.target.value)) // ค่าพรบ.
                    }
                }}
            >
                <option value="" disabled={true}>โปรดเลือก</option>
                <option value="NONE">ไม่เอาพรบ. รถยนต์</option>
                {
                    options.map((i) => (
                        <option
                            key={i.id}
                            value={i.id}
                        >
                            รหัส {i.code} | ประเภท {i.type} | ค่าพรบ. {i.total}
                        </option>
                    ))
                }
            </select>
        </fieldset>
    )
}
export default SelectCompul