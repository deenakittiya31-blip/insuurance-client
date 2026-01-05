import api from "../config/axios";

export const createAkson = (token, base64) => {
    return api.post('/api/akson', { base64 }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}