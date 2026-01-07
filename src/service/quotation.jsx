import api from '../config/axios'

export const createQuot = (token) => {
    return api.post('/api/create-quotation', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}