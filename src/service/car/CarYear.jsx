import api from '../../config/axios'

export const createYear = async (token, form) => {
    return api.post('/api/create-year', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listYear = async (pageNumber, perPage, sortKey, sortDirection) => {
    return api.get('/api/list-year/page', {
        params: {
            page: pageNumber,
            per_page: perPage,
            sortKey,
            sortDirection
        }
    })
}

export const listCarYearSelect = async () => {
    return api.get('/api/list-year-select')
}

export const readYear = async (token, id) => {
    return api.get(`/api/read-year/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const statusCarYear = (id, is_active) => {
    return api.put(`/api/status-year/${id}`, { is_active })
}

export const updateYear = async (token, id, form) => {
    return api.put(`/api/update-year/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeYear = async (token, id) => {
    return api.delete(`/api/delete-year/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}