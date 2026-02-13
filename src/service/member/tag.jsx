import api from '../../config/axios'

export const createTag = async (tag_name) => {
    return api.post('/api/create-tag', { tag_name })
}

export const addMembers = async (form) => {
    return api.post('/api/add-membertotag', form)
}

export const listTag = async ({
    page = 1,
    limit = 10,
    sortKey = 'id',
    sortDirection = 'DESC',
    search = ''
}) => {
    return api.get('/api/list-tag', {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined,
        }
    })
}

export const listTagSelect = async () => {
    return api.get('/api/list-tag-select')
}

export const statusTag = (id, is_active) => {
    return api.put(`/api/status-tag/${id}`, { is_active })
}

export const updateTag = async (id, tag_name) => {
    return api.put(`/api/update-tag/${id}`, { tag_name })
}

export const removeTag = async (id) => {
    return api.delete(`/api/delete-tag/${id}`)
}

export const removeTagFromMember = async (id) => {
    return api.delete(`/api/delete-tagfrommember/${id}`)
}

export const listMemberByTag = (id, search) => {
    return api.get(`/api/list-memberByTag/${id}`, {
        params: search ? { search } : {}
    })
}