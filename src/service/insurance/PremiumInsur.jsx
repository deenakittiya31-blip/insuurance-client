import api from "../../config/axios";

export const createPremium = (form) => {
    return api.post('/api/create-premium', form)
}

export const createPremiumToCompare = (form) => {
    return api.post('/api/create-premiumtocompare', form)
}

export const listPremium = ({
    page,
    limit,
    sortKey,
    sortDirection,
    search
}) => {
    return api.get(`/api/list-premium`, {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined
        }
    })
}

export const readPremium = (id) => {
    return api.get(`/api/read-premium/${id}`)
}

export const updatePremium = (id, form) => {
    return api.patch(`/api/update-premium/${id}`, form)
}

export const removePremium = (id) => {
    return api.delete(`/api/delete-premium/${id}`)
}

export const statusPremium = (id, is_active) => {
    return api.put(`/api/status-premium/${id}`, { is_active })
}

export const searchPremium = async (arg) => {
    return api.post('/api/search-premium', arg)
}

export const searchPremiumToCompare = async (arg) => {
    return api.post('/api/search-premiumtocompare', arg)
}