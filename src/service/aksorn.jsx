import api from "../config/axios";

export const createAkson = (token, images) => {
    return api.post('/api/akson', { images }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}