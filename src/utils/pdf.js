import toast from "react-hot-toast"
import { createPDF } from "../service/compare"

export const createComparePDF = async (q_id) => {
        try {
            const res = await createPDF(q_id)

            // ตรวจสอบว่ามีข้อมูลหรือไม่
            if (!res.data) {
                throw new Error('ไม่พบข้อมูล PDF')
            }

            // สร้าง blob URL
            const blob = new Blob([res.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)

            // เปิดในแท็บใหม่
            const newWindow = window.open(url, '_blank')

            // ตรวจสอบว่าเปิดแท็บได้หรือไม่ (กรณี popup blocker)
            if (!newWindow) {
                toast.error('กรุณาอนุญาตให้เปิด popup ในเบราว์เซอร์')

                // สำรอง: ดาวน์โหลดแทน
                const link = document.createElement('a')
                link.href = url
                link.download = `เปรียบเทียบใบเสนอราคา_${q_id}.pdf`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                toast.success('ดาวน์โหลด PDF สำเร็จ')
            } else {
                toast.success('เปิด PDF สำเร็จ')
            }

            // ลบ URL หลังจาก 1 นาที (ป้องกัน memory leak)
            setTimeout(() => {
                window.URL.revokeObjectURL(url)
            }, 60000)

        } catch (err) {
            if (err.response?.status === 404) {
                toast.error('ไม่พบข้อมูลเอกสาร')
                return
            }
            toast.error('สร้างไฟล์ไม่สำเร็จ')
        }
    }