import React, { useEffect, useState } from 'react'
import useInsureAuth from '../store/auth-store'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const ProtectRoute = ({ children, allowRoles = [] }) => {
    const token = useInsureAuth((s) => s.token)
    const user = useInsureAuth((s) => s.user)
    const actionCurrentUser = useInsureAuth((s) => s.actionCurrentUser)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            //เช็คว่าได้ล็อกอินหรือไม่
            if (!token) {
                setLoading(false)
                return
            }

            //รีเฟรชหน้าถ้ายังไม่มี user
            if (!user) {
                await actionCurrentUser()
            }
            setLoading(false)
        }
        init()
    }, [token, user])

    if (loading) return null

    if (!token) return <Navigate to="/" replace />

    if (allowRoles.length && !allowRoles.includes(user?.role)) {
        return <Navigate to="/forbidden" replace />
    }

    return children
}

export default ProtectRoute