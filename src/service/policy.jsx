import api from "../config/axios"

export const createPolicy = async (data) => {
    return api.post('/api/policy', data)
}

export const getActivePolicy = async (type) => {
    return api.get(`/api/public-policy/${type}`)
}

export const getPolicyList = async (type) => {
    console.log(`/api/policy/${type}`)
    return api.get(`/api/policy/${type}`)
}

export const updatePolicy = async (id, data) => {
    return api.put(`/api/policy/${id}`, data)
}

export const publishPolicy = (id) => {
    return api.patch(`/api/policy/${id}/publish`)
}

export const deletePolicy = async (id) => {
    return api.delete(`/api/policy/${id}`)
}