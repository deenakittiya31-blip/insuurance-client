import api from '../config/axios'

export const createFieldsQuotation = (token, quotation_id, fields) => {
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

export const deleteQuotation = (token, id) => {
    return api.delete(`/api/delete-quotation/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}