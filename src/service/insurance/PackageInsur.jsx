import api from '../../config/axios'

export const createPackage = (form) => {
    return api.post('/api/create-package', form)
}

export const listPackage = ({
    page,
    limit,
    sortKey,
    sortDirection,
    search
}) => {
    return api.get('/api/list-package', {
        params: {
            page,
            limit,
            sortKey,
            sortDirection,
            search: search || undefined
        }
    })
}

export const listPackageSelect = () => {
    return api.get('/api/list-package-select')
}

export const readPackage = (id) => {
    return api.get(`/api/read-package/${id}`)
}

export const copyPackage = (id) => {
    return api.get(`/api/copy-package/${id}`)
}

export const readPackageEdit = (id) => {
    return api.get(`/api/readedit-package/${id}`)
}

export const updatePackage = (id, form) => {
    return api.patch(`/api/update-package/${id}`, form)
}

export const removePackage = (id) => {
    return api.delete(`/api/delete-package/${id}`)
}

export const statusPackage = (id, is_active) => {
    return api.put(`/api/status-package/${id}`, { is_active })
}

export const searchPackage = async (arg) => {
    return api.post('/api/search-package', arg)
}

export const updateDiscountLevel = async (form) => {
    return api.patch('/api/package-group-discount', form)
}