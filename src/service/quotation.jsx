import api from '../config/axios'

export const createQuotationFields = (token, quotation_id, fields) => {
    return api.post('/api/create-quotation/fields',
        {
            quotation_id,
            fields
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

export const createFieldsQuotation = (token, payload) => {
    return api.post('/api/create-quotationandfields', payload,
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

export const pinQuotation = (id) => {
    return api.post(`/api/pin-quotation/${id}`)
}