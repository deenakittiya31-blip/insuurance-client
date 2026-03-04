import api from '../../config/axios'

export const createAddress = (form) => {
    return api.post('/api/create-address', form)
}

export const listAddress = () => {
    return api.get(`/api/list-address`)
}

export const readAddress = (id) => {
    return api.get(`/api/read-address/${id}`)
}

export const updateAddress = (id, form) => {
    return api.put(`/api/update-address/${id}`, form)
}

export const isDefaultAddress = (id, is_default) => {
    return api.put(`/api/toggle-address/${id}`, { is_default })
}

export const removeAddress = (id) => {
    return api.delete(`/api/delete-address/${id}`)
}