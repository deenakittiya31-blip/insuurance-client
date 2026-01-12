import api from '../config/axios'

export const createFieldsQuotation = (token, payload) => {
    return api.post('/api/create-quotation/fields', payload,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

export const createQuotation = (token, form) => {
    return api.post('/api/quotation', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteQuotation = (token, id) => {
    return api.delete(`/api/delete-quotation/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}