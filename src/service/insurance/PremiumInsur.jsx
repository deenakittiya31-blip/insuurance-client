import api from "../../config/axios";

export const createPremium = (token, form) => {
    return api.post('/api/create-premium', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listPremium = (pageNumber, perPage) => {
    return api.get(`/api/list-premium/page?page=${pageNumber}&per_page=${perPage}`)
}

export const readPremium = (token, id) => {
    return api.get(`/api/read-premium/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updatePremium = (token, id, form) => {
    return api.put(`/api/update-premium/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removePremium = (token, id) => {
    return api.delete(`/api/delete-premium/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}