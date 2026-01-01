import api from "../config/axios";

export const createInvoice = (token, payload) => {
    return api.post('/api/aigen', payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}