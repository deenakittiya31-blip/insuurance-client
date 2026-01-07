import api from '../config/axios'

export const createCompare = (token, form) => {
    return api.post('/api/create-compare', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}