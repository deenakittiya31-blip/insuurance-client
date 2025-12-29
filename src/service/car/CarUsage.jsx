import api from '../../config/axios'

export const createCarUsage = async (token, usage) => {
    return api.post('/api/create-carusage', { usage }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarUsage = async (pageNumber) => {
    return api.get(`/api/list-carusage/page?page=${pageNumber}&per_page=10`)
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