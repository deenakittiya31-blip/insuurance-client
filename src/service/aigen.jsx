import api from "../config/axios";

export const createInvoice = (token, image) => {
    return api.post('/api/aigen', { image }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}