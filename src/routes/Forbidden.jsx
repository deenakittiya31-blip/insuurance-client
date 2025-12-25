import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import useInsureAuth from '../store/auth-store'
import { useNavigate } from 'react-router-dom'

const Forbidden = () => {
    const actionLogout = useInsureAuth((s) => s.actionLogout)
    const navigate = useNavigate()

    useEffect(() => {
        toast.error('คุณไม่มีสิทธิ์เข้าใช้')
    }, [])

    const hdlBackToLogin = () => {
        actionLogout()
        navigate('/', { replace: true })
    }
    return (
        <div className="flex items-center justify-center h-screen font-prompt text-text-primary">
            <div className="text-center">
                <h1 className="text-3xl font-bold">🙂‍↔️</h1>
                <h1 className="text-3xl font-bold">403 Forbidden</h1>
                <p>คุณไม่มีสิทธิ์เข้าหน้านี้</p>
                <button onClick={hdlBackToLogin} className='btn btn-dash bg-main text-white mt-5'>กลับไปหน้า Login</button>
            </div>
        </div>
    )
}

export default Forbidden