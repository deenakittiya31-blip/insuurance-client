import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email('อีเมลไม่ถูกต้อง'),
    password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัว')
})

export const companySchema = z.object({
    namecompany: z.string().min(5, 'ชื่อบริษัทต้องมีอย่างน้อย 5 ตัวอักษร'),
    phone: z.string().length(10, 'เบอร์โทรต้องมี 10 ตัวอักษร')
})

export const registerSchema = z.object({
    first_name: z.string().min(5, 'ชื่อต้องมีอย่างน้อย 6 ตัว'),
    last_name: z.string().min(5, 'นามสกุลต้องมีอย่างน้อย 6 ตัว'),
    phone: z.string().length(10, 'เบอร์โทรต้องมี 10 ตัวอักษร')
})