import toast from "react-hot-toast";
import { createJPG } from "../service/compare";

export const createJPEG = async (q_id) => {
        try {
            const res = await createJPG(q_id)

            const blob = new Blob([res.data], { type: 'image/jpeg' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `quotation_${q_id}.jpg`; // ชื่อไฟล์
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            if (err.response?.status === 404) {
                toast.error('ไม่พบข้อมูลเอกสาร')
                return
            }
            toast.error('สร้างไฟล์ไม่สำเร็จ')
        }
    }