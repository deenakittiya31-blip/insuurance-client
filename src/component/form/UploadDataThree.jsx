import { useEffect } from "react";
import useActionStore from "../../store/action-store";

const UploadThree = ({ onChangeCompany, onChangePDF, form }) => {
    const company = useActionStore((s) => s.company)
    const getCompanySelect = useActionStore((s) => s.getCompanySelect)

    useEffect(() => {
        getCompanySelect();
    }, [])

    const selectedCompany = company.find(
        c => String(c.id) === String(form.company_id)
    )

    return (
        <div className="flex gap-5">
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
                    onChange={onChangeCompany}
                    className="select w-full"
                >
                    <option value="" disabled={true}>โปรดเลือก</option>
                    {
                        company.map((i) => (
                            <option
                                key={i.id}
                                value={i.id}
                            >
                                {/* <img src={i.logo_url} className="w-5 h-5" /> */}
                                {i.namecompany}
                            </option>
                        ))
                    }
                </select>
            </fieldset>
            <div className='flex flex-col w-full font-prompt text-text-primary'>
                <label className="text-sm font-semibold">เลือกไฟล์</label>
                <input
                    onChange={onChangePDF}
                    type='file'
                    className='file-input w-full'
                    accept='image/*,application/pdf'
                ></input>
            </div>
        </div>
    )
}
export default UploadThree