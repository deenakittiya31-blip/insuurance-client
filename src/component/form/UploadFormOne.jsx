import { useEffect } from "react"
import useActionStore from "../../store/action-store"

const UploadFormOne = ({ onChange, isLoading, onSubmit, form }) => {
    const company = useActionStore((s) => s.company)
    const getCompanySelect = useActionStore((s) => s.getCompanySelect)

    useEffect(() => {
        getCompanySelect();
    }, [])


    return (
        <form onSubmit={onSubmit} className="flex gap-5 items-end">
            <fieldset className="fieldset w-full font-prompt text-text-primary p-0">
                <p className="fieldset-legend text-sm text-text-primary p-0">ชื่อบริษัท</p>
                <select
                    name='company_id'
                    value={form.company_id}
                    onChange={onChange}
                    className="select w-full"
                >
                    <option value="" disabled={true}>โปรดเลือก</option>
                    {
                        company.map((i) => (
                            <option key={i.id} value={i.id}>
                                {i.namecompany}
                            </option>
                        ))
                    }
                </select>
            </fieldset>
            <div className='flex flex-col w-full font-prompt text-text-primary'>
                <label className="text-sm font-semibold">เลือกไฟล์</label>
                <input
                    onChange={onChange}
                    type='file'
                    className='file-input w-full'
                    accept='image/*,application/pdf'
                ></input>
            </div>
            <button
                type="submit"
                disabled={isLoading || !form}
                className="btn btn-neutral">
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-sm"></span>
                    </span>
                ) : (
                    'Upload'
                )}
            </button>
        </form>
    )
}
export default UploadFormOne