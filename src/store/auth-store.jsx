import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { currentUser, login, loginWithGoogle, loginWithLine, register } from '../service/auth';

const authStore = (set, get) => ({
    user: null,
    token: null,
    actionCurrentUser: async () => {
        try {
            const res = await currentUser(token)
            set({ user: res.data.user })

            return res.data.user
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
    actionLoginLine: async (form) => {
        const res = await loginWithLine(form)

        const token = res.data.token

        set({ token })
        return token
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
        localStorage.removeItem('insure-store')

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