import { useEffect } from "react";
import useActionStore from "../../store/action-store";

const UploadData = ({ onChangeCompany, onChangePDF, form }) => {
    const company = useActionStore((s) => s.company)
    const getCompanySelect = useActionStore((s) => s.getCompanySelect)

    useEffect(() => {
        getCompanySelect();
    }, [])
    return (
        <div className="flex gap-5">
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
export default UploadData