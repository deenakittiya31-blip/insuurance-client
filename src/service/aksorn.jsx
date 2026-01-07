import api from "../config/axios";

export const createAkson = (token, data) => {
    return api.post('/api/akson', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}