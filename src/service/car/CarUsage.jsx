import api from '../../config/axios'

export const createCarUsage = async (token, usage) => {
    return api.post('/api/create-carusage', { usage }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarUsage = async () => {
    return api.get(`/api/list-carusage`)
}

export const listCarUsageSelect = () => {
    return api.get('/api/list-carusage-select')
}

export const updateCarUsage = async (token, id, usage) => {
    return api.put(`/api/update-carusage/${id}`, { usage }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCarUsage = async (token, id) => {
    return api.delete(`/api/delete-carusage/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const statusCarUsage = (id, is_active) => {
    return api.put(`/api/status-carusage/${id}`, { is_active })
}

////car usage type
export const createUsageType = async (token, form) => {
    return api.post('/api/create-carusagetype', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listUsageTypeSelect = async () => {
    return api.get(`/api/select-carusagetype`)
}

export const listUsageType = async ({
    page = 1,
    limit = 10,
    sortKey = 'id',
    sortDirection = 'DESC',
    search = ''
}) => {
    return api.get(`/api/list-carusagetype`, {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined,
        }
    })
}

export const readUsageType = (id) => {
    return api.get(`/api/read-carusagetype/${id}`)
}

export const updateUsageType = async (id, form) => {
    return api.patch(`/api/update-carusagetype/${id}`, form)
}

export const removeUsageType = async (id) => {
    return api.delete(`/api/delete-carusagetype/${id}`)
}

export const statusUsageType = (id, is_active) => {
    return api.put(`/api/status-carusagetype/${id}`, { is_active })
}

export const statusIsSee = (id, is_see) => {
    return api.put(`/api/status-issee/${id}`, { is_see })
}