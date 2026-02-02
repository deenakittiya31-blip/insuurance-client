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

export const listUsageType = async (pageNumber, perPage) => {
    return api.get(`/api/list-carusagetype/page?page=${pageNumber}&per_page=${perPage}`)
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