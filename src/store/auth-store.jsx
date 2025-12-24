import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { login, loginWithGoogle, loginWithLine, register } from '../service/auth';
import { listCarType } from '../service/car/CarType';

const authStore = (set, get) => ({
    user: null,
    token: null,
    cartype: [],
    getCarType: async () => {
        try {
            const res = await listCarType()
            set({ cartype: res.data.data })
        } catch (err) {
            console.log(err)
        }
    },
    actionLogin: async (form) => {
        const res = await login(form)
        //รับข้อมูลจากหลังบ้านมาเก็บไว้ใน user and token ที่ประกาศไว้ข้างบน
        set({
            user: res.data.payload,
            token: res.data.token
        })
        //ส่งข้อมูลกลับ
        return res
    },
    actionLoginLine: async (form) => {
        const res = await loginWithLine(form)
        //รับข้อมูลจากหลังบ้านมาเก็บไว้ใน user and token ที่ประกาศไว้ข้างบน
        set({
            user: res.data.payload,
            token: res.data.token
        })
        //ส่งข้อมูลกลับ
        return res
    },
    actionLoginGoogle: async (credential) => {
        const res = await loginWithGoogle(credential)
        //รับข้อมูลจากหลังบ้านมาเก็บไว้ใน user and token ที่ประกาศไว้ข้างบน
        set({
            user: res.data.payload,
            token: res.data.token
        })
        //ส่งข้อมูลกลับ
        return res
    },
    actionRegister: async (form) => {
        const res = await register(form)

        return res
    },
    actionLogout: () => {
        set({
            user: null,
            token: null
        })
    },
    setUser: (user) => set({ user }),
})

const usePersist = {
    name: 'insure-store',
    storage: createJSONStorage(() => localStorage)
}

const useInsureAuth = create(persist(authStore, usePersist))

export default useInsureAuth