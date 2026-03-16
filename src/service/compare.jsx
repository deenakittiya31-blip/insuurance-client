import api from '../config/axios'

export const listQuotationCompare = ({
    page,
    limit,
    sortKey,
    sortDirection,
    search
}) => {
    return api.get('/api/list-compare/page', {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined
        }
    })
}

export const listPinCompare = ({
    page,
    limit,
    sortKey,
    sortDirection,
    search
}) => {
    return api.get('/api/list-pin/page', {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined
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

export const deleteCompareMember = (id) => {
    return api.delete(`api/delete-compare-member/${id}`)
}

export const getDetailCompare = (id) => {
    return api.get(`/api/detail-compare/${id}`)
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

export const copyCompare = async (form) => {
    return api.post('/api/copy-compare', form)
}