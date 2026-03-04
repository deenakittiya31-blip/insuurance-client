import React, { useEffect, useMemo, useState } from "react";
import TabBackward from '../../component/mobile/TabBackward'
import TextInput from '../../component/form/TextInput'
import TextArea from "../../component/form/TextArea";
import useInsureAuth from "../../store/auth-store";
import { readAddress, updateAddress } from "../../service/member/address";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
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

    const initFromAddress = (addressData, allProvinces) => {
        const prov = allProvinces.find((p) => p.name_th === addressData.province);
        if (!prov) return;

        const dist = (prov.districts || []).find((d) => d.name_th === addressData.district);
        if (!dist) return;

        const sub = (dist.sub_districts || []).find((s) => s.name_th === addressData.subdistrict);

        setSelected({
            provinceId: String(prov.id),
            provinceName: prov.name_th,
            districtId: String(dist.id),
            districtName: dist.name_th,
            subDistrictId: sub ? String(sub.id) : "",
            subDistrictName: sub?.name_th || "",
            zipCode: sub?.zip_code || addressData.zipcode || "",
        });
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
        actions: { setProvince, setDistrict, setSubDistrict, reset, initFromAddress },
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

const AddressEdit = () => {
    const { data, status, selected, actions } = useThaiAddress();
    const [address, setAddress] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        full_name: "",
        address_line: "",
        phone: "",
    });

    useEffect(() => {
        const fetchReadAddress = async () => {
            try {
                const res = await readAddress(id);
                const data = res.data.data;
                setAddress(data);
                // prefill form
                setForm({
                    full_name: data.full_name || "",
                    address_line: data.address_line || "",
                    phone: data.phone || "",
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchReadAddress();
    }, [id])

    //มื่อได้ทั้ง address และ provinces แล้ว ให้ init dropdown
    useEffect(() => {
        if (address.province && data.provinces.length > 0) {
            actions.initFromAddress(address, data.provinces);
        }
    }, [address.province, data.provinces]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        console.log('form:', form)        // ← ดูว่า form มีข้อมูลไหม
        console.log('selected:', selected) // ← ดูว่า selected มีข้อมูลไหม
        console.log('id:', id)

        const payload = {
            full_name: form.full_name,
            address_line: form.address_line,
            phone: form.phone,
            subdistrict: selected.subDistrictName,
            district: selected.districtName,
            province: selected.provinceName,
            zipcode: String(selected.zipCode),
        };

        try {
            const res = await updateAddress(id, payload)
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
                title='แก้ไขที่อยู่'
            />
            <div className="p-5 font-prompt space-y-3">
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
                        <TextArea
                            width='w-auto'
                            title='รายละเอียด'
                            name='address_line'
                            type='text'
                            placeholder='บ้านเลขที่, ซอย, หมู่'
                            onChange={onChange}
                            value={form.address_line}
                        />
                    </div>
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
export default AddressEdit