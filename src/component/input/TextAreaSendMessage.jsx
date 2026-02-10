import UploadImageLine from "../form/UploadImageLine";

const TextAreaSendMessage = ({ onChange, value, form, setForm, loading }) => {
    const handleChange = (e) => {
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
        onChange(e)
    }
    return (
        <div className="relative border border-border rounded-2xl p-5 h-auto">
            <textarea
                name='text'
                type='text'
                rows={1}
                placeholder='ใส่ข้อความที่ต้องการส่ง...'
                onChange={handleChange}
                value={value}
                className="w-full resize-none overflow-hidden text-text-primary focus:outline-none">
            </textarea>
            <div className="w-full flex justify-between items-end h-auto">
                <UploadImageLine form={form} setForm={setForm} />
                <button type="submit" className="btn btn-sm px-10 rounded-full btn-accent">
                    {loading
                        ? <span className="loading loading-spinner loading-xs" />
                        : 'ส่ง'
                    }
                </button>
            </div>
        </div>
    )
}
export default TextAreaSendMessage