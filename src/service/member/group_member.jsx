import api from "../../config/axios";

export const createGroup = (form) => {
    return api.post('/api/create-groupmember', form)
}

export const listGroup = () => {
    return api.get('/api/list-groupmember')
}

export const updateGroup = (id, form) => {
    return api.put(`/api/update-groupmember/${id}`, form)
}

export const readGroup = (id) => {
    return api.get(`/api/read-groupmember/${id}`)
}

export const deleteGroup = (id) => {
    return api.delete(`/api/delete-groupmember/${id}`)
}