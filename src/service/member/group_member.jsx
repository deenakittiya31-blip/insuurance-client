import api from "../../config/axios";

export const createGroup = (form) => {
    return api.post('/api/create-groupmember', form)
}

export const listGroup = ({
    page,
    limit,
    sortKey,
    sortDirection,
    search
}) => {
    return api.get('/api/list-groupmember', {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined
        }
    })
}

export const listSelectGroup = () => {
    return api.get('/api/select-groupmember')
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

export const statusGroup = (id, is_active) => {
    return api.put(`/api/status-groupmember/${id}`, { is_active })
}