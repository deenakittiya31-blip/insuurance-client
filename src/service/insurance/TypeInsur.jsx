import api from "../../config/axios";

export const creatType = (token, form) => {
    return api.post(`/api/create-type`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listType = (pageNumber) => {
    return api.get(`/api/list-type/page?page=${pageNumber}&per_page=10`)
}

export const listTypeSelect = () => {
    return api.get('/api/list-type-select')
}

export const readType = (token, id) => {
    return api.get(`/api/read-type/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateType = (token, id, form) => {
    return api.put(`/api/update-type/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const statusType = (token, id, is_active) => {
    return api.put('/api/status-type/${id}', { is_active }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeType = (token, id) => {
    return api.delete(`/api/delete-type/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}