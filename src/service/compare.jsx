import api from '../config/axios'

export const listQuotationCompare = (pageNumber, perPage, sortKey, sortDirection) => {
    return api.get('/api/list-compare/page', {
        params: {
            page: pageNumber,
            per_page: perPage,
            sortKey,
            sortDirection
        }
    })
}

export const listPinCompare = (pageNumber, perPage, sortKey, sortDirection) => {
    return api.get('/api/list-pin/page', {
        params: {
            page: pageNumber,
            per_page: perPage,
            sortKey,
            sortDirection
        }
    })
}

export const createCompare = (token, form) => {
    return api.post('/api/create-compare', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteQuotationCompare = (id) => {
    return api.delete(`api/delete-compare/${id}`)
}

export const getDetailCompare = (token, id) => {
    return api.get(`/api/detail-compare/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getDetailCompareEdit = (id) => {
    return api.get(`/api/edit-compare/${id}`)
}

export const createPDF = (id) => {
    return api.get(`/api/pdf-compare/${id}`, {
        responseType: 'blob'
    })
}

export const createJPG = (id) => {
    return api.get(`/api/jpg-compare/${id}`, {
        responseType: 'blob'
    })
}

export const searchText = async (arg) => {
    return api.post('/api/search-compare', arg)
}