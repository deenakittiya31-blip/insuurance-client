import { NumericFormat } from "react-number-format"
import TextInput from "./TextInput"

const NumberFormat = ({ value, name, title, placeholder, onChange }) => {
    return (
        <NumericFormat
            thousandSeparator=","
            decimalScale={2}
            fixedDecimalScale={false}
            value={value}
            customInput={TextInput}
            width='w-auto'
            name={name}
            title={title}
            placeholder={placeholder}
            onValueChange={(values) =>
                onChange({
                    target: {
                        name: name,
                        value: values.value
                    }
                })
            }
        />
    )
}
export default NumberFormat