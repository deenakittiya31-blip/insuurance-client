import api from "../../config/axios";

export const createPremium = (form) => {
    return api.post('/api/create-premium', form)
}

export const listPremium = (pageNumber, perPage, sortKey, sortDirection) => {
    return api.get(`/api/list-premium/page`, {
        params: {
            page: pageNumber,
            per_page: perPage,
            sortKey,
            sortDirection
        }
    })
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

export const statusPremium = (id, is_active) => {
    return api.put(`/api/status-premium/${id}`, { is_active })
}