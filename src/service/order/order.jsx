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