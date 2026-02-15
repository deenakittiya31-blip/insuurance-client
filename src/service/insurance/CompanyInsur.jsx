import api from "../../config/axios";

export const createCompany = (token, form) => {
    return api.post('/api/create-company', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCompany = ({
    page,
    limit,
    sortKey,
    sortDirection,
    search
}) => {
    return api.get(`/api/list-company`, {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined
        }
    })
}

export const listCompanySelect = () => {
    return api.get('/api/list-company-select')
}

export const listCompanyTheme = () => {
    return api.get('/api/list-company-theme')
}

export const readCompany = (token, id) => {
    return api.get(`/api/read-company/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCompany = (token, id, form) => {
    return api.put(`/api/update-company/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const statusCompany = (id, is_active) => {
    return api.put(`/api/status-company/${id}`, { is_active })
}

export const removeCompany = (token, id) => {
    return api.delete(`/api/delete-company/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}