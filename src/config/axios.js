import axios from "axios";
import toast from "react-hot-toast";
import useInsureAuth from "../store/auth-store";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.response.use(response => {
    return response;
}, error => {
    if(error.response?.status === 401){
        toast.error('Session หมดอายุ กรุณาเข้าสู่ระบบใหม่')

        //reset zustand กับ localstorange
        useInsureAuth.getState().actionLogout()

        //redirect ไปที่หน้า login
        window.location.href = '/'
    }
    return Promise.reject(error);
})

export default api