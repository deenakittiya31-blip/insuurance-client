import React from 'react'

const Select = ({
    data,
    value,
    name,
    onChange,
    valueKey,
    labelKey,
    text
}) => {
    return (
        <fieldset className="fieldset font-prompt ">
            <legend className="fieldset-legend text-sm">{text}</legend>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="select w-full"
            >
                <option value="" disabled={true}>โปรดเลือก</option>
                {
                    data.map((i) => (
                        <option
                            key={i[valueKey]}
                            value={i[valueKey]}
                        >
                            {i[labelKey]}
                        </option>
                    ))
                }
            </select>
        </fieldset>
    )
}

export default Select