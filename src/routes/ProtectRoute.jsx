import React, { useEffect, useState } from 'react'
import useInsureAuth from '../store/auth-store'
import { Navigate } from 'react-router-dom'
import LoadingToRedirect from './LoadingToRedirect';
import LoadingScreen from './LoadingScreen';
import Forbidden from './Forbidden';

const ProtectRoute = ({ children, allowRoles = [] }) => {
    const { token, user, actionCurrentUser } = useInsureAuth()
    const [loading, setLoading] = useState(true)
    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                //เช็คว่าได้ล็อกอินหรือไม่
                if (!token) {
                    setAllowed(false)
                    return
                }

                //รีเฟรชหน้าถ้ายังไม่มี user
                if (!user) {
                    await actionCurrentUser()
                }

                //เช็คถ้ามีการกำหนดสิทธิ์ไว้และตัว user.role ที่ได้มาไม่ตรงกับที่อยู่ใน arrowRolesที่กำหนดไว้ไม่มีสิทธิ์เข้า
                if (allowRoles.length && !allowRoles.includes(user?.role)) {
                    setAllowed(false)
                    return
                }

                //ถ้าผ่าน if ด้านบนมาหมดให้แสดง element
                setAllowed(true)
            } catch (err) {
                setAllowed(false)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [token, user])

    if (loading) return <LoadingScreen />

    if (!allowed) return <Forbidden />

    return allowed ? children : <Navigate to='/' />
}

export default ProtectRoute