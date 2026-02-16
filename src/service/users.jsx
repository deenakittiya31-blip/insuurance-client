import api from '../config/axios'

export const listUser = ({
    page = 1,
    limit = 10,
    sortKey = 'id',
    sortDirection = 'DESC',
    search = ''
}) => {
    return api.get(`/api/list-user`, {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined
        }
    })
}

export const readUser = (id) => {
    return api.get(`/api/read-user/${id}`)
}

export const updateUser = (id, form) => {
    return api.put(`/api/update-user/${id}`, form)
}

export const statusUser = (id, is_active) => {
    return api.put(`/api/status-user/${id}`, { is_active })
}

export const removeUser = (id) => {
    return api.delete(`/api/delete-user/${id}`)
}