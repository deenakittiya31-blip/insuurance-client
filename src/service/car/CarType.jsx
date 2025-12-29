import api from '../../config/axios'

export const createCarType = async (token, type) => {
    return api.post('/api/create-cartype', type, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarType = async (pageNumber) => {
    return api.get(`/api/list-cartype/page?page=${pageNumber}&per_page=10`)
}

export const listCarTypeSelect = () => {
    return api.get('/api/list-cartype-select')
}

export const readCarType = (token, id) => {
    return api.get(`/api/read-cartype/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCarType = async (token, id, type) => {
    return api.put(`/api/update-cartype/${id}`, type, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCarType = async (token, id) => {
    return api.delete(`/api/delete-cartype/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}