import api from '../../config/axios'

export const createOrder = (form) => {
    return api.post('/api/order/create', form)
}

export const getDetailOrder = (id) => {
    return api.get(`/api/order/detail/${id}`)
}

export const confirmOrder = (id, form) => {
    return api.patch(`/api/order/${id}`, form)
}

export const getHistoryOrder = () => {
    return api.get(`/api/order`)
}

export const deleteOrder = (id) => {
    return api.delete(`/api/order/${id}`)
}

export const changeStatusOrder = (id, status) => {
    return api.put(`/api/order/status/${id}`, { status })
}

export const updateTrackingOrder = (id, tracking) => {
    return api.put(`/api/order/tracking/${id}`, { tracking })
}

export const listOrder = ({
    page,
    limit,
    sortKey,
    sortDirection,
    search
}) => {
    return api.get(`/api/admin/order`, {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined
        }
    })
}