import numeral from 'numeral'

export const numberFormat = (value) => {
    if (!value && value !== 0) return '-'
    
    const num = parseFloat(value)
    if (isNaN(num)) return '-'

    // แยกทศนิยมออกมาก่อน เพื่อไม่ให้ปัดเศษ
    const [integer, decimal] = String(value).split('.')
    
    // ใส่ลูกน้ำเฉพาะส่วนจำนวนเต็ม
    const formatted = parseInt(integer).toLocaleString('th-TH')
    
    // ถ้ามีทศนิยมให้ต่อกลับ
    return decimal !== undefined ? `${formatted}.${decimal}` : formatted
}