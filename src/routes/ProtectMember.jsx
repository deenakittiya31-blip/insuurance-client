import React, { useEffect, useState } from 'react'
import useInsureAuth from '../store/auth-store'
import { Navigate } from 'react-router-dom'

const ProtectMember = ({ children }) => {
    const { token, member, actionCurrentMember } = useInsureAuth();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            //เช็คว่าได้ล็อกอินหรือไม่
            if (!token) {
                setLoading(false)
                return
            }

            //รีเฟรชหน้าถ้ายังไม่มี member
            if (!member) {
                await actionCurrentMember()
            }
            setLoading(false)
        }

        init()
    }, [token, member])

    if (loading) return null

    if (!token) return <Navigate to="/liff" replace />

    return children
}

export default ProtectMember