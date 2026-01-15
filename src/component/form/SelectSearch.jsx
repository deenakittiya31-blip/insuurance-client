import Select from 'react-select'

const SelectSearch = ({ options, value, onChange }) => {

    //map สร้าง array ใหม่
    const formattedOptions = options.map(item => ({
        value: item.id,
        label: item.name
    }))

    const selectedOption = formattedOptions.find(
        opt => opt.value === value
    )

    return (
        <div className='flex flex-col gap-1 justify-end'>
            <label className='font-semibold text-sm text-text-primary'>ยี่ห้อรถยนต์</label>
            <Select
                options={formattedOptions}
                value={selectedOption}
                onChange={(selected) => onChange(selected.value)}
                placeholder="โปรดเลือก"
                isClearable
            />
        </div>
    )
}
export default SelectSearch