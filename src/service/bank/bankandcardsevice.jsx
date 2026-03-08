import api from '../../config/axios'

export const createBank = (form) => {
    return api.post('/api/create-bank', form)
}

export const listBank = ({
    page = 1,
    limit = 10,
    sortKey = 'id',
    sortDirection = 'DESC',
    search = ''
}) => {
    return api.get(`/api/list-bank`, {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined
        }
    })
}

export const listBankSelect = () => {
    return api.get('/api/list-bank-select')
}

export const readBank = (id) => {
    return api.get(`/api/read-bank/${id}`)
}

export const updateBank = (id, form) => {
    return api.put(`/api/update-bank/${id}`, form)
}

export const statusBank = (id, is_active) => {
    return api.put(`/api/status-bank/${id}`, { is_active })
}

export const removeBank = (id) => {
    return api.delete(`/api/delete-bank/${id}`)
}

//group credit
export const createGroupCredit = (form) => {
    return api.post('/api/create-group-credit', form)
}

export const listGroupCredit = ({
    page = 1,
    limit = 10,
    search = ''
}) => {
    return api.get(`/api/list-group-credit`, {
        params: {
            page,
            limit,
            search: search || undefined
        }
    })
}

export const listGroupCreditSelect = () => {
    return api.get('/api/list-group-credit-select')
}

export const readToSeeGroup = (id) => {
    return api.get(`/api/read-group-credit/${id}`)
}

export const editGroup = (id) => {
    return api.get(`/api/edit-group-credit/${id}`)
}

export const updateGroupCredit = (id, form) => {
    return api.put(`/api/update-group-credit/${id}`, form)
}

export const statusGroupCredit = (id, is_active) => {
    return api.put(`/api/status-group-credit/${id}`, { is_active })
}

export const removeGroupCredit = (id) => {
    return api.delete(`/api/delete-group-credit/${id}`)
}