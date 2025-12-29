import api from '../../config/axios'

export const createCarModel = async (token, form) => {
    return api.post('/api/create-carmodel', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarModel = async (pageNumber) => {
    return api.get(`/api/list-carmodel/page?page=${pageNumber}&per_page=10`)
}

export const readCarModel = (token, id) => {
    return api.get(`/api/read-carmodel/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCarModel = async (token, id, form) => {
    return api.put(`/api/update-carmodel/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCarModel = async (token, id) => {
    return api.delete(`/api/delete-carmodel/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}