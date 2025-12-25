import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Forbidden = () => {
    const navigate = useNavigate()

    useEffect(() => {
        toast.error('คุณไม่มีสิทธิ์เข้าใช้')
        const timer = setTimeout(() => {
            navigate('/', { replace: true })
        }, 3000)

        return () => clearTimeout(timer)
    }, [])
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-xl font-bold text-text-primary">403 Forbidden</h1>
                <p>คุณไม่มีสิทธิ์เข้าหน้านี้</p>
            </div>
        </div>
    )
}

export default Forbidden