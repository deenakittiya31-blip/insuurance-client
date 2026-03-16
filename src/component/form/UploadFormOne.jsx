import { useEffect } from "react"
import useActionStore from "../../store/action-store"

const UploadFormOne = ({ onChange, isLoading, onSubmit, form }) => {
    const companyTheme = useActionStore((s) => s.companyTheme)
    const getCompanyTheme = useActionStore((s) => s.getCompanyTheme)

    useEffect(() => {
        getCompanyTheme();
    }, [])

    const selectedCompany = companyTheme.find(
        c => String(c.id) === String(form.company_id)
    )

    return (
        <form onSubmit={onSubmit} className="flex gap-5 items-end">
            {selectedCompany?.logo_url && (
                <div className="avatar">
                    <div className="w-14 rounded">
                        <img src={selectedCompany.logo_url} className="object-contain" />
                    </div>
                </div>
            )}
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
                        companyTheme.map((i) => (
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
                    accept='application/pdf'
                ></input>
            </div>
            <button
                type="submit"
                disabled={isLoading || !form}
                className="btn bg-main rounded-md px-7 py-2.5 h-full text-white hover:bg-second">
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <span className="loading loading-dots loading-sm"></span>
                    </span>
                ) : (
                    'อัปโหลดเอกสาร'
                )}
            </button>
        </form>
    )
}
export default UploadFormOne