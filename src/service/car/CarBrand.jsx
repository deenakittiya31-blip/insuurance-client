import api from '../../config/axios'

export const createCarBrand = (token, form) => {
    return api.post('/api/create-carbrand', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarBrand = ({
    page = 1,
    limit = 10,
    sortKey = 'id',
    sortDirection = 'DESC',
    search = ''
}) => {
    return api.get(`/api/list-carbrand`, {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined
        }
    })
}

export const listCarBrandSelect = () => {
    return api.get('/api/list-carbrand-select')
}

export const readCarBrand = (token, id) => {
    return api.get(`/api/read-carbrand/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCarBrand = (token, id, form) => {
    return api.put(`/api/update-carbrand/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const statusCarBrand = (id, is_active) => {
    return api.put(`/api/status-carbrand/${id}`, { is_active })
}

export const removeCarBrand = (token, id) => {
    return api.delete(`/api/delete-carbrand/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}