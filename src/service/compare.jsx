import api from '../config/axios'

export const createCompare = (token, form) => {
    return api.post('/api/create-compare', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getDetailCompare = (token, id) => {
    return api.get(`/api/detail-compare/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createPDF = (token, id) => {
    return api.get(`/api/pdf-compare/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
    })
}