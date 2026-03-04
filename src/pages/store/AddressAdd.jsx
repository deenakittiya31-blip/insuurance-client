import React, { useEffect, useMemo, useState } from "react";
import TabBackward from '../../component/mobile/TabBackward'
import TextInput from '../../component/form/TextInput'
import TextArea from "../../component/form/TextArea";
import useInsureAuth from "../../store/auth-store";
import { createAddress } from "../../service/member/address";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// --- Utility Functions ---

const sortByName = (list = []) =>
    [...list].sort((a, b) =>
        (a.name_th || "").localeCompare(b.name_th || "", "th")
    );

const getLabel = (item) => {
    if (!item) return "";
    const { name_th, name_en } = item;
    return name_th && name_en ? `${name_th} — ${name_en}` : name_th || name_en;
};

// --- Custom Hook (Logic Layer) ---
const useThaiAddress = () => {
    const [provinces, setProvinces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selected, setSelected] = useState({
        provinceId: "",
        provinceName: "",
        districtId: "",
        districtName: "",
        subDistrictId: "",
        subDistrictName: "",
        zipCode: "",
    });

    // Fetch Data
    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        fetch(
            "https://raw.githubusercontent.com/kongvut/thai-province-data/refs/heads/master/api/latest/province_with_district_and_sub_district.json",
            { signal: controller.signal }
        )
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => setProvinces(sortByName(data)))
            .catch((e) => {
                if (e.name !== "AbortError") setError("Failed to load data.");
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    // Derived Lists
    const districts = useMemo(() => {
        const prov = provinces.find((p) => p.id === Number(selected.provinceId));
        return sortByName(prov?.districts);
    }, [provinces, selected.provinceId]);

    const subDistricts = useMemo(() => {
        const dist = districts.find((d) => d.id === Number(selected.districtId));
        return sortByName(dist?.sub_districts);
    }, [districts, selected.districtId]);

    // Handlers
    const setProvince = (id) => {
        const prov = provinces.find((p) => p.id === Number(id));
        setSelected({
            provinceId: id,
            provinceName: prov?.name_th || "",
            districtId: "",
            districtName: "",
            subDistrictId: "",
            subDistrictName: "",
            zipCode: "",
        });
    };

    const setDistrict = (id) => {
        const dist = districts.find((d) => d.id === Number(id));
        setSelected((prev) => ({
            ...prev,
            districtId: id,
            districtName: dist?.name_th || "",
            subDistrictId: "",
            subDistrictName: "",
            zipCode: "",
        }));
    };

    const setSubDistrict = (id) => {
        const subDist = subDistricts.find((s) => s.id === Number(id));
        setSelected((prev) => ({
            ...prev,
            subDistrictId: id,
            subDistrictName: subDist?.name_th || "",
            zipCode: subDist?.zip_code || "",
        }));
    };

    const reset = () =>
        setSelected({
            provinceId: "",
            provinceName: "",
            districtId: "",
            districtName: "",
            subDistrictId: "",
            subDistrictName: "",
            zipCode: "",
        });

    return {
        data: { provinces, districts, subDistricts },
        status: { loading, error },
        selected,
        actions: { setProvince, setDistrict, setSubDistrict, reset },
    };
};

const SelectField = ({
    label,
    value,
    options,
    onChange,
    disabled,
    hint,
    placeholder = "Select...",
}) => (
    <fieldset className="fieldset font-prompt text-text-primary p-0">
        <legend className="fieldset-legend text-sm text-text-primary">{label}</legend>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="select w-full"
        >
            <option value="">{placeholder}</option>
            {options.map((item) => (
                <option key={item.id} value={item.id}>
                    {getLabel(item)}
                </option>
            ))}
        </select>
        {hint && <small style={{ opacity: 0.8 }}>{hint}</small>}
    </fieldset>
);

const AddressAdd = () => {
    const { data, status, selected, actions } = useThaiAddress();
    const member = useInsureAuth((m) => m.member)
    const navigate = useNavigate()

    // 1. form state สำหรับ input fields
    const [form, setForm] = useState({
        full_name: "",
        address_line: "",
        phone: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // 2. submit ส่งไป backend
    const handleSubmit = async () => {
        const payload = {
            full_name: form.full_name,
            address_line: form.address_line,
            phone: form.phone,
            subdistrict: selected.subDistrictName,
            district: selected.districtName,
            province: selected.provinceName,
            zipcode: String(selected.zipCode),
            member_id: member.id,
        };

        console.log(payload)

        try {
            const res = await createAddress(payload)
            toast.success(res.data.msg)
            navigate('/store/address')
        } catch (err) {
            console.log(err.message);
            toast.error('เกิดข้อผิดพลาด')
        }
    };

    return (
        <div>
            <TabBackward
                linkTo='/store/address'
                title='สร้างที่อยู่ใหม่'
            />
            <div className="p-5 font-prompt">
                <div className="bg-white p-3 rounded-xl">


                    {status.loading && <p>Loading provinces…</p>}
                    {status.error && <p style={{ color: "crimson" }}>{status.error}</p>}
                    <div className="space-y-2">
                        <TextInput
                            width='w-auto'
                            title='ชื่อ-นามสกุล'
                            name='full_name'
                            type='text'
                            placeholder='กรอกชื่อ-นามสกุล...'
                            onChange={onChange}
                            value={form.full_name}
                        />
                        <TextInput
                            width='w-auto'
                            title='เบอร์โทรศัพท์'
                            name='phone'
                            type='text'
                            placeholder='กรอกเบอร์โทรศัพท์...'
                            onChange={onChange}
                            value={form.phone}
                        />
                    </div>

                    <TextArea
                        width='w-auto'
                        title='รายละเอียด'
                        name='address_line'
                        type='text'
                        placeholder='บ้านเลขที่, ซอย, หมู่'
                        onChange={onChange}
                        value={form.address_line}
                    />
                    <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
                        {/* Province */}
                        <SelectField
                            label="จังหวัด"
                            value={selected.provinceId}
                            options={data.provinces}
                            onChange={actions.setProvince}
                            disabled={status.loading || !!status.error}
                            hint="เลือกจังหวัดเพื่อโหลดข้อมูลเขตต่างๆ ของจังหวัดนั้น"
                            placeholder="เลือกจังหวัด"
                        />

                        {/* District */}
                        <SelectField
                            label="อำเภอ"
                            value={selected.districtId}
                            options={data.districts}
                            onChange={actions.setDistrict}
                            disabled={!selected.provinceId}
                            hint={
                                !selected.provinceId
                                    ? "เลือกจังหวัดก่อน"
                                    : "เลือกเขตอำเภอ"
                            }
                            placeholder="อำเภอ"
                        />

                        {/* Sub-district */}
                        <SelectField
                            label="ตำบล"
                            value={selected.subDistrictId}
                            options={data.subDistricts}
                            onChange={actions.setSubDistrict}
                            disabled={!selected.districtId}
                            hint={
                                !selected.districtId
                                    ? "เลือกเขตอำเภอก่อน"
                                    : "สุดท้าย เลือกเขตตำบล"
                            }
                            placeholder="เลือกตำบล"
                        />

                        {/* Postal Code */}
                        <div style={{ display: "grid", gap: 6 }}>
                            <label className="font-semibold text-sm text-text-primary">รหัสไปรษณีย์</label>
                            <input
                                type="text"
                                value={selected.zipCode}
                                placeholder="Auto-filled..."
                                readOnly
                                className="input font-prompt"
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button onClick={actions.reset} className="btn btn-sm text-text-primary" >ล้างข้อมูล</button>
                            <button onClick={handleSubmit} className="btn btn-sm bg-main text-white">บันทึกที่อยู่</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddressAdd