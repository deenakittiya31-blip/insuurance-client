import api from '../../config/axios'

export const createCarBrand = (token, form) => {
    return api.post('/api/create-carbrand', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCarBrand = (pageNumber) => {
    return api.get(`/api/list-carbrand/page?page=${pageNumber}&per_page=10`)
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

export const removeCarBrand = (token, id) => {
    return api.delete(`/api/delete-carbrand/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}