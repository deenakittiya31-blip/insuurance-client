import api from "../config/axios";

export const createInvoice = (token, image, fileType) => {
    return api.post('/api/aigen', { image, type: fileType }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}