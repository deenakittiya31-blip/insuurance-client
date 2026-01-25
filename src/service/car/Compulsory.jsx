import api from '../../config/axios'

export const createCompulsory = async (token, form) => {
    return api.post('/api/create-compulsory', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const ListCompulsory = async (pageNumber, perPage) => {
    return api.get(`/api/list-compulsory/page?page=${pageNumber}&per_page=${perPage}`)
}

export const listOption = async (id) => {
    return api.get(`/api/option-compulsory/${id}`)
}

export const readCompulsory = async (token, id) => {
    return api.get(`/api/read-compulsory/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateCompulsory = (token, id, form) => {
    return api.patch(`/api/update-compulsory/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCompulsory = async (token, id) => {
    return api.delete(`/api/delete-compulsory/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}