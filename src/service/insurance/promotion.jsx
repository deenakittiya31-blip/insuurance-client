import api from '../../config/axios'

export const createPromotion = (form) => {
    return api.post('/api/create-promotion', form)
}

export const listPromotion = ({
    page = 1,
    limit = 10,
    sortKey = 'id',
    sortDirection = 'DESC',
    search = ''
}) => {
    return api.get(`/api/list-promotion`, {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined
        }
    })
}

export const listPromotionSelect = () => {
    return api.get('/api/list-promotion-select')
}

export const readPromotion = (id) => {
    return api.get(`/api/read-promotion/${id}`)
}

export const updatePromotion = (id, form) => {
    return api.put(`/api/update-promotion/${id}`, form)
}

export const statusPromotion = (id, is_active) => {
    return api.put(`/api/status-promotion/${id}`, { is_active })
}

export const removePromotion = (id) => {
    return api.delete(`/api/delete-promotion/${id}`)
}