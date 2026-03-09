import api from '../config/axios'

export const geteSecret = async () => {
    return api.get(`/api/setting`)
}

export const updateSecret = async (id, secret) => {
    return api.put(`/api/setting/${id}`, { secret })
}