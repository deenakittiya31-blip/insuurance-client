import api from "../config/axios";

export const createInvoice = (token, image) => {
    return api.post('/api/aigen', { image }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createAkson = (token, base64) => {
    return api.post('/api/akson', base64, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}