const TextArea = ({ title, name, typ, onChange, value, placeholder }) => {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm text-text-primary">{title}</legend>
            <textarea
                name={name}
                type={typ}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className="textarea h-24 w-full text-text-primary">
            </textarea>
        </fieldset>
    )
}
export default TextArea