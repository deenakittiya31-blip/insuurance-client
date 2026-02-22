import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { currentMember, currentUser, login, loginWithLine, register } from '../service/auth';

const authStore = (set, get) => ({
    user: null,
    token: null,
    member: null,
    actionCurrentUser: async () => {
        try {
            const res = await currentUser()
            set({ user: res.data.user })

            return res.data.user
        } catch (err) {
            get().actionLogout()
            return null
        }
    },
    actionCurrentMember: async () => {
        try {
            const res = await currentMember()
            set({ member: res.data.member })

            return res.data.member
        } catch (err) {
            get().actionLogout()
            return null
        }
    },
    actionLogin: async (form) => {
        const res = await login(form)

        set({
            token: res.data.token
        })
        return res
    },
    actionLoginLine: async (idToken) => {
        const res = await loginWithLine(idToken)
        set({ token: res.data.token })
        return res
    },
    actionRegister: async (form) => {
        const res = await register(form)

        return res
    },
    actionLogout: () => {
        localStorage.removeItem('insure-store')

        set({
            user: null,
            token: null,
            member: null
        })
    },
})

const usePersist = {
    name: 'insure-store',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ token: state.token })
}

const useInsureAuth = create(persist(authStore, usePersist))

export default useInsureAuth