const SelectPerPage = ({ onChange, perPage }) => {
    return (
        <fieldset className="fieldset font-prompt text-text-primary p-0">
            <legend className="fieldset-legend text-sm text-text-primary">จำนวนข้อมูล</legend>
            <select
                onChange={onChange}
                className="select w-full"
                value={perPage}
            >
                <option value="10" >10</option>
                <option value="20" >20</option>
                <option value="50" >50</option>
            </select>
        </fieldset>
    )
}
export default SelectPerPage