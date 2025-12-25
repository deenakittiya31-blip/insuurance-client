import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { currentUser, login, loginWithGoogle, loginWithLine, register } from '../service/auth';

const authStore = (set, get) => ({
    user: null,
    token: null,
    actionCurrentUser: async () => {
        try {
            const token = get().token
            if (!token) return

            const res = await currentUser(token)
            set({ user: res.data.user })
        } catch (err) {
            // token หมดอายุ / invalid
            set({ user: null, token: null })
        }
    },
    actionLogin: async (form) => {
        const res = await login(form)

        set({
            token: res.data.token
        })
        return res
    },
    actionLoginLine: async (form) => {
        const res = await loginWithLine(form)
        set({
            token: res.data.token
        })
        return res
    },
    actionLoginGoogle: async (credential) => {
        const res = await loginWithGoogle(credential)
        set({
            token: res.data.token
        })
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
})

const usePersist = {
    name: 'insure-store',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ token: state.token })
}

const useInsureAuth = create(persist(authStore, usePersist))

export default useInsureAuth