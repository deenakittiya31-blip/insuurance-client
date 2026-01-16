import api from '../config/axios'

export const listModelCompany = (pageNumber) => {
    return api.get(`api/list-model/page?page=${pageNumber}&per_page=10`)
}

export const deleteModelCompany = (company_id) => {
    return api.delete(`api/delete-model/${company_id}`)
}

export const readModelDetail = (id) => {
    return api.get(`api/read-model/${id}`)
}

export const readFieldsModel = (id) => {
    return api.get(`api/read-fieldsmodel/${id}`)
}

export const updateFieldsModel = (id, form) => {
    return api.patch(`api/update-fieldsmodel/${id}`, form)
}